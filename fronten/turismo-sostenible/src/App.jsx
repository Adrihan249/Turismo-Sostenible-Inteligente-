import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "../../turismo-sostenible/src/components/Navbar";
import Footer from "../../turismo-sostenible/src/components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaquetesPage from "./pages/PaquetesPage";
import DetallePaquetePage from "./pages/DetallePaquetePage";
import PagoPage from "./pages/PagoPage";
import AdminPage from "./pages/AdminPage";
import QuienesSomosPage from "./pages/QuienesSomosPage";
import ContactoPage from "./pages/ContactoPage";

const App = () => {
  return (
     <AuthProvider>
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/paquetes" element={<PaquetesPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/quienes-somos" element={<QuienesSomosPage />} />
          <Route path="/paquete/:id" element={<DetallePaquetePage />} />
          <Route path="/pago" element={<PagoPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </AuthProvider>
  );
};

export default App;
