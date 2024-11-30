import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Company:</strong> {user.company.name}
      </p>
      <p>
        <strong>Website:</strong>{' '}
        <a href={`https://${user.website}`} className="text-blue-500 hover:underline">
          {user.website}
        </a>
      </p>
      <p>
        <strong>Address:</strong> {`${user.address.suite}, ${user.address.street}, ${user.address.city}`}
      </p>
      <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Back to User List
      </Link>
    </div>
  );
};

export default UserDetail;
