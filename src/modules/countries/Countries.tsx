import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableColumnsType } from "antd";

import { useCountryStore } from "./store";
import { Content, Header, Layout } from "../../layout";
import { NationalFlags, Navbar } from "../../uiComponents";
import { Country, Population } from "../../contracts";
import { PAGE_SIZE_OPTIONS } from "../../constants";

const Countries: FC = () => {
  const {
    value: { countries },
    actions: { fetchCountries },
  } = useCountryStore();

  const { isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const convertCountryNameToCCA2 = (name: string) => {
    const country = countries.find((c) => c.name === name);

    return country ? country.cca2 : "";
  };

  const columns: TableColumnsType<Country> = [
    {
      title: "No",
      key: "no",
      render: (_value: any, _record: Country, index: number) => {
        return index + 1;
      },
      align: "center",
      width: "20px",
    },
    {
      title: "Flag",
      key: "flag",
      render: (_value, country: Country) => {
        return (
          <div className="border rounded-md border-gray-700 border-solid">
            <NationalFlags countryCode={country.cca2} />
          </div>
        );
      },
      align: "center",
      width: "50px",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      sorter: (a: Country, b: Country) => a.name.localeCompare(b.name),
      render: (name: string) => {
        return (
          <a
            className="text-xl"
            href={`/countries/${convertCountryNameToCCA2(name)}`}
          >
            {name}
          </a>
        );
      },
      width: "150px",
    },
    {
      title: "Country Code Alpha 2",
      key: "cca2",
      dataIndex: "cca2",
      sorter: (a: Country, b: Country) => a.cca2.localeCompare(b.cca2),
      width: "100px",
    },
    {
      title: "Population",
      key: "population",
      dataIndex: "populations",
      sorter: (a: Country, b: Country) => {
        const aPopulation = a.populations?.find((pop) => pop.year === 2024);
        const bPopulation = b.populations?.find((pop) => pop.year === 2024);

        return aPopulation && bPopulation
          ? aPopulation.value - bPopulation.value
          : 0;
      },
      render: (populations: Population[]) => {
        const population = populations.find((pop) => pop.year === 2024);

        return population
          ? new Intl.NumberFormat().format(population.value)
          : "N/A";
      },
      width: "150px",
    },
  ];

  return (
    <Layout>
      <Header bgColor="white" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)">
        <Navbar />
      </Header>
      <Content>
        <Table
          bordered
          columns={columns}
          dataSource={countries}
          pagination={{ pageSizeOptions: PAGE_SIZE_OPTIONS }}
          scroll={{ y: 480 }}
          loading={isLoading}
          tableLayout="fixed"
        />
      </Content>
    </Layout>
  );
};

export default Countries;
