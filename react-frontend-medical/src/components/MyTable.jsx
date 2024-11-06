import React, { useState } from "react";
import { Table, DatePicker, Button } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const MyTable = () => {
  // Datos de ejemplo
  /*
  const handleEvent = () => {
    // Array de objetos con fechas en formato ISO (ejemplo)
    const records = [
      { id: 1, name: "Evento A", date: "2023-10-01" },
      { id: 2, name: "Evento B", date: "2023-10-15" },
      { id: 3, name: "Evento C", date: "2023-11-01" },
      { id: 4, name: "Evento D", date: "2023-11-10" },
    ];

    // Función de filtro que toma las fechas en formato string "AAAA-MM-DD"
    
    const filterByDateRange = (data, startDateStr, endDateStr) => {
      // Convertir las fechas de inicio y fin a objetos Date
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);

      return data.filter((item) => {
        const itemDate = new Date(item.date); // Convertir la fecha de cada objeto
        return itemDate >= startDate && itemDate <= endDate;
      });
    };

    // Fechas de inicio y fin en formato string "AAAA-MM-DD"
    const startDateStr = "2023-10-15";
    const endDateStr = "2023-11-10";

    // Usar la función
    const filteredRecords = filterByDateRange(
      records,
      startDateStr,
      endDateStr
    );

    console.log(filteredRecords);
  };
  */
  /*filtrado*/

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

  /*
  const handleRangeChange = (dates, dateString) => {
    console.log("cambiando fechas");
    console.log(dates);
    console.log(dateString);
    if (dates) {
      console.log("hay algo");
      const filteredRecords = filterByDateRange(
        records,
        dateString[0],
        dateString[1]
      );

      console.log("filtrado:");
      console.log(filteredRecords);
    }
    
  };
  */

  const [searchValue, setSearchValue] = useState(null);
  const [datesValue, setDatesValue] = useState(null);
  const [datesValueStr, setDatesValueStr] = useState(null);

  const applyFilters = (data) => {
    if (datesValue) {
      //
    }

    if (searchValue) {
      //
    }
  };

  const handleRangeChange = (dates, datesString) => {
    setDatesValue(dates);
    setDatesValueStr(datesString);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      {/*        
        <RangePicker onChange={handleRangeChange} format="YYYY-MM-DD" />
        */}
      <button>ejecutar</button>
    </div>
  );
};

export default MyTable;
