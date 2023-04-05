import React, { FC, createContext, useState } from 'react';
import { Listing } from '../interfaces/Api';

interface IComparisonContext {
  products: Listing[];
  addProduct: (product: Listing) => void;
  removeProduct: (product: Listing) => void;
}

export const ComparisonContext = createContext<IComparisonContext>({
  products: [],
  addProduct: (product: Listing) => {},
  removeProduct: (product: Listing) => {},
});

export const ComparisonProvider: FC = ({ children }: any) => {
  const [products, setProducts] = useState<Listing[]>([]);

  const addProduct = (product: Listing) => {
    if (products.length < 4) {
      setProducts([...products, product]);
    } else {
      console.log('Cannot add more than 4 products');
      alert('You can only add up to 4 products for comparison');
    }
  };

  const removeProduct = (product: Listing) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.ID !== product.ID));
  };

  return (
    <ComparisonContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ComparisonContext.Provider>
  );
};
