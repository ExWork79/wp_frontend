import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { i18n } from "./utils";
import { DEFAULT_LANGUAGE_CODE } from "./constants";
import { PageNotFound } from "./errors";
import { Home } from "./modules/home";
import { Countries, CountryDetails } from "./modules/countries";

function Router() {
  useEffect(() => {
    const loadLanguage = async () => {
      await i18n.changeLanguage(DEFAULT_LANGUAGE_CODE);
    };

    loadLanguage();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/countries/:countryCode" element={<CountryDetails />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
