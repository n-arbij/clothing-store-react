import './App.css';
import { useState } from 'react';
import { getSession, login, logout, register } from './api/auth';
import { CartProvider } from './context/CartContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  const [session, setSession] = useState(getSession);
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [page, setPage] = useState({ name: 'dashboard' });

  const navigate = (name, params = {}) => {
    setPage({ name, ...params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = (details) => {
    try {
      setError('');
      setSession(mode === 'login' ? login(details) : register(details));
      navigate('dashboard');
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  const handleLogout = () => {
    logout();
    setSession(null);
  };

  // ── Auth shell ──────────────────────────────────────────────────
  if (!session) {
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

  // ── Authenticated pages (all share a single CartProvider) ───────
  const sharedProps = { navigate, session, onLogout: handleLogout };

  return (
    <CartProvider>
      {page.name === 'product' && (
        <ProductDetail productId={page.productId} {...sharedProps} />
      )}
      {page.name === 'cart' && (
        <Cart {...sharedProps} />
      )}
      {page.name !== 'product' && page.name !== 'cart' && (
        <Dashboard {...sharedProps} />
      )}
    </CartProvider>
  );
}

export default App;
