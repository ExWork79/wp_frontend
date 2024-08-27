import { FC } from "react";
import { Layout as AntdLayout } from "antd";

type Props = {
  children: React.ReactNode;
};

const Footer: FC<Props> = (props: Props) => {
  const { children } = props;

  return <AntdLayout.Footer>{children}</AntdLayout.Footer>;
};

export default Footer;
