import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

export default function Navbar() {
  const auth = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    nav('/login');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-semibold">MyBlog</Link>
          <Link to="/" className="text-sm text-gray-600 hover:underline">Feed</Link>
          {auth.token && <Link to="/my-posts" className="text-sm text-gray-600 hover:underline">My Posts</Link>}
        </div>

        <div>
          {auth.token ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">Hi, {auth.user?.name}</span>
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Logout</button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="text-sm text-gray-700 hover:underline">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
