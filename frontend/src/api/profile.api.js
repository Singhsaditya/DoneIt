import axios from "./axios";

export const updateProfile = async (data) => {
  const res = await axios.put("/profile", data);
  return res.data;
};
