import { FC } from "react";
import { Flex, Layout as AntdLayout } from "antd";

const layoutStyle = {
  width: "100%",
  height: "100vh",
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <Flex gap="middle" wrap>
    <AntdLayout style={layoutStyle}>{children}</AntdLayout>
  </Flex>
);

export default Layout;
