import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useAuthStore } from '../../stores/authStore';

export default function AppLayout() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { logout } = useAuthStore();
  const location = useLocation();
  const profileRef = useRef(null);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
  };

  // Close profile dropdown on route change
  useEffect(() => {
    setProfileOpen(false);
  }, [location.pathname]);

  // Close profile dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }

    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        onLogout={handleLogout}
        profileRef={profileRef}
      />
      <main className="min-h-screen bg-[#f8fafc]" className="ml-64 pt-16">
        <div className="p-6 page-transition">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
