import api from "./axios";

export const fetchAuditLogs = async () => {
  const res = await api.get("/audit");
  return res.data;
};
