export default function UserInput({ handle, setHandle, fetchData, loading }) {
  return (
    <div className="flex justify-center gap-2 mb-6">
      <input
        type="text"
        value={handle}
        onChange={e => setHandle(e.target.value.trim())}
        placeholder="Enter Codeforces handle"
        className="border p-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      <button
        onClick={fetchData}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Analyze'}
      </button>
    </div>
  );
}