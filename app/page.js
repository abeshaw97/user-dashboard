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
    <div className="p-6">
      <h1 className="text-2xl font-bold">Users Dashboard</h1>
    </div>
  );
}
