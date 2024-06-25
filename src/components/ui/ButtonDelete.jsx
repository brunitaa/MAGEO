export function ButtonDelete({ onClick, children, disabled }) {
  return (
    <button
      className={`inline-block bg-univalleColorOne text-white px-4 py-2 rounded-md transition duration-300 ease-in-out 
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-univalleColorTwo focus:outline-none focus:ring-2 focus:ring-white-500"
        }`}
      onClick={!disabled ? onClick : null}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
