import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const getHeatmapColor = (count) => {
  if (!count) return 'color-empty'; // No submissions
  if (count >= 10) return 'color-scale-4'; // Very active
  if (count >= 5) return 'color-scale-3'; // Active
  if (count >= 2) return 'color-scale-2'; // Some activity
  return 'color-scale-1'; // Minimal activity
};

export default function HeatMap({ submissions }) {
  const dateMap = {};

  submissions.forEach(({ creationTimeSeconds, verdict }) => {
    const date = new Date(creationTimeSeconds * 1000).toISOString().split('T')[0];
    dateMap[date] = (dateMap[date] || 0) + 1;
  });

  const values = Object.entries(dateMap).map(([date, count]) => ({
    date,
    count
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full mt-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Yearly Submission Heatmap</h2>
      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={new Date(new Date().getFullYear(), 0, 1)}
          endDate={new Date()}
          values={values}
          classForValue={(value) => value ? getHeatmapColor(value.count) : 'color-empty'}
          tooltipDataAttrs={value => ({
            'data-tooltip-id': 'heatmap-tooltip',
            'data-tooltip-content': value.date 
              ? `${value.date}\nSubmissions: ${value.count}`
              : ''
          })}
          showWeekdayLabels
        />
        <ReactTooltip id="heatmap-tooltip" />
      </div>
    </div>
  );
}