import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Redux Provider to give access to store
import { store } from './features/tasks/store'; // Redux store

// Create the root element and render the React app inside it
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Make Redux store available to all components in the app */}
      <App />       {/* Wraps the <App /> component in Redux <Provider> to allow state access. */}
    </Provider>
  </React.StrictMode>
);



