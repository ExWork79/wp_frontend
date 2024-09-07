import { FC } from "react";
import { Content, Header, Layout } from "../../layout";
import { Loader, Navbar } from "../../uiComponents";
import { useGlobalStore } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { WorldMap } from "../home/index";

const Home: FC = () => {
  const {
    actions: { fetchCountries },
  } = useGlobalStore();

  const { isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <Header bgColor="white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)">
        <Navbar />
      </Header>
      <Content>
        <div className="w-full h-full px-6 py-1 border-2 border-black rounded-lg">
          <WorldMap />
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
