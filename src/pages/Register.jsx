import React from "react";
import "../styles/override.css";
import "../styles/register.css";
import useRegisterForm from "../utils/register";

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

        {errors.general && <p className="error">{errors.general}</p>}

        <form className="register-form" onSubmit={handleSubmit}>

          {/* ========== CAMPOS DEL FORMULARIO ========== */}

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
            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              placeholder="+506 1234-5678"
              value={formData.telefono}
              onChange={handleChange}
            />
            {errors.telefono && <p className="error">{errors.telefono}</p>}
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
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
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombreCompleto"
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
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

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

          {/* TÉRMINOS */}
          <div className="terms-container">
            <input
              type="checkbox"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
            />
            <span>
              Acepto los{" "}
              <button type="button" className="link-button" onClick={() => setShowModal(true)}>
                Términos y Condiciones
              </button>
            </span>
            {errors.aceptaTerminos && <p className="error">{errors.aceptaTerminos}</p>}
          </div>

          <button className="btn btn-primary full-width" type="submit">
            Registrarse
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Términos y Condiciones</h3>
            <iframe src="/terminos.pdf" width="100%" height="400px"></iframe>
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
