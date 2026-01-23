import { create } from "zustand";
import api from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  hydrate: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
      });
    }
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  login: async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    set({
      token: res.data.token,
      user: res.data.user,
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
      isAuthenticated: true,
    });
  },

  logout: () => {
  updateUser: (updatedUser) => {
    set((state) => {
      const newUser = { ...state.user, ...updatedUser };
      localStorage.setItem("auth", JSON.stringify({ token: state.token, user: newUser }));
      return { user: newUser };
    });
  },

    localStorage.clear();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
