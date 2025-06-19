// src/pages/Categories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      toast.error('Failed to fetch categories');
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      const res = await axios.post('/api/categories', { name: newCategory });
      setCategories([...categories, res.data]);
      setNewCategory('');
      toast.success('Category added');
    } catch (err) {
      console.error('Error adding category:', err);
      toast.error('Failed to add category');
    }
  };

  const updateCategory = async (id, name) => {
    try {
      const res = await axios.put(`/api/categories/${id}`, { name });
      setCategories(categories.map(c => (c._id === id ? res.data : c)));
      toast.success('Category updated');
    } catch (err) {
      console.error('Error updating category:', err);
      toast.error('Failed to update category');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter(c => c._id !== id));
      toast.info('Category deleted');
    } catch (err) {
      console.error('Error deleting category:', err);
      toast.error('Failed to delete category');
    }
  };

  const pageStyle = {
    padding: '2rem',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
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
    backgroundColor: '#f39c12',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  return (
    <div style={pageStyle}>
      <div style={titleStyle}>📂 Manage Categories</div>
      <form onSubmit={addCategory} style={formStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button style={buttonStyle} type="submit">Add Category</button>
      </form>
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>
            <input
              style={inputStyle}
              type="text"
              value={cat.name}
              onChange={(e) =>
                setCategories(categories.map(c =>
                  c._id === cat._id ? { ...c, name: e.target.value } : c
                ))
              }
              onBlur={() => updateCategory(cat._id, cat.name)}
            />
            <button style={buttonStyle} onClick={() => deleteCategory(cat._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default Categories;
