import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import EstateProvider from "./context/EstateProvider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <EstateProvider>
      <App />
    </EstateProvider>
  </BrowserRouter>
);
