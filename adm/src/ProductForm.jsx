import React, { useState } from 'react';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        size: 'please',
        color: '',
        material: '',
        brand_name: '',
        category_id: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        // Validate input
        if (!product.name) {
            setError('Product name is required.');
            setIsSubmitting(false);
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        Object.keys(product).forEach((key) => {
            formData.append(key, product[key]);
        });

        console.log('Form Data being submitted:', Array.from(formData.entries()));

        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess('Product submitted successfully!');
                console.log('Product submitted:', data);

                // Reset form fields
                setProduct({
                    name: '',
                    description: '',
                    price: '',
                    stock_quantity: '',
                    size: 'please',
                    color: '',
                    material: '',
                    brand_name: '',
                    category_id: '',
                });
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.message || 'Failed to submit the product.'}`);
            }
        } catch (error) {
            setError('An error occurred while submitting the form.');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


  return (
    <div className="form-container">
      <h2 className="form-title">Upload Product</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Enter product name"
          required
        />
        
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Enter product description"
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          placeholder="Enter price"
        />
        
        <label>Stock Quantity</label>
        <input
          type="number"
          name="stock_quantity"
          value={product.stock_quantity}
          onChange={handleInputChange}
          placeholder="Enter stock quantity"
        />

        <label>Size:</label>
        <select name="size" value={product.size} onChange={handleInputChange}>
          <option value="please">---please enter a size---</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
        
        <label>Color</label>
        <input
          type="text"
          name="color"
          value={product.color}
          onChange={handleInputChange}
          placeholder="Enter color"
        />

        <label>Material</label>
        <input
          type="text"
          name="material"
          value={product.material}
          onChange={handleInputChange}
          placeholder="Enter material"
        />

        <label>Brand Name</label>
        <input
          type="text"
          name="brand_name"
          value={product.brand_name}
          onChange={handleInputChange}
          placeholder="Enter brand name"
        />

        <label>Category ID</label>
        <input
          type="text"
          name="category_id"
          value={product.category_id}
          onChange={handleInputChange}
          placeholder="Enter category id"
        />

        <div className="button-container">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
