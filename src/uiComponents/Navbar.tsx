import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Typography } from "antd";

const Navbar: FC = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const navigate = useNavigate();

  const listOption = [
    {
      key: "Country",
      value: t("header.listOption.Country"),
      path: "/countries",
    },
    { key: "Population", value: t("header.listOption.Population"), path: "/" },
  ];

  const listItems: MenuProps["items"] = listOption.map((option) => {
    const { key, value, path } = option;

    return {
      key,
      label: (
        <span className="font-[600] flex justify-center items-center hover:text-blue-500">
          {value}
        </span>
      ),
      onClick: () => {
        navigate(path);
        setSelectedOption(key);
        setOpenDropdown(false);
      },
    };
  });

  const handleLogoClick = () => {
    navigate("/");
    setSelectedOption("");
  };

  return (
    <div className="grid md:grid-cols-[1fr_2fr_1fr] grid-cols-2 w-full h-16">
      <div
        className="flex w-full justify-center items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <Typography.Title style={{ margin: 0 }} level={4}>
          {t("mainTitle")}
        </Typography.Title>
      </div>
      <div className="hidden md:flex w-full gap-10">
        {listOption.map(({ key, value, path }) => (
          <div
            key={key}
            className={`flex justify-center items-center cursor-pointer font-[500] text-xl ${
              selectedOption === key ? "text-blue-500" : "text-stone-400"
            } hover:text-blue-500`}
            onClick={() => {
              navigate(path);
              setSelectedOption(key);
            }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="md:hidden flex justify-end w-full">
        <Dropdown
          menu={{ items: listItems }}
          overlayStyle={{
            width: "200px",
          }}
          open={openDropdown}
          onOpenChange={setOpenDropdown}
          destroyPopupOnHide
          trigger={["click"]}
        >
          <MenuOutlined className="text-2xl cursor-pointer" />
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
