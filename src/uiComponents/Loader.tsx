import { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const Loader: FC = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </Flex>
  );
};

export default Loader;
