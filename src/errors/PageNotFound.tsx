import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Typography } from "antd";
import { Container } from "../layout";

const PageNotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const prevRoutePathname = location.state?.prevRoutePathname;

  if (prevRoutePathname) {
    window.history.replaceState(
      null,
      "Page Not Found",
      location.state.prevRoute.pathname,
    );
  }

  return (
    <Container>
      <div className="flex flex-col w-full justify-center items-center">
        <Typography.Title level={1} style={{ fontWeight: "bold" }}>
          {t("errorCode.notFound")}
        </Typography.Title>
        <Typography.Text style={{ fontSize: "1.5rem" }}>
          {t("pageNotFound.description")}
        </Typography.Text>
      </div>
    </Container>
  );
};

export default PageNotFound;
