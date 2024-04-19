export function Card({ children }) {
  return (
    <div className="bg-gray-100 max-h-md w-full p-6 rounded-md shadow-lg flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
