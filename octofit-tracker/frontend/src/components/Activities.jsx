import { useEffect, useState } from 'react';
import { buildApiUrl, getResourceItems } from '../utils/api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('activities'), {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        setActivities(getResourceItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading activities…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p className="text-muted">No activities available yet.</p>
      ) : (
        <ul className="list-group">
          {activities.map((activity, index) => (
            <li className="list-group-item" key={activity._id || activity.id || `${activity.activityType}-${index}`}>
              <strong>{activity.activityType}</strong>
              <div>{activity.notes}</div>
              <small>{activity.durationMinutes} min • {activity.distanceKm ?? 0} km</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activities;
