import { useState } from "react";

const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    identification: "",
    username: "",
    name: "",
    lastnameone: "",
    lastnametwo: "",
    borndate:  "",
    email: "",
    phone: "",
    password: "",
    iduser: 0,
    idtypeident: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.tipoIdentificacion) {
      newErrors.tipoIdentificacion = "Selecciona un tipo de identificación";
    }

    if (!formData.numeroIdentificacion) {
      newErrors.numeroIdentificacion = "Campo obligatorio";
    } else {
      if (
        formData.tipoIdentificacion === "Nacional" &&
        !/^\d{1}-\d{4}-\d{4}$/.test(formData.numeroIdentificacion)
      ) {
        newErrors.numeroIdentificacion = "Formato Nacional inválido (#-####-####)";
      }
      if (
        formData.tipoIdentificacion === "DIMEX" &&
        !/^\d{11,12}$/.test(formData.numeroIdentificacion)
      ) {
        newErrors.numeroIdentificacion = "DIMEX debe tener 11-12 dígitos";
      }
      if (
        formData.tipoIdentificacion === "Pasaporte" &&
        !/^[A-Z0-9]{6,12}$/.test(formData.numeroIdentificacion)
      ) {
        newErrors.numeroIdentificacion =
          "Pasaporte: 6-12 caracteres alfanuméricos en mayúscula";
      }
    }

    if (!/^[a-z0-9._-]{4,20}$/i.test(formData.username)) {
      newErrors.username = "El username debe tener 4-20 caracteres válidos";
    }

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = "Campo obligatorio";
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "Campo obligatorio";
    } else {
      const birthDate = new Date(formData.fechaNacimiento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (
        age < 18 ||
        (age === 18 &&
          today < new Date(birthDate.setFullYear(birthDate.getFullYear() + 18)))
      ) {
        newErrors.fechaNacimiento = "Debes ser mayor de 18 años";
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Correo inválido";
    }

    if (formData.telefono && !/^\+506\s\d{4}-\d{4}$/.test(formData.telefono)) {
      newErrors.telefono = "Formato: +506 ####-####";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
      newErrors.password =
        "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(" Registro exitoso!");
      // redirigir al login
    }
  };

  return {
    formData,
    errors,
    showModal,
    handleChange,
    handleSubmit,
    setShowModal,
  };
};

export default useRegisterForm;
