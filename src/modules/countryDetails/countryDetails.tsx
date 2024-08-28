import { useLayoutEffect, FC } from 'react'
import { useParams } from 'react-router-dom'
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const CountryDetails: FC = () => {
    const params = useParams()

    useLayoutEffect(() => {
        // let root = am5.Root.new("countrymapdiv");
        // var countryMap = root.container.children.push(am5map.MapChart.new(root, {
        //     panX: "rotateX",
        //     projection: am5map.geoNaturalEarth1()
        // }));
        // let country = am5geodata_worldLow.features.find(country => country.id === params.id)

        // Promise.all([
        //     am5.net.load("https://cdn.amcharts.com/lib/5/geodata/json/" + country.map + ".json", countryMap)
        // ]).then((results) => {
        //         var geodata = am5.JSONParser.parse(results[1].response);
        //         countrySeries.setAll({
        //         geoJSON: geodata,
        //         fill: country.polygonSettings.fill
        //     });
        
        //     countrySeries.show();
        // });
        
        // // Create polygon series for the country map
        // // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
        // var countrySeries = countryMap.series.push(am5map.MapPolygonSeries.new(root, {
        //     visible: false
        // }));
        
        // countrySeries.mapPolygons.template.setAll({
        //     tooltipText: "{name}",
        //     interactive: true,
        //     fill: am5.color(0xaaaaaa)
        // });
        
        // return () => {
        //     root.dispose();
        // };
    }, [])
    return (
        // <div>{params.id}</div>
        <div id='countrymapdiv' className='h-full w-full'></div>
    )
}

export default CountryDetails