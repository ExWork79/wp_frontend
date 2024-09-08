import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import { useQuery } from "@tanstack/react-query";

import useErrorHandler from "../../hooks/useErrorHandler";
import { fetchCountryByCCA2 } from "../../api";
import { Loader, Navbar } from "../../uiComponents";
import { Content, Header, Layout } from "../../layout";

import { getGeoData } from "./geodata";

const CountryDetails: FC = () => {
  const params = useParams();
  const { handleError } = useErrorHandler();

  const {
    data: countryDetail = undefined,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["country", params.countryCode],
    queryFn: async () => {
      if (params.countryCode) {
        const countryDetail = await fetchCountryByCCA2(params.countryCode);

        return countryDetail;
      }
    },
    initialData: undefined,
    enabled: !!params.countryCode,
  });

  if (error) {
    handleError(error as Error);
  }

  useEffect(() => {
    (async () => {
      if (countryDetail) {
        const geoData = await getGeoData(countryDetail.name);

        const rootMap = am5.Root.new("countrymapdiv");

        const mapChart = rootMap.container.children.push(
          am5map.MapChart.new(rootMap, {
            panX: "none",
            panY: "none",
            wheelable: false,
            wheelX: "none",
            wheelY: "none",
            projection: am5map.geoMercator(),
          })
        );

        const polygonSeries = mapChart.series.push(
          am5map.MapPolygonSeries.new(rootMap, {
            geoJSON: geoData,
          })
        );

        polygonSeries.mapPolygons.template.setAll({
          tooltipText: "{name}",
          interactive: true,
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
          fill: am5.color(0x677935),
        });

        return () => {
          rootMap.dispose();
        };
      }
    })();
  }, [countryDetail]);

  if (!countryDetail || isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <Header bgColor="white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)">
        <Navbar />
      </Header>
      <Content>
        <div className="flex w-full h-full gap-2 flex-col mt-4">
          <div
            className="flex w-full justify-center h-12 p-2 items-center bg-background-100
           border rounded border-background-400 border-solid"
          >
            <h1 className="text-3xl font-bold">
              {countryDetail.name.toLocaleUpperCase()}
            </h1>
          </div>
          <div
            className="grid grid-cols-2 w-full h-full bg-background-100 border rounded
            border-background-400 border-solid relative"
          >
            <div className="p-4 w-full h-full">
              <div id="countrymapdiv" className="w-full h-full" />
            </div>
            <div className="flex justify-center items-center w-full h-full">
              <div>Country Information</div>
            </div>
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-background-400"></div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CountryDetails;
