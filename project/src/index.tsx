import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { offerList } from './mocks/offers';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

enum Data {
  OfferCount = 312
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offerCount={Data.OfferCount} offers={offerList} />
    </Provider>
  </React.StrictMode>
);
