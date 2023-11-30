import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {BrowserRouter} from 'react-router-dom';
import {films} from './mocks/films';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App films={films}/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
