import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { i18n } from "./utils";
import { DEFAULT_LANGUAGE_CODE } from "./constants";
import { PageNotFound } from "./errors";
import { Home } from "./modules/home";
import DumbPage from "./modules/DumpPage";

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
      <Route path="*" element={<PageNotFound />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
      <Route path="/dumb" element={<DumbPage />} />
    </Routes>
  );
}

export default Router;
