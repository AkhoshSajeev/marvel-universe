import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ExperienceProvider } from "./hooks/useExperience";
import "./styles.css";
import "./cinema.css";
import "./dossier.css";
import "./explorer.css";
import "./interactive.css";
import "./polish.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExperienceProvider>
      <App />
    </ExperienceProvider>
  </StrictMode>,
);
