import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { persistor, store } from "./store";
import {Toaster} from "sonner"
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster richColors position="top-right"/>
      </PersistGate>
    </Provider>
  </StrictMode>
);