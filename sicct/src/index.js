import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * @file index.js
 * @brief アプリケーションのエントリーポイント
 * @details Reactアプリケーションのルートコンポーネントをレンダリングします。
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <body>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </body>
);

reportWebVitals();