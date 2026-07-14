import { useEffect, useState } from 'react';
import { buildApiUrl, getResourceItems } from '../utils/api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('workouts'), {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const payload = await response.json();
        setWorkouts(getResourceItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading workouts…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts available yet.</p>
      ) : (
        <ul className="list-group">
          {workouts.map((workout, index) => (
            <li className="list-group-item" key={workout._id || workout.id || `${workout.name}-${index}`}>
              <strong>{workout.name}</strong>
              <div>{workout.description}</div>
              <small>{workout.durationMinutes} min • {workout.focusArea}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Workouts;
