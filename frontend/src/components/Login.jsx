import { useState } from 'react';
import { api } from '../api.js';

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    try {
      const result = isRegister ? await api.register(form) : await api.login(form);
      onLogin(result);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="card login" onSubmit={submit}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      {isRegister && <input name="name" placeholder="Name" value={form.name} onChange={change} />}
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} />
      <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={change} />
      <button type="submit">{isRegister ? 'Create account' : 'Login'}</button>
      {error && <p className="error">{error}</p>}
      <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(!isRegister); setError(''); }}>
        {isRegister ? 'Already have an account? Login' : 'New here? Register'}
      </a>
    </form>
  );
}
