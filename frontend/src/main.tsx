import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryProvider } from './providers';
import { AppRouter } from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  </React.StrictMode>,
);
