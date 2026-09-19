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
          <span className="brand-mark">Epic Thrift</span>
          <p className="eyebrow">{session.role} account</p>
          <h1>Welcome back, {session.name.split(' ')[0]}.</h1>
          <p>Your {session.role} workspace is ready.</p>
          <button
            className="primary-button"
            onClick={() => { logout(); setSession(null); }}
            type="button"
          >
            Sign out
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-shell">
      <section className="auth-intro">
        <span className="brand-mark">Epic Thrift</span>
        <div className="intro-copy">
          <p className="eyebrow">Curated fashion</p>
          <h1>Style that finds you.</h1>
          <p>
            Discover pre-loved pieces worth keeping — and a wardrobe
            that grows with your taste.
          </p>
        </div>
        <span className="intro-note">Secure &amp; private access for every member.</span>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-heading">
            <p className="eyebrow">
              {mode === 'login' ? 'Welcome back' : 'Get started'}
            </p>
            <h2>
              {mode === 'login' ? 'Sign in.' : 'Create your account.'}
            </h2>
            <p>
              {mode === 'login'
                ? 'Enter your details to continue.'
                : 'Join thousands of thoughtful shoppers.'}
            </p>
          </div>

          {mode === 'login' ? (
            <Login
              error={error}
              onSubmit={submit}
              onSwitch={() => { setMode('register'); setError(''); }}
            />
          ) : (
            <Register
              error={error}
              onSubmit={submit}
              onSwitch={() => { setMode('login'); setError(''); }}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
