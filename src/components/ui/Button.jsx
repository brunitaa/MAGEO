export function Button({ onClick, children }) {
  return (
    <button
    className="inline-block bg-red-800 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-white-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Button2({ onClick, children }) {
  return (
    <button
    className="inline-block bg-white text-black px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
}