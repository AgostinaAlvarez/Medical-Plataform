export const header_private = (token) => {
  const header = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return header;
};

export const default_header = {
  "Content-Type": "application/json",
};
