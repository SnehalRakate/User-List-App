import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setLoading, setError } from '../features/usersSlice';
import { fetchUsers } from '../api/userapi';
import SearchBar from '../components/SearchBar';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchUsers();
        dispatch(setUsers(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    getUsers();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

 
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border-collapse border border-black">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b border-black text-left">Name</th>
              <th className="py-2 px-4 border-b border-black text-left">Email</th>
              <th className="py-2 px-4 border-b border-black text-left">Phone</th>
              <th className="py-2 px-4 border-b border-black text-left">Company</th>
              <th className="py-2 px-4 border-b border-black text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-black">{user.name}</td>
                <td className="py-2 px-4 border-b border-black">{user.email}</td>
                <td className="py-2 px-4 border-b border-black">{user.phone}</td>
                <td className="py-2 px-4 border-b border-black">{user.company.name}</td>
                <td className="py-2 px-4 border-b border-black">
                  <a
                    href={`/user/${user.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
