import { useEffect, useState } from 'react';
import { buildApiUrl, getResourceItems } from '../utils/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('teams'), {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        setTeams(getResourceItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading teams…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p className="text-muted">No teams available yet.</p>
      ) : (
        <ul className="list-group">
          {teams.map((team, index) => (
            <li className="list-group-item" key={team._id || team.id || `${team.name}-${index}`}>
              <strong>{team.name}</strong>
              <div>{team.description}</div>
              <small>{team.focus} • {team.city}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Teams;
