import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './services/store'
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from 'react';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
