import { FC } from "react";
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

  if (isLoading || !countries) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country._id}>{country.name}</div>
      ))}
    </div>
  );
};

export default Home;
