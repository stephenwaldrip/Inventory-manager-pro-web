import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('Failed to fetch users');
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (!newUsername.trim()) return;
    try {
      const res = await axios.post('/api/users', { name: newUsername });
      setUsers([...users, res.data]);
      setNewUsername('');
      toast.success('User added');
    } catch (err) {
      console.error('Error adding user:', err);
      toast.error('Failed to add user');
    }
  };

  const updateUser = async (id, name) => {
    try {
      const res = await axios.put(`/api/users/${id}`, { name });
      setUsers(users.map(u => (u._id === id ? res.data : u)));
      toast.success('User updated');
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error('Failed to update user');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.info('User deleted');
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Failed to delete user');
    }
  };

  const pageStyle = {
    padding: '2rem',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(to right, #283048, #859398)',
    minHeight: '100vh',
    color: '#fff'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    fontWeight: 'bold'
  };

  const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const inputStyle = {
    padding: '0.5rem',
    borderRadius: '8px',
    border: 'none',
    width: '200px'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    backgroundColor: '#00b894',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  return (
    <div style={pageStyle}>
      <div style={titleStyle}>👤 Manage Users</div>
      <form onSubmit={addUser} style={formStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="New user name"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button style={buttonStyle} type="submit">Add User</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <input
              style={inputStyle}
              type="text"
              value={user.name}
              onChange={(e) =>
                setUsers(users.map(u =>
                  u._id === user._id ? { ...u, name: e.target.value } : u
                ))
              }
              onBlur={() => updateUser(user._id, user.name)}
            />
            <button style={buttonStyle} onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default Users;
