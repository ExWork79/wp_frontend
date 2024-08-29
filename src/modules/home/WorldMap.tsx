import { FC, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import geoWorldData from "@amcharts/amcharts5-geodata/worldLow";
import { useGlobalStore } from "../../store";

type DataContext = {
  cca2: string;
  name: string;
  population?: number;
};

const renderHTMLContent = (country: DataContext) => {
  const { name, population } = country;

  const formattedPopulation = population
    ? new Intl.NumberFormat().format(population)
    : "N/A";

  return `
    <div
      style="
        display: flex;
        flex-direction: column;
        padding: 4px;
        background-color: #ffffff;
        border-radius: 0.5rem;
        border: 1px solid #86888a;
      "
    >
      <div
        style="
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 40px;
          gap: 2px;
        "
      >
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            font-weight: 600;
            background-color: #1077dd;
            color: #ffffff;
            flex: 8;
          "
        >
          <h3>${name}</h3>
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #838383;
            color: #ffffff;
            cursor: pointer;
            flex: 2;
          "
        >
          X
        </div>
      </div>
      <p style="font-size: 0.875rem; color: #4b5563; font-weight: bold;">
        Population: ${formattedPopulation}
      </p>
    </div>
  `;
};

const WorldMap: FC = () => {
  const {
    value: { countries },
  } = useGlobalStore();

  useEffect(() => {
    const rootMap = am5.Root.new("mapdiv");

    const worldMap = rootMap.container.children.push(
      am5map.MapChart.new(rootMap, {
        panX: "rotateX",
        wheelable: false,
        wheelX: "none",
        wheelY: "none",
        projection: am5map.geoMercator(),
      })
    );

    const polygonSeries = worldMap.series.push(
      am5map.MapPolygonSeries.new(rootMap, {
        geoJSON: geoWorldData,
        exclude: ["AQ"],
      })
    );

    worldMap
      .set(
        "zoomControl",
        am5map.ZoomControl.new(rootMap, {
          y: am5.p0,
          centerY: am5.p0,
        })
      )
      .homeButton.set("visible", true);

    polygonSeries.mapPolygons.template.setAll({
      templateField: "polygonSettings",
      showTooltipOn: "click",
      tooltip: am5.Tooltip.new(rootMap, {
        getFillFromSprite: false,
        getStrokeFromSprite: false,
        background: am5.Rectangle.new(rootMap, {
          fillOpacity: 0,
          strokeOpacity: 0,
        }),
        interactive: true,
      }),
      interactive: true,
    });

    polygonSeries.data.setAll(
      geoWorldData.features.map((geoCountry) => {
        const country = countries.find(
          (country) => country.cca2 === geoCountry.id
        );

        if (country) {
          return {
            id: geoCountry.id,
            name: country.name,
            polygonSettings: {
              stroke: am5.color(0x000000),
              strokeWidth: 0.5,
              tooltipHTML: renderHTMLContent({
                cca2: country.cca2,
                name: country.name,
                population: country.populations?.[0].value,
              }),
            },
          };
        }

        return geoCountry;
      })
    );

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935),
    });

    return () => {
      rootMap.dispose();
    };
  }, []);

  return <div id="mapdiv" className="h-full w-full border rounded-lg" />;
};

export default WorldMap;
