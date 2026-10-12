import { useState } from 'react';
import { setToken } from './api.js';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

export default function App() {
  // If a token is saved in the browser, the user is still logged in
  const [name, setName] = useState(localStorage.getItem('name'));

  function handleLogin({ token, name }) {
    setToken(token);
    localStorage.setItem('name', name);
    setName(name);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem('name');
    setName(null);
  }

  return name ? <Dashboard name={name} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}
