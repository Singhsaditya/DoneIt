import { useEffect } from "react";
import { useNotificationStore } from "../stores/notificationStore";

export default function Notifications() {
  const {
    notifications,
    loadNotifications,
    markAllRead,
  } = useNotificationStore();

  useEffect(() => {
    loadNotifications();
  }, []);

  if (!notifications.length) {
    return <p className="p-6">No notifications</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Notifications</h1>

      <button
        onClick={markAllRead}
        className="text-sm underline mb-4"
      >
        Mark all as read
      </button>

      {notifications.map((n) => (
        <div
          key={n._id}
          className={`p-4 rounded-xl border ${
            n.read ? "opacity-60" : ""
          }`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}
