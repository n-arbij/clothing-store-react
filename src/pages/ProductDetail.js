import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import Navbar from '../components/Navbar';

const ACCORDION_CONTENT = {
  availability: 'Use our store locator to check if this item is available for in-store viewing or same-day pick-up near you.',
  fit: "Model is 5'10\" and wearing size S. This style runs true to size — we recommend sizing down if you are between sizes.",
  fabrication: 'Dry clean only. Do not bleach, tumble dry, or iron on high heat. Store folded to preserve the fabric\'s natural drape.',
  shipping: 'Free standard shipping on orders over $150. Express delivery available at checkout. Free returns within 30 days of purchase.',
};

function ProductDetail({ productId, navigate, session, onLogout }) {
  const product = products.find((p) => p.id === productId) ?? products[0];
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAddToBag = () => {
    if (!selectedSize) return;
    addToCart(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  const accordionItems = [
    { key: 'availability', label: 'Check In-Store Availability' },
    { key: 'fit', label: 'Fit Details' },
    { key: 'fabrication', label: 'Fabrication & Care' },
    { key: 'shipping', label: 'Shipping & Returns' },
  ];

  return (
    <div className="page">
      <Navbar navigate={navigate} session={session} onLogout={onLogout} />

      <div className="product-detail">
        {/* Left — image */}
        <div className="product-detail-left">
          <div
            className="product-detail-image-area"
            style={{ background: product.bgColor }}
          >
            <span
              className="product-detail-image-label"
              style={{ color: product.textColor }}
            >
              {product.name}
            </span>
          </div>
        </div>

        {/* Right — info */}
        <div className="product-detail-right">
          <p className="breadcrumb">
            <button
              className="breadcrumb-link"
              onClick={() => navigate('dashboard')}
              type="button"
            >
              Shop
            </button>
            {' / '}
            {product.category}
          </p>

          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">${product.price}</p>
          <p className="product-detail-desc">{product.description}</p>

          {/* Color */}
          <div className="product-option-group">
            <p className="product-option-label">
              Product Color: <strong>{selectedColor.name}</strong>
            </p>
            <div className="color-swatches">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`color-swatch${selectedColor.name === color.name ? ' selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  style={{ background: color.hex }}
                  type="button"
                  aria-label={color.name}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="product-option-group">
            <div className="product-size-header">
              <p className="product-option-label">Product Size:</p>
              <button className="size-chart-link" type="button">
                Size Chart
              </button>
            </div>
            <div className="size-pills">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-pill${selectedSize === size ? ' selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {!selectedSize && (
            <p className="size-hint">Please select a size to continue.</p>
          )}

          <button
            className={`primary-button add-to-bag-btn${added ? ' added' : ''}`}
            onClick={handleAddToBag}
            disabled={!selectedSize}
            type="button"
          >
            {added ? '✓  Added to Bag' : 'Add to Bag'}
          </button>

          {/* Accordion */}
          <div className="accordion">
            {accordionItems.map(({ key, label }) => (
              <div key={key} className="accordion-item">
                <button
                  className="accordion-trigger"
                  onClick={() => toggleAccordion(key)}
                  type="button"
                  aria-expanded={openAccordion === key}
                >
                  <span>{label}</span>
                  <svg
                    className={`accordion-chevron${openAccordion === key ? ' open' : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openAccordion === key && (
                  <div className="accordion-body">
                    <p>{ACCORDION_CONTENT[key]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

