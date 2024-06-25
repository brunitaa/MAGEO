export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-gray-900 text-lg  mb-2">
      {children}
    </label>
  );
}

export function Label2({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-univalleColorTwo text-lg  mb-2"
    >
      {children}
    </label>
  );
}
