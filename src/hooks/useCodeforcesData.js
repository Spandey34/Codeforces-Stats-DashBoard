import { useState, useMemo } from 'react';

export default function useCodeforcesData() {
  const [handle, setHandle] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [contestData, setContestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accepted = useMemo(() =>
    submissions.filter(sub => sub.verdict === 'OK'),
    [submissions]
  );

  const processedData = useMemo(() => {
    const difficultyMap = {};
    const tagMap = {};
    
    accepted.forEach(sub => {
      const { rating, tags } = sub.problem;
      if (rating) difficultyMap[rating] = (difficultyMap[rating] || 0) + 1;
      tags.forEach(tag => tagMap[tag] = (tagMap[tag] || 0) + 1);
    });

    return {
      diffData: Object.entries(difficultyMap)
        .map(([rating, count]) => ({ rating: parseInt(rating), count }))
        .sort((a, b) => a.rating - b.rating),
      tagsData: Object.entries(tagMap)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
    };
  }, [accepted]);

  const fetchData = async () => {
    if (!handle) {
      setError("Please enter a Codeforces handle");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [submissionsRes, contestsRes] = await Promise.all([
        fetch(`https://codeforces.com/api/user.status?handle=${handle}`),
        fetch(`https://codeforces.com/api/user.rating?handle=${handle}`)
      ]);

      if (!submissionsRes.ok || !contestsRes.ok) {
        throw new Error('Failed to fetch data from Codeforces');
      }

      const [submissionsData, contestsData] = await Promise.all([
        submissionsRes.json(),
        contestsRes.json()
      ]);

      if (submissionsData.status !== 'OK' || contestsData.status !== 'OK') {
        throw new Error(submissionsData.comment || contestsData.comment || 'Unknown error');
      }

      setSubmissions(submissionsData.result);
      setContestData(contestsData.result);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
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
  };
}
