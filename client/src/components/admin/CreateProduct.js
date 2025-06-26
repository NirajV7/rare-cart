// CreateProduct.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/api';
import ProductForm from './ProductForm';

const CreateProduct = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    await createProduct(formData);
    navigate('/admin/products');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <ProductForm onSubmit={handleCreate} isEditing={false} />
    </div>
  );
};


export default CreateProduct;
