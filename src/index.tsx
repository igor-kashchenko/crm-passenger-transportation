import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { HashRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";

const Root: React.FC = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Root />);
