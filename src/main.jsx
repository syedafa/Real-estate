import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import EstateProvider from "./context/EstateProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <EstateProvider>
    <App />
  </EstateProvider>
);
