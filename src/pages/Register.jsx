import React from "react";

// Importar estilos globales y específicos
//import "../styles/base.css";
//import "../styles/layout.css";
//import "../styles/component.css";
import "../styles/override.css";
import "../styles/register.css";
import useRegisterForm from "../utils/register"; // Importamos la lógica separada

const Register = () => {
  const {
    formData,
    errors,
    showModal,
    handleChange,
    handleSubmit,
    setShowModal,
  } = useRegisterForm();

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Crear Cuenta</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          {/* Fila 1 */}
          <div className="form-group">
            <label>Tipo de Identificación</label>
            <select
              name="tipoIdentificacion"
              value={formData.tipoIdentificacion}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="Nacional">Nacional</option>
              <option value="DIMEX">DIMEX</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
            {errors.tipoIdentificacion && <p className="error">{errors.tipoIdentificacion}</p>}
          </div>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="correo"
              placeholder="ejemplo@correo.com"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            {errors.correo && <p className="error">{errors.correo}</p>}
          </div>
          {/* Fila 2 */}
          <div className="form-group">
            <label>Número de Identificación</label>
            <input
              type="text"
              name="numeroIdentificacion"
              placeholder="Ej: 1-2345-6789"
              value={formData.numeroIdentificacion}
              onChange={handleChange}
              required
            />
            {errors.numeroIdentificacion && <p className="error">{errors.numeroIdentificacion}</p>}
          </div>
          <div className="form-group">
            <label>Teléfono (opcional)</label>
            <input
              type="tel"
              name="telefono"
              placeholder="+506 1234-5678"
              value={formData.telefono}
              onChange={handleChange}
            />
            {errors.telefono && <p className="error">{errors.telefono}</p>}
          </div>
          {/* Fila 3 */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Tu usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {/* Fila 4 */}
          <div className="form-group">
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombreCompleto"
              placeholder="Nombre y apellidos"
              value={formData.nombreCompleto}
              onChange={handleChange}
              required
            />
            {errors.nombreCompleto && <p className="error">{errors.nombreCompleto}</p>}
          </div>
          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
          {/* Fila 5 */}
          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
            {errors.fechaNacimiento && <p className="error">{errors.fechaNacimiento}</p>}
          </div>
          {/* Términos y condiciones alineados con la última fila derecha */}
          <div className="terms-container" style={{ alignSelf: "end" }}>
            <input
              type="checkbox"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
            />
            <span>
              Acepto los{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => setShowModal(true)}
              >
                Términos y Condiciones
              </button>
            </span>
            {errors.aceptaTerminos && <p className="error">{errors.aceptaTerminos}</p>}
          </div>
          {/* Botón ocupa las dos columnas */}
          <button className="btn btn-primary full-width" type="submit">
            Registrarse
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Términos y Condiciones</h3>
            <iframe src="/terminos.pdf" title="Términos" width="100%" height="400px"></iframe>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
