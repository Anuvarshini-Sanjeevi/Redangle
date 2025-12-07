import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import loginImage from '../../assets/login_image.png';
import redAngleLogo from '../../assets/red_angle_logo.png';


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; uniqueId?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string; uniqueId?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!uniqueId) {
      newErrors.uniqueId = 'Unique ID is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // TODO: Add API call here for authentication
      navigate('/admin/dashboard');
    }
  };

  const handleGoogleSignIn = () => {
    // Google OAuth Popup - Opens in a popup window like other apps
    const clientId = process.env.VITE_GOOGLE_CLIENT_ID || '';
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/google/callback');
    const scope = encodeURIComponent('openid email profile');
    const responseType = 'code';
    
    if (clientId) {
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=online&prompt=select_account`;
      
      // Open in popup window
      const width = 500;
      const height = 600;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
      
      const popup = window.open(
        googleAuthUrl,
        'google-auth',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
      );
      
      // Listen for popup to close or receive message
      if (popup) {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            // Handle popup closed - you can add callback logic here
          }
        }, 1000);
      }
    } else {
      // Fallback: Open Google accounts in popup
      const width = 500;
      const height = 600;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
      
      window.open(
        'https://accounts.google.com/',
        'google-accounts',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src={loginImage} 
          alt="Login" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-start justify-center bg-white px-8 md:px-12 lg:px-16 xl:px-20 pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-16">
        <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
          {/* Logo - Centered */}
          <div className="mb-8 md:mb-10 text-center">
            <div className="flex justify-center mb-6 md:mb-8">
              <img 
                src={redAngleLogo} 
                alt="Red Angle Studio" 
                className="h-36 md:h-40 lg:h-44 xl:h-48 w-auto"
              />
            </div>
            <h6 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">Create an account</h6>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-4 px-5 py-5 md:py-6 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-8 md:mb-10 shadow-md"
          >
            <svg className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-semibold text-lg md:text-xl">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6 md:mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-base md:text-lg">
              <span className="px-3 bg-white text-gray-500 font-medium">Or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Email Address */}
            <div className="text-left">
              <label htmlFor="email" className="block text-lg md:text-xl font-bold text-gray-700 mb-3 md:mb-4">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="Enter your email address"
                className={`w-full px-5 md:px-6 py-5 md:py-6 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent text-gray-600 placeholder-gray-400 text-lg md:text-xl ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-base md:text-lg text-red-500 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Unique ID */}
            <div className="text-left">
              <label htmlFor="uniqueId" className="block text-lg md:text-xl font-bold text-gray-700 mb-3 md:mb-4">
                Unique ID
              </label>
              <input
                type="text"
                id="uniqueId"
                value={uniqueId}
                onChange={(e) => {
                  setUniqueId(e.target.value);
                  if (errors.uniqueId) setErrors({ ...errors, uniqueId: undefined });
                }}
                placeholder="Enter your Unique ID"
                className={`w-full px-5 md:px-6 py-5 md:py-6 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent text-gray-600 placeholder-gray-400 text-lg md:text-xl ${
                  errors.uniqueId ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.uniqueId && (
                <p className="mt-2 text-base md:text-lg text-red-500 font-medium">{errors.uniqueId}</p>
              )}
            </div>

            {/* Password */}
            <div className="text-left">
              <label htmlFor="password" className="block text-lg md:text-xl font-bold text-gray-700 mb-3 md:mb-4">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  placeholder="Create your password"
                  className={`w-full px-5 md:px-6 py-5 md:py-6 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent pr-14 md:pr-16 text-gray-600 placeholder-gray-400 text-lg md:text-xl ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 focus:outline-none p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-7 h-7 md:w-8 md:h-8 text-white stroke-gray-500 stroke-[1.5]" style={{ filter: 'drop-shadow(0 0 1px rgba(107, 114, 128, 0.8))' }} />
                  ) : (
                    <Eye className="w-7 h-7 md:w-8 md:h-8 text-white stroke-gray-500 stroke-[1.5]" style={{ filter: 'drop-shadow(0 0 1px rgba(107, 114, 128, 0.8))' }} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-base md:text-lg text-red-500 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#6938ef] text-white py-5 md:py-6 rounded-lg font-bold hover:bg-[#5a2dd4] transition-colors text-xl md:text-2xl mt-3 shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 md:mt-12 text-center">
            <span className="text-gray-600 text-lg md:text-xl">Don't have an account? </span>
            <a href="#" className="text-[#6938ef] font-bold hover:underline text-lg md:text-xl">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

