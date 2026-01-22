import { create } from 'zustand';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'task_assigned',
    title: 'New task assigned',
    message: 'You have been assigned to "Update Documentation"',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    read: false,
    actionUrl: '/tasks/task-1',
  },
  {
    id: '2',
    type: 'deadline_approaching',
    title: 'Deadline approaching',
    message: 'Task "API Integration" is due in 2 hours',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    actionUrl: '/tasks/task-2',
  },
  {
    id: '3',
    type: 'comment',
    title: 'New comment',
    message: 'Sarah commented on "Design Review"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
    actionUrl: '/tasks/task-3',
  },
  {
    id: '4',
    type: 'sla_breach',
    title: 'SLA breach alert',
    message: 'Task "Bug Fix #234" has exceeded SLA',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
    actionUrl: '/sla',
  },
];

export const useNotificationStore = create((set) => ({
  notifications: MOCK_NOTIFICATIONS,
  unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.read).length,
  
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  
  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: state.notifications.find((n) => n.id === id && !n.read)
        ? state.unreadCount - 1
        : state.unreadCount,
    })),
}));
