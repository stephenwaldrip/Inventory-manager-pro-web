import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RackMap from '../components/RackMap';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedRack, setSelectedRack] = useState('');

  useEffect(() => {
    fetchLocations();
    fetchMaterials();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get('/api/locations');
      setLocations(res.data);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await axios.get('/api/materials');
      setMaterials(res.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  const addLocation = async () => {
    if (!selectedRack || !selectedMaterial) return;
    try {
      const res = await axios.post('/api/locations', {
        name: selectedRack,
        materialId: selectedMaterial,
      });
      setLocations([...locations, res.data]);
    } catch (err) {
      console.error('Error adding location:', err);
    }
  };

  const deleteLocation = async (id) => {
    try {
      await axios.delete(`/api/locations/${id}`);
      setLocations(locations.filter((loc) => loc._id !== id));
    } catch (err) {
      console.error('Error deleting location:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', color: '#fff' }}>
      <h2>📍 Manage Locations</h2>
      <div style={{ marginBottom: '1rem' }}>
        <select value={selectedRack} onChange={(e) => setSelectedRack(e.target.value)}>
          <option value="">Select Rack Location</option>
          {['A1','A2','A3','A4','B1','B2','B3','B4','C1','C2','C3','C4'].map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
          <option value="">Select Material</option>
          {materials.map((mat) => (
            <option key={mat._id} value={mat._id}>{mat.name} (PN-{mat.partNumber})</option>
          ))}
        </select>

        <button onClick={addLocation} style={{ marginLeft: '1rem' }}>Add Location</button>
      </div>

      <ul>
        {locations.map((loc) => (
          <li key={loc._id}>
            {loc.name} <button onClick={() => deleteLocation(loc._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: '2rem' }}>🧳 Rack Map (Click to Assign)
      </h3>
      <RackMap
        onLocationSelect={(id) => setSelectedRack(id)}
        selectedRack={selectedRack}
        layout={[]} // future use
        locations={locations}
      />
    </div>
  );
}

export default Locations;
