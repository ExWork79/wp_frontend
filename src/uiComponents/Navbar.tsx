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
    { key: "Country", value: t("header.listOption.Country") },
    { key: "Population", value: t("header.listOption.Population") },
  ];

  const listItems: MenuProps["items"] = listOption.map((option) => {
    return {
      key: option.key,
      label: (
        <span className="font-[600] flex justify-center items-center hover:text-blue-500">
          {option.value}
        </span>
      ),
      onClick: () => setSelectedOption(option.key),
    };
  });

  const handleLogoClick = () => {
    navigate(0);
    setSelectedOption("");
  };

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] w-full h-16">
      <div
        className="flex w-full justify-center items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <Typography.Title style={{ margin: 0 }} level={4}>
          {t("mainTitle")}
        </Typography.Title>
      </div>
      <div className="hidden md:flex w-full gap-10">
        {listOption.map((option) => (
          <div
            key={option.key}
            className={`cursor-pointer font-[600] ${
              selectedOption === option.key ? "text-blue-500" : "text-stone-400"
            } hover:text-blue-500`}
            onClick={() => setSelectedOption(option.key)}
          >
            {option.value}
          </div>
        ))}
      </div>
      {/* <div className="flex items-center justify-center border border-gray-300">
        Profile
      </div> */}
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
