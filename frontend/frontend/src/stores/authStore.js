import { create } from "zustand";
import api from "@/api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  loading: true,

  hydrate: () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      set({
        token,
        user,
        role: user.role,
        isAuthenticated: true,
        loading: false,
      });
    } else {
      set({ loading: false });
    }
  },

  login: async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    set({
      token: res.data.token,
      user: res.data.user,
      role: res.data.user.role,
      isAuthenticated: true,
    });
  },

  signup: async (data) => {
    const res = await api.post("/auth/signup", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    set({
      token: res.data.token,
      user: res.data.user,
      role: res.data.user.role,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.clear();
    set({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
    });
  },
}));
