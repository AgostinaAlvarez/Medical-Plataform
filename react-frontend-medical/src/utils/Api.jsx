import axios from "axios";

export const apiGet = async (url, headers) => {
  try {
    const response = await axios.get(url, { headers });
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export const apiPost = async (url, data, headers) => {
  try {
    const response = await axios.post(url, data, { headers });
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export const apiPut = async (url, data, headers) => {
  try {
    const response = await axios.put(url, data, { headers });
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export const apiDelete = async (url, data, headers) => {
  try {
    const response = await axios.delete(url, data, { headers });
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};
