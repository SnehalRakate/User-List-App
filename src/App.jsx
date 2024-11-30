import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserDetail from './components/UserDetail';
import AddUserForm from './components/AddUserForm';
import "./index.css"

const App = () => {
  const [users, setUsers] = useState([]);

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home users={users} />} />
        <Route path="/add-user" element={<AddUserForm onAddUser={handleAddUser} />} />
        <Route path="/user-detail/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
