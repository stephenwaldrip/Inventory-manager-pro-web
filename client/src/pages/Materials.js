import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Materials() {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/materials`);
      setMaterials(res.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  const addMaterial = async () => {
    if (!name.trim()) return;
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/materials`, { name });
      setMaterials([...materials, res.data]);
      setName('');
    } catch (err) {
      console.error('Error adding material:', err);
    }
  };

  const deleteMaterial = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/materials/${id}`);
      setMaterials(materials.filter((mat) => mat._id !== id));
    } catch (err) {
      console.error('Error deleting material:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        📦 Materials
      </h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Material name"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={addMaterial} style={{ padding: '0.5rem 1rem' }}>Add</button>
      </div>

      {materials.length === 0 ? (
        <p>No materials found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {materials.map((mat) => (
            <li key={mat._id} style={{ marginBottom: '0.5rem' }}>
              <span>{mat.name} {mat.partNumber ? `(PN-${mat.partNumber})` : ''}</span>
              <button
                onClick={() => deleteMaterial(mat._id)}
                style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Materials;
