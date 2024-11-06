//filtrar por fechas
export const filterByDateRange = (data, datesString) => {
  // Convertir las fechas de inicio y fin a objetos Date
  const startDate = new Date(datesString[0]);
  const endDate = new Date(datesString[1]);

  return data.filter((item) => {
    const itemDate = new Date(item.date); // Convertir la fecha de cada objeto
    return itemDate >= startDate && itemDate <= endDate;
  });
};
//filtrar por termino de busqueda
export const filterBySearchValue = (data, searchString, property) => {
  return data.filter((item) =>
    item[property]?.toLowerCase().includes(searchString.toLowerCase())
  );
};

//filtrar por select
export const filterBySelectValue = (data, searchValue, property) => {
  return data.filter((item) => item[property] === searchValue);
};

//filtrar por id de conexion
export const filterByConsultationConection = (data, property, value) => {
  let filteredRecords;

  if (value === true) {
    filteredRecords = data.filter((item) => item[property] !== null);
  } else if (value === false) {
    filteredRecords = data.filter((item) => item[property] === null);
  }

  return filteredRecords;
};
