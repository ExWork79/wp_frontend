import { GeoJSON } from "geojson";
import { loadMap } from "@amcharts/amcharts5-geodata";

const getGeoData = async (country: string): Promise<GeoJSON> => {
    const geoData = await loadMap(`${country.toLowerCase()}Low`);

    return geoData;
};

export { getGeoData };