import React, { FC, createContext, useState } from 'react';
import { IAPIData } from '../interfaces/Api';

interface IComparisonContext {
  products: IAPIData[];
  addProduct: (product: IAPIData) => void;
  removeProduct: (product: IAPIData) => void;
}

export const ComparisonContext = createContext<IComparisonContext>({
  products: [],
  addProduct: (product: IAPIData) => {},
  removeProduct: (product: IAPIData) => {},
});

export const ComparisonProvider: FC = ({ children }: any) => {
  const [products, setProducts] = useState<IAPIData[]>([]);

  const addProduct = (product: IAPIData) => {
    if (products.length < 4) {
      setProducts([...products, product]);
    } else {
      console.log('Cannot add more than 4 products');
      alert('You can only add up to 4 products for comparison');
    }
  };

  const removeProduct = (product: IAPIData) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== product.id));
  };

  return (
    <ComparisonContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ComparisonContext.Provider>
  );
};
