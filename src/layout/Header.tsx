import { FC } from "react";
import { Layout as AntdLayout } from "antd";

type Props = {
  children: React.ReactNode;
  textColor?: string;
  bgColor?: string;
  boxShadow?: string;
};

const headerStyle = (
  bgColor?: string,
  textColor?: string,
  boxShadow?: string,
): React.CSSProperties => ({
  ...(bgColor && { backgroundColor: bgColor }),
  ...(textColor && { color: textColor }),
  ...(boxShadow && { boxShadow }),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box",
  padding: "0 20px",
  minHeight: "60px",
  position: "sticky",
  top: 0,
  zIndex: 10,
});

const Header: FC<Props> = (props: Props) => {
  const { children, bgColor, textColor, boxShadow } = props;

  return (
    <AntdLayout.Header style={headerStyle(bgColor, textColor, boxShadow)}>
      {children}
    </AntdLayout.Header>
  );
};

export default Header;
