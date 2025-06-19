import React from 'react';
import '../styles/RackMap.css';

function RackMap({ locations, onSelect }) {
  return (
    <div className="rack-map">
      {locations.map((loc) => (
        <button
          key={loc.name}
          className={`rack-cell ${loc.material ? 'occupied' : ''}`}
          onClick={() => onSelect(loc.name)}
        >
          <span className="rack-label">{loc.name}</span>
          {loc.material && <span className="rack-material">{loc.material}</span>}
        </button>
      ))}
    </div>
  );
}

export default RackMap;
