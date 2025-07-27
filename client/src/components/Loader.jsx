import React from "react";

const Loader = ({ 
  message = "Loading", 
  color = "blue", 
  size = "medium"
}) => {
  const colorClasses = {
    blue: "bg-blue-500",
    red: "bg-red-500", 
    green: "bg-green-500",
    purple: "bg-purple-500",
    gray: "bg-gray-500",
    orange: "bg-orange-500"
  };

  const sizeClasses = {
    small: "w-2 h-2",
    medium: "w-3 h-3", 
    large: "w-4 h-4"
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <div 
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
          ></div>
          <div 
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div 
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
        <span className="text-gray-700 font-medium text-lg">{message}</span>
      </div>
    </div>
  );
};

export default Loader;