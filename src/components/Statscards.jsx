const getColor = (rating) => {
  if (!rating) return '#808080';
  if (rating >= 2400) return '#ff0000';
  if (rating >= 2100) return '#ff8c00';
  if (rating >= 1900) return '#aa00aa';
  if (rating >= 1600) return '#0000ff';
  if (rating >= 1400) return '#03a89e';
  if (rating >= 1200) return '#28a745';
  return '#808080';
};

export default function StatsCards({ submissions, accepted }) {
  const totalSubs = submissions.length;
  const acceptedSubs = accepted.length;
  const acceptanceRate = totalSubs > 0 ? Math.round((acceptedSubs / totalSubs) * 100) : 0;
  const maxRating = Math.max(...accepted.map(s => s.problem.rating || 0), 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-gray-500 dark:text-gray-400">Total Submissions</h3>
        <p className="text-2xl font-bold dark:text-white">{totalSubs}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-gray-500 dark:text-gray-400">Accepted</h3>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{acceptedSubs}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-gray-500 dark:text-gray-400">Acceptance Rate</h3>
        <p className="text-2xl font-bold dark:text-white">{acceptanceRate}%</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-gray-500 dark:text-gray-400">Max Solved Rating</h3>
        <p className="text-2xl font-bold" style={{color: getColor(maxRating)}}>
          {maxRating || 'N/A'}
        </p>
      </div>
    </div>
  );
}