import { FC } from "react";
import Layout from "../layout/Layout";
import Header from "../layout/Header";
import Navbar from "../uiComponents/Navbar";

const DumbPage: FC = () => {
  return (
    <>
      <Layout>
        <Header bgColor="black">
          <Navbar />
        </Header>
      </Layout>
    </>
  );
};

export default DumbPage;
