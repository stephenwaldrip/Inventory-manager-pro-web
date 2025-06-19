// src/components/Layout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <header style={{ padding: '1rem', backgroundColor: '#f4f4f4' }}>
        <h2>Inventory Manager Pro</h2>
        <nav style={{ marginTop: '0.5rem' }}>
          <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
