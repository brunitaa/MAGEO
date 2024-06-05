export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-gray-900 text-lg  mb-2">
      {children}
    </label>
  );
}
