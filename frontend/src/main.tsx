import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Imports your Tailwind CSS and global styles

// Mounts the React application to the div with id="root" in your index.html
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);