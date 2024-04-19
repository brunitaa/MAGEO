export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-red-900 text-sm font-bold mb-2">
      {children}
    </label>
  );
}
