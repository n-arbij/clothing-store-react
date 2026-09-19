import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import Navbar from '../components/Navbar';

function Dashboard({ navigate, session, onLogout }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (product, event) => {
    event.stopPropagation();
    addToCart(product, product.colors[0], 'M');
  };

  return (
    <div className="page">
      <Navbar navigate={navigate} session={session} onLogout={onLogout} />

      <div className="dashboard">
        <div className="dashboard-hero">
          <p className="eyebrow">New season</p>
          <h1 className="dashboard-title">The Edit</h1>
          <p className="dashboard-subtitle">
            Thoughtfully sourced pieces for a considered wardrobe.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article
              key={product.id}
              className="product-card"
              onClick={() => navigate('product', { productId: product.id })}
            >
              <div
                className="product-image"
                style={{ background: product.bgColor }}
              >
                <span
                  className="product-image-label"
                  style={{ color: product.textColor }}
                >
                  {product.name}
                </span>
                <button
                  className="quick-add-btn"
                  onClick={(e) => handleQuickAdd(product, e)}
                  type="button"
                  aria-label={`Quick add ${product.name} to bag`}
                >
                  +
                </button>
              </div>

              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">${product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

