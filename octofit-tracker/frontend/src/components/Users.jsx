import { useEffect, useState } from 'react';
import { buildApiUrl, getResourceItems } from '../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('users'));
        if (!response.ok) {
          throw new Error('Unable to load users');
        }
        const payload = await response.json();
        setUsers(getResourceItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading users…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.email}>
            <strong>{user.name || user.username}</strong>
            <div>{user.email}</div>
            <small>{user.city} • {user.fitnessGoal}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
