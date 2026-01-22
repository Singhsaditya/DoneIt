import { create } from "zustand";
import {
  fetchNotifications,
  markNotificationsRead,
} from "../api/notificationApi";

export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,

  loadNotifications: async () => {
    const data = await fetchNotifications();
    set({
      notifications: data,
      unreadCount: data.filter((n) => !n.read).length,
    });
  },

  markAllRead: async () => {
    await markNotificationsRead();
    set((state) => ({
      notifications: state.notifications.map((n) => ({
        ...n,
        read: true,
      })),
      unreadCount: 0,
    }));
  },
}));
