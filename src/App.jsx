import { useState } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import StatsCards from './components/Statscards';
import DifficultyBar from './components/DifficultyBar';
import TagsDonut from './components/TagsDonut';
import HeatMap from './components/HeatMap';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorAlert from './components/ErrorAlert';
import VerdictStats from './components/VerdictStats';

import useCodeforcesData from './hooks/useCodeforcesData';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const {
    handle,
    setHandle,
    fetchData,
    submissions,
    accepted,
    contestData,
    processedData,
    loading,
    error,
    clearError,
  } = useCodeforcesData();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-100 to-blue-50'} p-6`}>
      <div className="max-w-6xl mx-auto">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <UserInput handle={handle} setHandle={setHandle} fetchData={fetchData} loading={loading} />
        
        {submissions.length > 0 && (
          <>
            <StatsCards submissions={submissions} accepted={accepted} />
            <VerdictStats submissions={submissions} contestData={contestData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DifficultyBar data={processedData.diffData} />
              <TagsDonut data={processedData.tagsData} />
            </div>
            <HeatMap submissions={submissions} />
          </>
        )}
      </div>

      {loading && <LoadingOverlay />}
      {error && <ErrorAlert error={error} clearError={clearError} />}
    </div>
  );
}
