import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupBg from "../../assets/images/login.jpeg";
import PasswordInput from "../../components/Input/PasswordInput";
import { validEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
  const navigate = useNavigate();

  // Added fullName state for the signup process
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation for Full Name
    if (!userName) {
      setError("Please enter your name.");
      return;
    }

    if (!validEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    // Signup API Call (Updated endpoint and payload)
    try {
      const response = await axiosInstance.post("/create-account", {
        username: userName,
        email: email,
        password: password,
      });

      // Handle successful signup
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row lg:h-[90vh]">
        {/* Left Image Section */}
        <div
          className="relative bg-cover bg-center w-full h-64 sm:h-80 lg:h-auto lg:w-[55%]"
          style={{ backgroundImage: `url(${SignupBg})` }}
        >
          <div className="absolute inset-0 bg-black/35"></div>

          <div className="relative z-10 h-full flex items-end p-6 sm:p-10 lg:p-12">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
                Join the <br className="hidden sm:block" /> Adventure
              </h1>

              <p className="text-white text-sm sm:text-base lg:text-lg mt-2 lg:mt-5 max-w-lg leading-relaxed lg:leading-8">
                Record your travel experiences, share your stories, and inspire
                others to explore the world through your eyes.
              </p>
            </div>
          </div>
        </div>

        {/* Right Signup Form */}
        <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-10 lg:p-16">
          <form className="w-full max-w-md" onSubmit={handleSignup}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2 lg:mt-3 mb-6 lg:mb-10 text-sm sm:text-base">
              Join us to start your adventure
            </p>

            {/* Full Name Input */}
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 lg:p-4 text-sm sm:text-base border border-gray-300 rounded-xl mb-4 lg:mb-5 outline-none focus:ring-2 focus:ring-cyan-500"
            />

            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 lg:p-4 text-sm sm:text-base border border-gray-300 rounded-xl mb-4 lg:mb-5 outline-none focus:ring-2 focus:ring-cyan-500"
            />

            {/* Password Input */}
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-3 lg:p-4 rounded-xl transition duration-300 shadow-lg mt-2"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-500 mt-6 lg:mt-8 text-sm sm:text-base">
              Already have an account?
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="ml-2 text-cyan-600 font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
