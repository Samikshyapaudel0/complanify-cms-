import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  icon,
  showPasswordToggle = false,
  className = ''
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            input-field
            ${icon ? 'pl-10' : ''}
            ${showPasswordToggle ? 'pr-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;