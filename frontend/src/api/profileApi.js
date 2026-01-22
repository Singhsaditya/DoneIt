import api from "./axios";

export const updateProfile = async (data) => {
  const res = await api.put("/profile/me", data);
  return res.data;
};
