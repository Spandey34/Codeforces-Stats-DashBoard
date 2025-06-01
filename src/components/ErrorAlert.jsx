export default function ErrorAlert({ error, clearError }) {
  if (!error) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
        <div className="flex justify-between items-center">
          <p>{error}</p>
          <button onClick={clearError} className="ml-4 text-red-700 hover:text-red-900">
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}