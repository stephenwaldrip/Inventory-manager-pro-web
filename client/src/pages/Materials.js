import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Materials() {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState('');

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get('/api/materials');
      setMaterials(res.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
      toast.error('Failed to fetch materials');
    }
  };

  const generatePartNumber = async () => {
    let partNumber;
    let isUnique = false;

    while (!isUnique) {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const unique = Math.floor(1000 + Math.random() * 9000);
      partNumber = `PN-${year}${month}${day}-${unique}`;

      const exists = materials.some((m) => m.partNumber === partNumber);
      if (!exists) isUnique = true;
    }

    return partNumber;
  };

  const addMaterial = async (e) => {
    e.preventDefault();
    if (!newMaterial.trim()) return;
    try {
      const partNumber = await generatePartNumber();
      const res = await axios.post('/api/materials', { name: newMaterial, partNumber });
      setMaterials([...materials, res.data]);
      setNewMaterial('');
      toast.success('Material added');
    } catch (err) {
      console.error('Error adding material:', err);
      toast.error('Failed to add material');
    }
  };

  const updateMaterial = async (id, name, partNumber) => {
    try {
      const res = await axios.put(`/api/materials/${id}`, { name, partNumber });
      setMaterials(materials.map(m => (m._id === id ? res.data : m)));
      toast.success('Material updated');
    } catch (err) {
      console.error('Error updating material:', err);
      toast.error('Failed to update material');
    }
  };

  const deleteMaterial = async (id) => {
    try {
      await axios.delete(`/api/materials/${id}`);
      setMaterials(materials.filter(m => m._id !== id));
      toast.info('Material deleted');
    } catch (err) {
      console.error('Error deleting material:', err);
      toast.error('Failed to delete material');
    }
  };

  const pageStyle = {
    padding: '2rem',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
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
    backgroundColor: '#21cbf3',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const partNumberStyle = {
    marginLeft: '1rem',
    color: '#ccc',
    fontSize: '0.9rem',
    fontStyle: 'italic'
  };

  return (
    <div style={pageStyle}>
      <div style={titleStyle}>🧱 Manage Materials</div>
      <form onSubmit={addMaterial} style={formStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="New material name"
          value={newMaterial}
          onChange={(e) => setNewMaterial(e.target.value)}
        />
        <button style={buttonStyle} type="submit">Add Material</button>
      </form>
      <ul>
        {materials.map((mat) => (
          <li key={mat._id} style={{ marginBottom: '1rem' }}>
            <input
              style={inputStyle}
              type="text"
              value={mat.name}
              onChange={(e) =>
                setMaterials(materials.map(m =>
                  m._id === mat._id ? { ...m, name: e.target.value } : m
                ))
              }
              onBlur={() => updateMaterial(mat._id, mat.name, mat.partNumber)}
            />
            <span style={partNumberStyle}>Part #: {mat.partNumber}</span>
            <button style={{ ...buttonStyle, marginLeft: '1rem' }} onClick={() => deleteMaterial(mat._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default Materials;
