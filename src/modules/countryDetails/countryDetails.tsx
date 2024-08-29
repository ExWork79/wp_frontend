import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import { useQuery } from "@tanstack/react-query";

import useErrorHandler from "../../hooks/useErrorHandler";
import { fetchCountryByCCA2 } from "../../api";
import { Loader } from "../../uiComponents";

import { getGeoData } from "./geodata";

const CountryDetails: FC = () => {
  const params = useParams();
  const { handleError } = useErrorHandler();

  const {
    data: countryDetail = undefined,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["country", params.id],
    queryFn: async () => {
      if (params.id) {
        const countryDetail = await fetchCountryByCCA2(params.id);

        return countryDetail;
      }
    },
    initialData: undefined,
    enabled: !!params.id,
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

  return <div id="countrymapdiv" className="w-full h-full" />;
};

export default CountryDetails;
