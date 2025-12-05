import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../features/auth/authThunks';
import { Navigate } from 'react-router-dom';
import Button from '../components/UI/Button';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector(s => s.auth);

  if (token) return <Navigate to="/" />;

  const submit = (e) => {
    e.preventDefault();
    dispatch(loginUserThunk(form));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" variant="primary" className="w-full" disabled={loading}>{loading ? 'Logging...' : 'Login'}</Button>
      </form>
    </div>
  );
}
