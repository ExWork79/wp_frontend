import { FC, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

enum PolygonType {
  MultiPolygon = "MultiPolygon",
  Polygon = "Polygon",
}
type DataContext = {
  geometry: {
    coordinates: [];
    type: PolygonType;
  };
  geometryType: PolygonType;
  id: string;
  madeFromGeoData: boolean;
  name: string;
};

const WorldMap: FC = () => {
  useLayoutEffect(() => {
    const root = am5.Root.new("mapdiv");

    const worldMap = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        wheelable: false,
        wheelX: "none",
        wheelY: "none",
        projection: am5map.geoMercator(),
      })
    );

    //Zooming on worldMap
    const zoomControl = worldMap.set(
      "zoomControl",
      am5map.ZoomControl.new(root, {
        y: am5.p0,
        centerY: am5.p0,
      })
    );
    zoomControl.homeButton.set("visible", true);

    //World worldMap excluding Antartica
    const polygonSeries = worldMap.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    //Hover to show tooltip
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935),
    });

    //Click to show modal
    const modal = am5.Modal.new(root, {});

    let modalSetup = false;

    const openModal = (countryDataContext: DataContext) => {
      if (!modalSetup) {
        let anchorElement = document.createElement("a");
        anchorElement.textContent = `Visit ${countryDataContext.name} page`;
        anchorElement.href = `/country/${countryDataContext.id}`;

        let cancelButton = document.createElement("input");
        cancelButton.type = "button";
        cancelButton.value = "Cancel";
        cancelButton.addEventListener("click", function () {
          closeModal();
        });

        modal.getPrivate("content").appendChild(anchorElement);
        modal.getPrivate("content").appendChild(cancelButton);

        modalSetup = true;
      }
      modal.open();
    };

    const closeModal = () => {
      if (modalSetup) {
        modal.getPrivate("content").innerHTML = "";
        modalSetup = false;
        modal.close();
      }
    };

    polygonSeries.mapPolygons.template.events.on("click", function (ev) {
      const countryDataContext = ev.target.dataItem?.dataContext as DataContext;
      openModal(countryDataContext);
    });

    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        closeModal();
      }
    });

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="mapdiv" className="h-full w-full border rounded-lg" />;
};

export default WorldMap;
