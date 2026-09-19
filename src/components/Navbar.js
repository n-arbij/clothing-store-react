import { useCart } from '../context/CartContext';

function Navbar({ navigate, session, onLogout }) {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="navbar-brand"
          onClick={() => navigate('dashboard')}
          type="button"
        >
          Epic Thrift
        </button>
      </div>

      <div className="navbar-center">
        <button
          className="nav-link"
          onClick={() => navigate('dashboard')}
          type="button"
        >
          Shop
        </button>
        <button className="nav-link" type="button">New Arrivals</button>
        <button className="nav-link" type="button">Sales</button>
        <button className="nav-link" type="button">Journal</button>
      </div>

      <div className="navbar-right">
        {/* Search */}
        <button className="nav-icon-btn" type="button" aria-label="Search">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Account */}
        <button
          className="nav-icon-btn"
          type="button"
          aria-label="Account"
          title={`Signed in as ${session?.name} — click to sign out`}
          onClick={onLogout}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>

        {/* Wishlist */}
        <button className="nav-icon-btn" type="button" aria-label="Wishlist">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Cart */}
        <button
          className="nav-icon-btn nav-cart-btn"
          type="button"
          aria-label="Cart"
          onClick={() => navigate('cart')}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

