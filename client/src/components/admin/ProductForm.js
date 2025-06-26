import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'flatpickr/dist/themes/material_blue.css';
import Flatpickr from 'react-flatpickr';

const ProductForm = ({ initialData, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    dropTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        dropTime: new Date(formData.dropTime).toISOString()
      };


      await onSubmit(productData);
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        {isEditing ? '✏️ Edit Product' : '🛍️ Create New Product'}
      </h2>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* NAME */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* PRICE */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-800 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            min="0.01"
            step="0.01"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* IMAGE URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-800 mb-1">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-800 mb-1">
            Category
          </label>
          <select
            name="category"
            id="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select a category</option>
            <option value="sneakers">Sneakers</option>
            <option value="art">Art</option>
            <option value="collectibles">Collectibles</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>

        {/* DROP TIME */}
        <div>
  <label htmlFor="dropTime" className="block text-sm font-medium text-gray-700 mb-1">
    Drop Time
  </label>
  <Flatpickr
    id="dropTime"
    data-enable-time
    options={{
      dateFormat: 'Y-m-d H:i',
      enableTime: true,
      time_24hr: true
    }}
    value={formData.dropTime}
    onChange={([date]) =>
      setFormData({ ...formData, dropTime: date.toISOString() })
    }
    className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
  />
</div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-5 py-2 font-semibold text-white rounded-md transition ${
              isSubmitting
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
              ? 'Update Product'
              : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};


export default ProductForm;
