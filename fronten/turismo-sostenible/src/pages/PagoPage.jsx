import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2 } from "lucide-react";

const PagoPage = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    personas: 1,
    total: 0,
  });
  const [pagado, setPagado] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const calcularTotal = () => {
    const precioPorPersona = 250; // Ejemplo
    setForm((prev) => ({
      ...prev,
      total: prev.personas * precioPorPersona,
    }));
  };

  const handlePago = (e) => {
    e.preventDefault();
    setPagado(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full"
      >
        <div className="flex items-center justify-center mb-6">
          <CreditCard className="w-8 h-8 text-amber-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-700">
            Pago del Paquete Turístico
          </h1>
        </div>

        {!pagado ? (
          <form onSubmit={handlePago} className="space-y-5">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <input
              type="number"
              name="personas"
              placeholder="Cantidad de personas"
              min="1"
              value={form.personas}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-400 outline-none"
            />

            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-600">
                Total:{" "}
                <span className="text-amber-600 font-bold">
                  S/. {form.total.toFixed(2)}
                </span>
              </p>
              <button
                type="button"
                onClick={calcularTotal}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
              >
                Calcular
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold"
            >
              Pagar con PayPal (Simulado)
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle2 className="text-green-500 w-16 h-16 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-700">
              ¡Pago realizado con éxito!
            </h2>
            <p className="text-gray-600">
              Gracias por tu compra, {form.nombre}.  
              Te enviaremos la confirmación a <b>{form.email}</b>.
            </p>
            <a
              href="/home"
              className="inline-block mt-4 bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600 transition"
            >
              Volver al inicio
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PagoPage;
