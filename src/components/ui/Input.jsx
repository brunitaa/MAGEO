import { forwardRef, useState } from "react";

export const Input = forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <input
      {...props}
      ref={ref}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`bg-white border-b border-gray-300 text-gray-900 focus:outline-none focus:ring-univalleColorOne focus:border-univalleColorOne block w-full p-2.5 placeholder-gray-400 ${
        isFocused ? "border-univalleColorOne" : ""
      } ${
        props.darkMode
          ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-univalleColorOne dark:focus:border-univalleColorOne"
          : ""
      }`}
    />
  );
});
