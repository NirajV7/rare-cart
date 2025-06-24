import React from 'react';
import ProductCatalog from './components/ProductCatalog';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
    
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">RareCart</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <ProductCatalog />
      </main>
    </div>
  );
}

export default App;
