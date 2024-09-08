import { FC } from "react";
import { Layout as AntdLayout } from "antd";

type Props = {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
};

const contentStyle = (
  bgColor?: string,
  textColor?: string
): React.CSSProperties => ({
  ...(bgColor && { backgroundColor: bgColor }),
  ...(textColor && { color: textColor }),
  minHeight: "280px",
  overflow: "auto",
});

const Content: FC<Props> = (props: Props) => {
  const { children, bgColor, textColor } = props;

  return (
    <AntdLayout.Content style={contentStyle(bgColor, textColor)}>
      {children}
    </AntdLayout.Content>
  );
};

export default Content;
