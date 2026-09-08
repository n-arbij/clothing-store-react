import './App.css';
import { useState } from 'react';
import { getSession, login, logout, register } from './api/auth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  const [session, setSession] = useState(getSession);
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');

  const submit = (details) => {
    try {
      setError('');
      setSession(mode === 'login' ? login(details) : register(details));
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  if (session) {
    return (
      <main className="welcome-screen">
        <section className="welcome-panel">
          <span className="brand-mark">EPIC THRIFT</span>
          <p className="eyebrow">{session.role} workspace</p>
          <h1>Welcome back, {session.name.split(' ')[0]}.</h1>
          <p>Your {session.role} account is ready to go.</p>
          <button className="primary-button" onClick={() => { logout(); setSession(null); }} type="button">Sign out</button>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-shell">
      <section className="auth-intro">
        <span className="brand-mark">EPIC THRIFT</span>
        <div className="intro-copy">
          <p className="eyebrow">A better way to shop</p>
          <h1>Everything you need, right where you left it.</h1>
          <p>Sign in to pick up where you left off, or create a new account in a few seconds.</p>
        </div>
        <span className="intro-note">Secure access for every Northstar workspace.</span>
      </section>
      <section className="auth-panel">
        <div className="auth-heading">
          <p className="eyebrow">{mode === 'login' ? 'Welcome back' : 'Join Northstar'}</p>
          <h2>{mode === 'login' ? 'Sign in to your account' : 'Create your account'}</h2>
          <p>{mode === 'login' ? 'Use your account details to continue.' : 'Choose your workspace and get started.'}</p>
        </div>
        {mode === 'login' ? (
          <Login error={error} onSubmit={submit} onSwitch={() => { setMode('register'); setError(''); }} />
        ) : (
          <Register error={error} onSubmit={submit} onSwitch={() => { setMode('login'); setError(''); }} />
        )}
      </section>
    </main>
  );
}

export default App;
