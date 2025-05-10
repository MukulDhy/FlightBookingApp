import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { CountdownProvider } from "./providers/CountdownContext.jsx";

import App from "./App.jsx";
import { store } from "./redux/store/store";
import "./index.css"; // Importing your global CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CountdownProvider>
          <Toaster />
          <App />
        </CountdownProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
