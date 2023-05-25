import ReactDOM from 'react-dom/client';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import logger from "redux-logger";

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);