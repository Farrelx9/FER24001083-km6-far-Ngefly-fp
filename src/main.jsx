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
    <GoogleOAuthProvider clientId="571250239152-m0ndddns03q2rr3gledb99nb90unmgue.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    {/* </PersistGate>
    </Provider> */}
  </React.StrictMode>
);
