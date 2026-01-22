import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  UserCog,
  Clock,
  Bell,
  Settings,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export default function Sidebar() {
  const { user } = useAuthStore();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
      roles: ['admin', 'manager', 'employee'],
    },
    {
      icon: CheckSquare,
      label: 'Tasks',
      path: '/tasks',
      roles: ['admin', 'manager', 'employee'],
    },
    {
      icon: Clock,
      label: 'SLA Monitor',
      path: '/sla',
      roles: ['admin', 'manager'],
    },
    {
      icon: Bell,
      label: 'Notifications',
      path: '/notifications',
      roles: ['admin', 'manager', 'employee'],
    },
    {
      icon: FileText,
      label: 'Audit Logs',
      path: '/audit',
      roles: ['admin'],
    },
    {
      icon: UserCog,
      label: 'User Management',
      path: '/users',
      roles: ['admin'],
    },
  ];

  const generalItems = [
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
      roles: ['admin', 'manager', 'employee'],
    },
  ];

  const filterByRole = (items) =>
    items.filter((item) => item.roles.includes(user?.role));

  return (
    <aside className="w-64 glass-card-strong border-r border-white/60 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center relative">
            <div className="absolute inset-2 border-2 border-white rounded-full" />
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <span className="text-xl font-bold text-foreground">Donezo</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        {/* Main Menu */}
        <div className="px-4 mb-6">
          <div className="space-y-1">
            {filterByRole(menuItems).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'glass-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:bg-white/50 hover:text-foreground'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* General */}
        <div className="px-4">
          <div className="space-y-1">
            {filterByRole(generalItems).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'glass-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:bg-white/50 hover:text-foreground'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
