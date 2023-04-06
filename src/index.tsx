import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FilterContextProvider } from './contexts/FilterContext';
import { SelectedCardContextProvider } from './contexts/SelectedCardContext';
import { ComparisonProvider } from './contexts/ComparisonContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <FilterContextProvider>
        <SelectedCardContextProvider>
          {/* @ts-ignore */}
          <ComparisonProvider>
            <App />
          </ComparisonProvider>
        </SelectedCardContextProvider>
      </FilterContextProvider>
    </Router>
  </React.StrictMode>
);
