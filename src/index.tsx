import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {BrowserRouter} from 'react-router-dom';
import {films} from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App films={films}/>
    </BrowserRouter>
  </React.StrictMode>
);
