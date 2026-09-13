'use client';

import { FormEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login gagal.');
      window.location.href = next.startsWith('/') ? next : '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal.');
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-mark">+</div>
        <div className="login-kicker">CLINICAL PLATFORM</div>
        <h1>Dokter Jaga</h1>
        <p className="login-subtitle">Masuk untuk mengakses clinical cases, emergency resources, clinical tools, dan library.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Username<input autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan username" required /></label>
          <label>Password<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" required /></label>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" disabled={loading}>{loading ? 'Memverifikasi...' : 'Masuk ke platform'}</button>
        </form>
        <div className="login-note">Akses ini diperuntukkan bagi pengguna yang memiliki akun. Jangan membagikan kredensial kepada pihak lain.</div>
      </div>
      <style jsx>{`
        .login-page{min-height:100vh;background:#f4f7f8;display:grid;place-items:center;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#172b3b}
        .login-card{width:min(440px,100%);background:#fff;border:1px solid #dfe7ea;border-radius:18px;padding:36px;box-shadow:0 20px 60px rgba(15,43,61,.09)}
        .login-mark{width:48px;height:48px;border-radius:13px;background:#19a89f;color:#fff;display:grid;place-items:center;font-size:31px;font-weight:700;margin-bottom:20px}
        .login-kicker{font-size:9px;font-weight:800;letter-spacing:.15em;color:#0f766e}
        h1{font-size:32px;letter-spacing:-.04em;margin:7px 0 9px}
        .login-subtitle{margin:0 0 26px;color:#71828c;font-size:12px;line-height:1.65}
        .login-form{display:flex;flex-direction:column;gap:15px}
        label{font-size:10px;font-weight:800;color:#405763}
        input{display:block;width:100%;height:46px;margin-top:7px;border:1px solid #d6e0e5;border-radius:9px;background:#fbfcfc;padding:0 13px;font-size:12px;color:#203744;outline:none;box-sizing:border-box}
        input:focus{border-color:#65b6b0;box-shadow:0 0 0 3px rgba(15,118,110,.08)}
        button{height:46px;border:0;border-radius:9px;background:#0f766e;color:#fff;font-size:11px;font-weight:800;cursor:pointer;margin-top:3px}
        button:disabled{opacity:.65;cursor:wait}
        .login-error{padding:10px 12px;border:1px solid #f0c9c5;background:#fff4f3;color:#b42318;border-radius:8px;font-size:10px}
        .login-note{margin-top:20px;padding-top:16px;border-top:1px solid #edf0f2;color:#8a989f;font-size:9px;line-height:1.6}
        @media(max-width:520px){.login-card{padding:26px}.login-page{padding:16px}}
      `}</style>
    </main>
  );
}
