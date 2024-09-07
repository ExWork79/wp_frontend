import { GeoJSON } from "geojson";
import { loadMap } from "@amcharts/amcharts5-geodata";

const listIrregularCountries: {
  [key: string]: string;
} = {
  ["united states"]: "usaLow",
  ["united kingdom"]: "ukLow",
  ["saudi arabia"]: "saudiArabiaLow",
  ["united arab emirates"]: "uaeLow",

  // Add more irregular countries here if needed
};

const getGeoData = async (country: string): Promise<GeoJSON> => {
  try {
    const geoData = await loadMap(`${country.toLowerCase()}Low`);

    return geoData;
  } catch (error) {
    // ignore error and try to load irregular country
    const geoData = await loadMap(
      listIrregularCountries[country.toLowerCase()],
    );

    if (!geoData) {
      throw new Error("Failed to load geo data");
    }

    return geoData;
  }
};

export { getGeoData };
