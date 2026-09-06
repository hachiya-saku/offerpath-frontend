import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./i18n/LanguageContext.tsx";
import { AuthBootstrap } from "./components/AuthBootstrap.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthBootstrap>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AuthBootstrap>
    </Provider>
  </StrictMode>,
);
