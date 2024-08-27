import { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { useNavigate } from 'react-router-dom';

enum PolygonType{
  MultiPolygon = "MultiPolygon",
  Polygon = "Polygon"
}

interface DataContext{
  geometry: { 
    coordinates:  [],
    type: PolygonType
  },
  geometryType: PolygonType,
  id: string,
  madeFromGeoData: boolean,
  name: string
}

function WorldMap() {
  const navigate = useNavigate()
  useLayoutEffect(() => {
    let root = am5.Root.new("mapdiv");
    let map = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoNaturalEarth1()
      })
    );

    let polygonSeries = map.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"]
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935)
    });

    polygonSeries.mapPolygons.template.events.on("click", function(ev) {
      const id = (ev.target.dataItem?.dataContext as DataContext)?.id;
      if(id) {
        navigate(`/country/${id}`)
      }
    });
    
    
    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div id="mapdiv" className='h-full w-full'></div>
  );
}
export default WorldMap;
