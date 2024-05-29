import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Welcome from "./Pages/Welcome";
import Tecnicos from "./Pages/Tecnicos";
import Clientes from "./Pages/Clientes";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/tecnicos" element={<Tecnicos />} />
          <Route path="/clientes" element={<Clientes />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}
