import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Fixed import

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    // Wrapper handles the margin and allows absolute positioning for the icon
    <div className="relative w-full mb-6 lg:mb-7">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        type={isShowPassword ? "text" : "password"}
        // Added pr-12 (padding-right) so text doesn't type under the icon
        className="w-full p-3 lg:p-4 pr-12 text-sm sm:text-base border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Fixed Ternary Operator (added the missing colon) */}
      {isShowPassword ? (
        <FaRegEye
          size={22}
          // Absolute positioning centers the icon vertically on the right
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-cyan-500 transition-colors"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-cyan-500 transition-colors"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
