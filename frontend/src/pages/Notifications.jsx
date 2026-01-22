import { useNavigate } from 'react-router-dom';
import { Check, Trash2, CheckCheck } from 'lucide-react';
import { useNotificationStore } from '../stores/notificationStore';
import { formatRelativeTime } from '../lib/utils';

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationStore();

  const getNotificationIcon = (type) => {
    const icons = {
      task_assigned: '📋',
      deadline_approaching: '⏰',
      comment: '💬',
      sla_breach: '⚠️',
    };
    return icons[type] || '🔔';
  };

  return (
    <div className="page-transition">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your tasks and activities</p>
        </div>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-all"
          >
            <CheckCheck className="w-5 h-5" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 transition-all ${
                  notification.read ? 'bg-white' : 'bg-accent'
                } hover:bg-accent/70`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        onClick={() => {
                          markAsRead(notification.id);
                          navigate(notification.actionUrl);
                        }}
                        className="cursor-pointer flex-1"
                      >
                        <h3 className="font-semibold text-foreground mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(notification.timestamp)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 hover:bg-primary/10 rounded-lg transition-all"
                            title="Mark as read"
                          >
                            <Check className="w-5 h-5 text-primary" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5 text-destructive" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
