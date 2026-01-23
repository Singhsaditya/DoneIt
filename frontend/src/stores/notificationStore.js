import { create } from "zustand";
import api from "../api/axios";

export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,

  loadNotifications: async () => {
    const res = await api.get("/notifications");
    const data = res.data || [];
    set({
      notifications: data,
      unreadCount: data.filter((n) => !n.read).length,
    });
  },

  markAsRead: async (id) => {
    await api.put("/notifications/read", { id });
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    });
  },

  markAllRead: async () => {
    await api.put("/notifications/read");
    set((state) => ({
      notifications: state.notifications.map((n) => ({
        ...n,
        read: true,
      })),
      unreadCount: 0,
    }));
  },
}));
