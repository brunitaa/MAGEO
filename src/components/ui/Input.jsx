import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={`bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 ${
      props.darkMode
        ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
        : ""
    }`}
  />
));
