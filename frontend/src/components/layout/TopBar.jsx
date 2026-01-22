import { useState } from 'react';
import { Search, Bell, Mail, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { formatRelativeTime } from '../../lib/utils';

export default function TopBar({
  profileOpen,
  setProfileOpen,
  onLogout,
  profileRef,
}) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { notifications, unreadCount, markAsRead } = useNotificationStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery);
    }
  };

  return (
    <header className="h-16 glass-card-strong border-b border-white/60 fixed top-0 left-64 right-0 z-20">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search task"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-16 py-2.5 bg-white/40 border border-white/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white/60 border border-white/70 rounded text-xs text-muted-foreground">
            ⌘F
          </kbd>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-6">
          <button className="p-2 hover:bg-white/50 rounded-xl transition-all">
            <Mail className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-white/50 rounded-xl transition-all"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 glass-card-strong rounded-2xl border border-white/60 shadow-lg overflow-hidden">
                <div className="p-4 border-b border-white/40">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>

                <div className="max-h-96 overflow-y-auto divide-y divide-white/40">
                  {notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markAsRead(notif.id);
                        navigate(notif.actionUrl);
                        setShowNotifications(false);
                      }}
                      className={`p-4 hover:bg-white/50 transition-all cursor-pointer ${
                        !notif.read ? 'bg-white/40' : ''
                      }`}
                    >
                      <p className="text-sm font-medium text-foreground mb-1">
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(notif.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-white/40 text-center">
                  <button
                    onClick={() => {
                      navigate('/notifications');
                      setShowNotifications(false);
                    }}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div
            ref={profileRef}
            className="relative flex items-center gap-3 pl-4 border-l border-white/40"
          >
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 hover:bg-white/40 px-3 py-1.5 rounded-xl transition-all"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-9 h-9 rounded-full border-2 border-primary shadow-sm"
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 glass-card-strong rounded-xl border border-white/60 shadow-lg z-50">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-white/50 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
