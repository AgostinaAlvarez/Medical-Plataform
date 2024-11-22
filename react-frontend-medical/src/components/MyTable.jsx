import React, { useState } from "react";
import { Table, DatePicker, Button } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const MyTable = () => {
  const records = [
    { id: 1, name: "Evento A", date: "2024-10-01" },
    { id: 2, name: "Evento B", date: "2024-10-15" },
    { id: 3, name: "Evento C", date: "2024-11-01" },
    { id: 4, name: "Evento D", date: "2024-11-10" },
  ];

  const filterByDateRange = (data, startDateStr, endDateStr) => {
    // Convertir las fechas de inicio y fin a objetos Date
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    return data.filter((item) => {
      const itemDate = new Date(item.date); // Convertir la fecha de cada objeto
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const [searchValue, setSearchValue] = useState(null);
  const [datesValue, setDatesValue] = useState(null);
  const [datesValueStr, setDatesValueStr] = useState(null);

  const handleRangeChange = (dates, datesString) => {
    setDatesValue(dates);
    setDatesValueStr(datesString);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <button>ejecutar</button>
    </div>
  );
};

export default MyTable;
