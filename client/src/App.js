// src/App.js
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import Materials from './pages/Materials';
import Locations from './pages/Locations';
import Users from './pages/Users';
import Categories from './pages/Categories';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/materials"
        element={
          <PrivateRoute>
            <Materials />
          </PrivateRoute>
        }
      />
      <Route
        path="/locations"
        element={
          <PrivateRoute>
            <Locations />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
