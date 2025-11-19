// LANDING PAGE COMPONENT

import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-linear-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        {/* Logo and Title */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">ChatterBox</h1>
          <p className="text-xl text-white/90">
            Connect, Chat, and Stay in Touch with Friends
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-semibold mb-2">Real-time Messaging</h3>
            <p className="text-sm text-white/80">
              Send and receive messages instantly
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm text-white/80">
              Your conversations are safe with us
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold mb-2">Cross-Platform</h3>
            <p className="text-sm text-white/80">
              Use on mobile, tablet, or desktop
            </p>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-200"
          >
            Sign In
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-12 text-white/70 text-sm">
          Join thousands of users already chatting on ChatterBox
        </p>
      </div>
    </div>
  );
};

export default LandingPage;