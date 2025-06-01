import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell} from 'recharts';

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

export default function DifficultyBar({ data }) {
  const ratings = [];
for (let v = 800; v <= 3500; v += 100) {
  ratings.push({ name: v.toString(), val:v});
}

  const filteredData = ratings.map(range => {
    const count = data
      .filter(item => item.rating ==range.val)
      .reduce((sum, item) => sum + item.count, 0);
    return { ...range, count };
  }).filter(item => item.count > 0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Problems by Difficulty</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#6b7280' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fill: '#6b7280' }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#f9fafb',
              borderColor: '#e5e7eb',
              borderRadius: '0.5rem',
              color: '#1f2937'
            }}
            formatter={(value) => [value, 'Problems']}
            labelFormatter={(label) => `Rating: ${label}`}
          />
          <Bar 
            dataKey="count" 
            name="Problems"
            fill="#8884d8"
          >
            {filteredData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getColor(entry.val)} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}