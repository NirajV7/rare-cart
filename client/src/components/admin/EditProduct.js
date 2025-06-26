import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetails, updateProduct } from '../../services/api';
import ProductForm from './ProductForm';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductDetails(id);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateProduct(id, formData);
      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (err) {
      setError('Update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
        <button 
          onClick={() => navigate('/admin/products')}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <ProductForm 
        initialData={{
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          imageUrl: product.imageUrl,
          category: product.category,
          dropTime: new Date(product.dropTime).toISOString().slice(0, 16)
        }}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
};

export default EditProduct;
