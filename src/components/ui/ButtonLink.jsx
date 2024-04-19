import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link
    to={to}
    className="inline-block bg-red-800 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-white-500"
  >
    {children}
  </Link>
);
