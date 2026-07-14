import { useEffect, useState } from 'react';
import { buildApiUrl, getResourceItems } from '../utils/api';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('leaderboard'), {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const payload = await response.json();
        setEntries(getResourceItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading leaderboard…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p className="text-muted">No leaderboard entries yet.</p>
      ) : (
        <ul className="list-group">
          {entries.map((entry, index) => (
            <li className="list-group-item" key={entry._id || entry.id || `${entry.rank}-${index}`}>
              <strong>#{entry.rank}</strong> • {entry.userId?.name || entry.name} • {entry.score} pts
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
