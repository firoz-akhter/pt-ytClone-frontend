import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import  { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./utils/reduxPersistConfig.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
  </PersistGate>
  </Provider>
);
