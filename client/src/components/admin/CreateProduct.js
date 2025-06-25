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

  return <ProductForm onSubmit={handleCreate} isEditing={false} />;
};

export default CreateProduct;
