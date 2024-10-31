import React, { useState, useEffect } from 'react';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        if (!data.success || !Array.isArray(data.productList)) {
          throw new Error("Unexpected data format");
        }

        setProducts(data.productList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Remove the deleted product from the state
      setProducts((prevProducts) => prevProducts.filter(product => product.product_id !== productId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid-container">
      <h2 className="grid-title">Products Grid</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} className="product-card">
              <div className="product-image-placeholder">
                {/* Display product image if available */}
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div>No image available</div>
                )}
              </div>
              <h3>{product.name}</h3>
              <h3>${product.price}</h3>
              <h3>Brand: {product.brand_name}</h3>
              <button>Edit</button>
              <button onClick={() => handleDelete(product.product_id)}>Delete</button>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
