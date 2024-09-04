import { FC } from "react";
import { Outlet } from "react-router-dom";

const Countries: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Countries;
