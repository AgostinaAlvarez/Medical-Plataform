import { SearchOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React, { useState } from "react";

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const searchIcon = <SearchOutlined />;

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SelectComponent = ({
  options,
  placeholder,
  HandleChange,
  value,
  HandleClick,
  onSearch,
  openValue,
  button_label,
  style,
}) => (
  <Select
    showSearch
    value={value}
    placeholder={placeholder}
    optionFilterProp="children"
    onChange={HandleChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={options}
    suffixIcon={searchIcon}
    style={style ? style : { width: "100%" }}
    notFoundContent={<button onClick={HandleClick}>{button_label}</button>}
    listHeight={"150px"}
    open={openValue}
  />
);
export default SelectComponent;
