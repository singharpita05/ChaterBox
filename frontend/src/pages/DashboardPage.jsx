// DASHBOARD PAGE

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">ChatterBox</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.username}
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
                <div>
                  <p className="font-semibold text-gray-800">{user?.username}</p>
                  <p className="text-xs text-gray-500">{user?.status}</p>
                </div>
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to ChatterBox Dashboard! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            You are successfully logged in as <strong>{user?.username}</strong>
          </p>

          {/* User Details Card */}
          <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 text-left">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Profile</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Username:</span>{' '}
                <span className="font-semibold">{user?.username}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>{' '}
                <span className="font-semibold">{user?.email}</span>
              </div>
              <div>
                <span className="text-gray-600">Bio:</span>{' '}
                <span className="font-semibold">{user?.bio}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>{' '}
                <span className={`font-semibold ${user?.status === 'online' ? 'text-green-600' : 'text-gray-600'}`}>
                  {user?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Coming Soon Message */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-semibold">📱 Chat features coming in Phase 2!</p>
            <p className="text-blue-600 text-sm mt-2">
              Profile management, user search, and dashboard layout will be added next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;