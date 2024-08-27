import { FC } from "react";
import { Content, Header, Layout } from "../../layout";
import { Loader, Navbar } from "../../uiComponents";
import { useGlobalStore } from "../../store";
import { useQuery } from "@tanstack/react-query";

const Home: FC = () => {
  const {
    value: { countries },
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
        {countries.map((country) => (
          <div key={country.name}>{country.name}</div>
        ))}
      </Content>
    </Layout>
  );
};

export default Home;
