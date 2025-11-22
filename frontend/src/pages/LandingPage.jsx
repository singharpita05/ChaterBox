// LANDING PAGE COMPONENT

import {
  ArrowRight,
  CheckCircle,
  Github,
  Globe,
  Linkedin,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Navigation */}
      <header className="w-full flex-none">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 bg-white/40 backdrop-blur-sm border border-white/20 shadow rounded-2xl px-3 py-2">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="ChatterBox Logo"
                className="w-8 h-8 sm:w-8 sm:h-8 rounded-lg object-cover"
              />
              <span className="text-lg sm:text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ChatterBox
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full font-semibold"
              >
                Get Started
              </Link>
            </div>

            <div className="flex sm:hidden items-center gap-2">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-3 py-1 rounded-full font-semibold"
              >
                Start
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
          {/* Hero and Features Container - Side by Side on Large Screens */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 py-6">
            {/* Hero Section - Left Side */}
            <section className="flex flex-col justify-center min-h-[60vh]">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full mb-4 sm:mb-6 w-fit">
                <Zap size={16} />
                <span className="text-xs sm:text-sm font-medium">
                  Real-time messaging platform
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                Connect, Chat,
                <br />
                <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Stay in Touch
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Experience seamless real-time messaging with your friends and
                family. Fast, secure, and beautifully simple.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  to="/signup"
                  className="group bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-200 transform flex items-center justify-center space-x-2"
                >
                  <span className="text-sm sm:text-base">
                    Start Chatting Now
                  </span>
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform duration-200"
                    size={20}
                  />
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-200 text-center text-sm sm:text-base"
                >
                  Sign In
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500 shrink-0" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500 shrink-0" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500 shrink-0" />
                  <span>Instant setup</span>
                </div>
              </div>
            </section>

            {/* Features Section - Right Side */}
            <section className="flex flex-col justify-center min-h-[60vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Feature 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <MessageSquare className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Real-time Messaging
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Send and receive messages instantly with zero delays.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Shield className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Secure & Private
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Encrypted conversations that prioritize your privacy.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Zap className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Optimized for smooth, lag-free messaging experience.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Globe className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Cross-Platform
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Works seamlessly on mobile, tablet, and desktop.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer (slightly slimmer) */}
      <footer className="flex-none w-full">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ChatterBox logo"
              className="w-8 h-8 shrink-0"
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ChatterBox
                </span>
              </div>
              <span className="sr-only">—</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm font-bold text-gray-500 m-0">
              Developed &amp; Designed by{" "}
              <a
                href="https://www.linkedin.com/in/singharpitaa05"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Arpita Singh
              </a>
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/singharpitaa05"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ChatterBox GitHub"
                title="ChatterBox GitHub"
                className="hover:text-gray-900"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/singharpitaa05"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Arpita Singh LinkedIn"
                title="Arpita Singh LinkedIn"
                className="hover:text-blue-600"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;