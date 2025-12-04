import { apiRequest } from "../conection/api";

export async function registerUser(formData) {

  // 
  const partes = formData.nombreCompleto.trim().split(" ");

  const name = partes[0] ?? "";
  const lastnameone = partes[1] ?? "";
  const lastnametwo = partes[2] ?? "";

  // 
  const payload = {
    identification: formData.numeroIdentificacion,   // ✔
    username: formData.username,                    // ✔
    name,                                           // ✔
    lastnameone,                                    // ✔
    lastnametwo,                                    // ✔
    borndate: formData.fechaNacimiento,             // ✔
    email: formData.correo,                         // ✔
    phone: formData.telefono,                       // ✔
    password: formData.password,                    // ✔
    iduser: 1,                                      // 
    idtypeident:
      formData.tipoIdentificacion === "Nacional"
        ? 1
        : formData.tipoIdentificacion === "DIMEX"
        ? 2
        : 3                                        // ✔ Pasaporte
  };

  return await apiRequest(
    "POST",
    "/api/v1/users",
    payload
  );
}
