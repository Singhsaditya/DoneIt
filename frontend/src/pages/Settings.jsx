import { useState } from 'react';
import { User, Bell, Lock, Palette } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useToast } from '../hooks/use-toast';

export default function Settings() {
  const { user, updateProfile } = useAuthStore();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskAssigned: true,
    deadlineReminders: true,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profile);
    toast({
      title: 'Profile updated',
      description: 'Your profile has been updated successfully',
    });
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    toast({
      title: 'Preferences saved',
      description: 'Your notification preferences have been updated',
    });
  };

  return (
    <div className="page-transition">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-2xl border border-border">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Profile Settings</h2>
          </div>
          
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center gap-6 mb-6">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-20 h-20 rounded-full border-2 border-primary"
              />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">{user?.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{user?.role.toUpperCase()}</p>
                <button className="text-sm text-primary hover:underline">Change Avatar</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-medium transition-all"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
          </div>
          
          <form onSubmit={handleSaveNotifications} className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-accent rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-accent rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Task Assigned Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when assigned to tasks</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.taskAssigned}
                onChange={(e) => setNotifications({ ...notifications, taskAssigned: e.target.checked })}
                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-accent rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Deadline Reminders</p>
                <p className="text-sm text-muted-foreground">Reminders for upcoming deadlines</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.deadlineReminders}
                onChange={(e) => setNotifications({ ...notifications, deadlineReminders: e.target.checked })}
                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-medium transition-all"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
