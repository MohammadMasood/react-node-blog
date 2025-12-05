import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";
import { registerUserThunk } from "../features/auth/authThunks";
import { clearAuthError } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => { return () => dispatch(clearAuthError()); }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); dispatch(registerUserThunk(form)); };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      {error && <p className="bg-red-100 text-red-700 p-2 mb-3 rounded">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full p-3 border rounded" required />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} className="w-full p-3 border rounded" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 border rounded" required />
        <Button type="submit" disabled={loading} className="w-full">{loading ? <Spinner size={18} /> : "Register"}</Button>
      </form>
    </div>
  );
};

export default Register;
