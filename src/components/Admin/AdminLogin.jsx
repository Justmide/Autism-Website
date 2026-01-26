import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { LogIn, Shield, Lock } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      // Save to localStorage for quick check
      localStorage.setItem('admin-authenticated', 'true');
      onLogin(data.user);
      
    } catch (err) {
      setError(err.message || 'Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-sage/10 to-brand-navy/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-card p-8">
        <div className="text-center mb-8">
          <div className="w-30 h-30 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src='https://ucarecdn.com/6d8418de-73c8-4653-a42c-fe4faad98376/-/preview/569x438/' alt="SpedEveryday logo" className="w-[90px]" />
          </div>
          <h2 className="text-2xl font-bold text-brand-navy">SpedEveryday Shop Admin</h2>
          <p className="text-brand-navy/70 mt-2">Secure Admin Portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-navy/20 focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition-colors"
              placeholder="your-email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-navy/20 focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20 outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-navy py-3 rounded-xl hover:bg-brand-sage flex items-center justify-center gap-2 disabled:opacity-50 hover:rounded-tl-3xl hover:rounded-bl-3xl hover:rounded-tr-3xl hover:shadow-lg bg-transparent border-2 border-brand-navy text-brand-navy px-6 rounded-tr-3xl rounded-bl-3xl font-semibold hover:border-2 transition-colors duration-300"
          >
            <LogIn className="w-5 h-5 " />
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-brand-navy/60">
           Admin Login details Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;