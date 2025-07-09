"use client";  // Needed for using React hooks in Next.js App Router

import { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  // Step 2: Set up state
  const [users, setUsers] = useState([]);           // Holds fetched user data
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null);         // Holds error message (if any)

  // Step 3: Fetch users when the component mounts
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);     // Save data to users
        setIsLoading(false);         // Stop loading
      })
      .catch(() => {
        setError("Failed to load users."); // Set error message
        setIsLoading(false);               // Stop loading even if failed
      });
  }, []);

  // Temporary UI placeholder 
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Users Dashboard</h1>
  
      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
  
      {error && <p className="text-red-500">{error}</p>}
  
      {!isLoading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-4 border rounded p-4 shadow">
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}