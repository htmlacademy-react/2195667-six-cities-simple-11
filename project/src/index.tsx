import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

enum Data {
  OfferCount = 312
}

root.render(
  <React.StrictMode>
    <App offerCount={Data.OfferCount} />
  </React.StrictMode>
);
