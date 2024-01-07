import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';
import {ToastContainer} from 'react-toastify';
import Spinner from './components/spinner/spinner.tsx';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Spinner/>
        <App/>
        <ToastContainer/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
