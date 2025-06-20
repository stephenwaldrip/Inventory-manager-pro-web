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
      const res = await axios.get('https://inventory-manager-pro-web.onrender.com/api/materials');
      setMaterials(res.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  const addMaterial = async () => {
    if (!name) return;
    try {
      const res = await axios.post('https://inventory-manager-pro-web.onrender.com/api/materials', { name });
      setMaterials([...materials, res.data]);
      setName('');
    } catch (err) {
      console.error('Error adding material:', err);
    }
  };

  const deleteMaterial = async (id) => {
    try {
      await axios.delete(`https://inventory-manager-pro-web.onrender.com/api/materials/${id}`);
      setMaterials(materials.filter((mat) => mat._id !== id));
    } catch (err) {
      console.error('Error deleting material:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', color: '#fff' }}>
      <h2>📦 Materials</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Material name"
      />
      <button onClick={addMaterial}>Add</button>

      <ul>
        {materials.map((mat) => (
          <li key={mat._id}>
            {mat.name} (PN-{mat.partNumber})
            <button onClick={() => deleteMaterial(mat._id)} style={{ marginLeft: '1rem' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Materials;
