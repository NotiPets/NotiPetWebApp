import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./normalize.css";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";

import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
