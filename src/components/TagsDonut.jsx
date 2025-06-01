import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  "#8884d8", "#8dd1e1", "#82ca9d", "#a4de6c", "#ffc658",
  "#d0ed57", "#ff8042", "#d62728", "#9467bd", "#17becf",
  "#e377c2", "#bcbd22"
];

export default function TagsDonut({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Tags Solved</h2>
      <div className="relative h-[400px]">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="tag"
              cx="50%"
              cy="50%"
              outerRadius={130}
              innerRadius={70}
            >
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: '#f9fafb',
                borderColor: '#e5e7eb',
                borderRadius: '0.5rem',
                color: '#1f2937'
              }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ maxHeight: 380, overflowY: 'auto' }}
              content={({ payload }) => (
                <div className="overflow-y-auto max-h-[380px] pr-2">
                  {payload?.map((entry, index) => (
                    <div key={`item-${index}`} className="text-sm mb-1 whitespace-nowrap dark:text-white">
                      <span style={{ color: entry.color }}>■ </span>
                      {entry.value}
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}