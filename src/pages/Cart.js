import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

function Cart({ navigate, session, onLogout }) {
  const { cart, removeFromCart, updateQuantity, totalItems } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= 150 ? 0 : 12;
  const total = subtotal + shipping;

  if (totalItems === 0) {
    return (
      <div className="page">
        <Navbar navigate={navigate} session={session} onLogout={onLogout} />
        <div className="cart-empty">
          <p className="eyebrow">Your bag</p>
          <h2 className="cart-empty-title">Your bag is empty.</h2>
          <p className="cart-empty-sub">
            Looks like you haven't added anything yet.
          </p>
          <button
            className="primary-button cart-empty-btn"
            onClick={() => navigate('dashboard')}
            type="button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar navigate={navigate} session={session} onLogout={onLogout} />

      <div className="cart-layout">
        {/* Items column */}
        <div className="cart-items-col">
          <div className="cart-col-header">
            <h1 className="cart-title">Your Bag</h1>
            <span className="cart-count">
              {totalItems} item{totalItems !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="cart-item-list">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div
                  className="cart-item-thumbnail"
                  style={{ background: item.product.bgColor }}
                />

                <div className="cart-item-details">
                  <p className="cart-item-name">{item.product.name}</p>
                  <p className="cart-item-meta">
                    {item.color.name} · Size {item.size}
                  </p>
                  <p className="cart-item-price">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="cart-item-controls">
                    <div className="quantity-stepper">
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        type="button"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        type="button"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(index)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary column */}
        <div className="order-summary">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-lines">
            <div className="summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>

          <div className="summary-divider" />

          <div className="summary-line summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {shipping > 0 && (
            <p className="shipping-note">
              Add ${(150 - subtotal).toFixed(2)} more for free shipping.
            </p>
          )}

          <button className="primary-button" type="button">
            Proceed to Checkout
          </button>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate('dashboard')}
            type="button"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

