import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FilterContextProvider } from './contexts/FilterContext';
import { SelectedCardContextProvider } from 'contexts/SelectedCardContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <FilterContextProvider>
      <SelectedCardContextProvider>
        <App />
      </SelectedCardContextProvider>
    </FilterContextProvider>
  </React.StrictMode>
);
