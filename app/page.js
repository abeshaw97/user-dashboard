import { useState, useEffect } from 'react';
import axios from 'axios';

function LoadingSpinner() {
  return (
    <div className="flex justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="border rounded p-4 mb-4 shadow">
      <h2 className="font-bold text-lg">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to load users.');
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Users Dashboard</h1>

      {isLoading && <LoadingSpinner />}

      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div>
          {users.length === 0 
            ? <p>No users found.</p> 
            : users.map(user => <UserCard key={user.id} user={user} />)
          }
        </div>
      )}
    </main>
  );
}
