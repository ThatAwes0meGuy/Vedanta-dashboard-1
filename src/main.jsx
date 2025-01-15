import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router';
import { Auth0Provider } from '@auth0/auth0-react';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
      domain="dev-zcsldasfxecrq2gr.us.auth0.com"
      clientId="mzDpwyMQZvcbZCo8I0Edemv0TtxGfe6F"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      >
      <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
