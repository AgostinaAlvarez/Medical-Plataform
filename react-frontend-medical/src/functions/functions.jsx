import dayjs from "dayjs";

export const updateAsideOptions = (label, array) => {
  const update_data = array.map((item) => {
    if (item.label === label) {
      return { ...item, selected: true };
    }
    return item;
  });
  return update_data;
};

export const transformDate = (dateString) => {
  const formattedDate =
    dateString.slice(8, 10) +
    "/" +
    dateString.slice(5, 7) +
    "/" +
    dateString.slice(0, 4);
  return formattedDate;
};

export const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Si no ha cumplido años este año, restamos 1
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const formated_data = (data) => {
  let formattedData = data;
  for (let key in formattedData) {
    if (formattedData[key] === "") {
      formattedData[key] = null;
    }
  }
  return formattedData;
};

export const formatDateString = (dateString) => {
  if (!dateString) return null;

  if (dateString.includes("T")) {
    return dateString.replace("T", " ").split("Z")[0]; // Remueve la 'T' y la 'Z' si están presentes
  }

  return dateString;
};

export const defaultDayjsDate = (defaultDate) => {
  if (defaultDate) {
    const formattedDate = formatDateString(defaultDate);
    return dayjs(formattedDate); // Usamos dayjs después de formatear la fecha
  }
  return null;
};

export const transform_data_object_number_valur = (obj) => {
  const transformedObj = {};

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      const trimmedValue = obj[key].trim();

      // Check if the trimmed value is empty
      if (trimmedValue === "") {
        transformedObj[key] = null;
      } else if (!isNaN(trimmedValue)) {
        // Convert to float if it's a valid number
        transformedObj[key] = parseFloat(trimmedValue);
      } else {
        // Leave as string if it can't be converted to a number
        transformedObj[key] = obj[key];
      }
    } else {
      // Leave the value as is if it's not a string
      transformedObj[key] = obj[key];
    }
  }

  return transformedObj;
};

export const date_time_stamp = () => {
  const date = new Date();
  const date_string = formatDateString(date.toISOString());
  return date_string;
};

export const are_all_values_in_object_null = (obj) => {
  for (const key in obj) {
    if (obj[key] !== null) {
      return true; // Si algún valor no es null, retorna true
    }
  }
  return null; // Si todos son null, retorna false
};

export const transform_date_in_array = (data) => {
  const update_data = data.map((item) => {
    return {
      ...item,
      date: item.date.slice(0, 10),
    };
  });
  return update_data;
};

export const addOneHour = (timeString) => {
  // Convertimos el string de tiempo en un objeto Date
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const date = new Date();

  // Ajustamos las horas, minutos y segundos
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  // Sumamos una hora
  date.setHours(date.getHours() + 1);

  // Formateamos la hora para que tenga siempre dos dígitos
  const newHours = String(date.getHours()).padStart(2, "0");
  const newMinutes = String(date.getMinutes()).padStart(2, "0");
  const newSeconds = String(date.getSeconds()).padStart(2, "0");

  // Retornamos el nuevo tiempo en formato "HH:MM:SS"
  return `${newHours}:${newMinutes}:${newSeconds}`;
};

export const cutAfterT = (dateTimeString) => {
  return dateTimeString.split("T")[0] + "T";
};
