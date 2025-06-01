import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useCodeforcesData from '../hooks/useCodeforcesData';
const COLORS = [
  '#4CAF50', // Accepted (green)
  '#FFC107', // TLE (yellow)
  '#F44336', // MLE/WA (red)
  '#9E9E9E', // Runtime Error (gray)
  '#2196F3', // Compilation Error (blue)
  '#673AB7'  // Other (purple)
];


const VERDICT_MAPPING = {
  'OK': 'Accepted',
  'TIME_LIMIT_EXCEEDED': 'TLE',
  'MEMORY_LIMIT_EXCEEDED': 'MLE',
  'WRONG_ANSWER': 'WA',
  'RUNTIME_ERROR': 'Runtime Error',
  'COMPILATION_ERROR': 'Compilation Error'
};



export default function VerdictStats({ submissions, contestData }) {
  // Process verdict data
  const verdictData = submissions.reduce((acc, { verdict }) => {
    const cleanVerdict = VERDICT_MAPPING[verdict] || 'Other';
    acc[cleanVerdict] = (acc[cleanVerdict] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(verdictData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
  
  const contestRanks = contestData.map(contest => contest.rank);
  const bestRank = contestRanks.length > 0 ? Math.min(...contestRanks) : null;
  const worstRank = contestRanks.length > 0 ? Math.max(...contestRanks) : null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full mb-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Performance Statistics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">Submission Verdict Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    value, 
                    `${name}:`
                  ]}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{ maxHeight: 200, overflowY: 'auto' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
              Best Contest Rank
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
              {bestRank ? `#${bestRank}` : 'N/A'}
            </p>
            {bestRank && (
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                {contestData.find(c => c.rank === bestRank)?.contestName || ''}
              </p>
            )}
          </div>

          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-100 dark:border-red-800">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
              Worst Contest Rank
            </h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-300">
              {worstRank ? `#${worstRank}` : 'N/A'}
            </p>
            {worstRank && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                {contestData.find(c => c.rank === worstRank)?.contestName || ''}
              </p>
            )}
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-100 dark:border-green-800">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
              Contests Attended
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-300">
              {contestData.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}