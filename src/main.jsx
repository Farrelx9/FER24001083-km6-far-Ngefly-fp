import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { Provider } from "react-redux";
// import { persistor, store } from "./store.js";
// import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> */}
    <GoogleOAuthProvider clientId="1081791063758-5naudf545u7p4ecav9o9tnr6sl94s9jp.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    {/* </PersistGate>
    </Provider> */}
  </React.StrictMode>
);
