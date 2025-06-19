import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const cardStyle = {
    padding: '2rem',
    margin: '1rem',
    flex: '1 1 200px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #2196f3, #21cbf3)',
    color: '#fff',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer'
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    minHeight: '100vh',
    color: '#fff'
  };

  const titleStyle = {
    width: '100%',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#ffffff'
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>📦 Inventory Manager Pro Dashboard</div>
      <div
        style={cardStyle}
        onClick={() => handleNavigation('/materials')}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        🪵 Materials
      </div>
      <div
        style={cardStyle}
        onClick={() => handleNavigation('/locations')}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        📍 Locations
      </div>
      <div
        style={cardStyle}
        onClick={() => handleNavigation('/users')}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        👤 Users
      </div>
      <div
        style={cardStyle}
        onClick={() => handleNavigation('/categories')}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        🗂️ Categories
      </div>
    </div>
  );
}

export default Dashboard;
