import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import Header from './components/header/header';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

enum Data {
  OfferCount = 312
}

root.render(
  <React.StrictMode>
    <Header />
    <App offerCount={Data.OfferCount} />
  </React.StrictMode>
);
