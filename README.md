# BancoOrbital — Proyecto IC8057
## Hillary Malespín
## Andrew Lopez

Documentación del proyecto web **BancoDigital** para la primera entrega del curso **IC8057**.  
Enfoque **mobile-first**, **accesibilidad (WCAG 2.1 / WAI-ARIA)**, sin librerías de UI preconstruidas, y con datos simulados desde **JSON**.

---

## Tabla de contenidos
- [Indicaciones](#indicaciones)
- [Características](#características)
- [Stack y requisitos](#stack-y-requisitos)
- [Rutas principales](#rutas-principales)
- [Datos mock (JSON)](#datos-mock-json)
- [Accesibilidad](#accesibilidad)
- [Guía de estilos](#guía-de-estilos)
- [Transferencias (flujo UI)](#transferencias-flujo-ui)
- [Buenas prácticas aplicadas](#buenas-prácticas-aplicadas)


---

# Indicaciones para iniciar sesión

Utilizar el siguiente usuario:

**Usuario**  
`usuario@ejemplo.com`

**Contraseña**  
`123456`

codigos de verificacion igual a la contraseña

---

## Características
- **Autenticación (mock)**: Login y Registro con validaciones mínimas en cliente.
- **Dashboard**: accesos a Cuentas, Tarjetas, Transferencias, Consulta de PIN y Configuración.
- **Cuentas**:
  - Grid/listado de cuentas (alias, IBAN, tipo, moneda, saldo).
  - Detalle con lista de movimientos y **filtros/búsqueda**.
- **Tarjetas**:
  - Grilla de tarjetas **Gold/Platinum/Black** con número **enmascarado**.
  - Detalle con movimientos, filtros (COMPRA/PAGO) y estados (cargando/vacío/error).
- **Transferencias**:
  - Entre **propias** y a **terceros (mismo banco)**.
  - Flujo: **Formulario → Confirmación → Comprobante** (descargable).
- **Accesibilidad**:
  - Etiquetas asociadas, `aria-label`, roles adecuados, foco visible.
  - Mensajes de estado `role="status"/"alert"`, semántica con `main/section/article`.
- **Arquitectura CSS**:
  - **Mobile-first**.
  - Ficheros: `base.css`, `layout.css`, `component.css`, `override.css` + páginas (`home.css`, `login.css`, `register.css`, `dashboard.css`, `accountDetail.css`, `cards.css`, `transferencias.css`, etc).

---

## Stack y requisitos
- **React 18+** con **React Router v6**.
- **Vite** (recomendado) o CRA.
- **Node 18+**, **npm** o **pnpm**.

---


---

## Rutas principales
- `/` — **Home**
- `/login` — **Login**
- `/register` — **Registro**
- `/dashboard` — **Dashboard**
- `/accounts` — **Listado de cuentas**
- `/accounts/:accountId` — **Detalle de cuenta**
- `/cards` — **Grilla/carrusel de tarjetas**
- `/card/:cardId` — **Detalle de tarjeta**
- `/transferencias` — **Flujo de transferencias**
- `/pin-consult` — **Consulta de PIN**

---

## Datos mock (JSON)

### `accounts.json`
```json
{
  "accounts": [
    {
      "account_id": "CR01-1234-5678-000000000001",
      "alias": "Ahorros Principal",
      "tipo": "Ahorro",
      "moneda": "CRC",
      "saldo": 1523400.50,
      "propietario": "customer_001"
    }
  ],
  "movimientos": [
    {
      "id": "mov001",
      "account_id": "CR01-1234-5678-000000000001",
      "fecha": "2025-01-12T10:30:00Z",
      "tipo": "DEBITO",
      "descripcion": "Pago servicios",
      "moneda": "CRC",
      "saldo": -45000.75
    }
  ]
}
```

### `cards.json`
```json
[
  {
    "id": "card001",
    "type": "Gold",
    "number": "1234567890123456",
    "expiry": "05/27",
    "holder": "JUAN PEREZ",
    "currency": "CRC",
    "limit": 2000000,
    "balance": 325000
  }
]
```

### `movements.json`
```json
[
  {
    "id": "mov001",
    "card_id": "card001",
    "date": "2025-09-20T10:30:00Z",
    "type": "COMPRA",
    "description": "Supermercado La Favorita",
    "currency": "CRC",
    "amount": -45000.75
  }
]
```

---

## Accesibilidad
- **Semántica**: `main`, `header`, `nav`, `section`, `article`, `ul/li`.
- **Etiquetas**: `label htmlFor + id` en inputs/selects/textarea.
- **Aria**:
  - `aria-label` en controles y secciones clave.
  - `role="status"` / `role="alert"` para mensajes.
  - `aria-live="polite"` en resúmenes dinámicos (p. ej., conteo de filtros).
  - `aria-haspopup="dialog"` / `aria-modal="true"` en modales (T&C, PinQuery).
- **Foco visible**: estilos `:focus-visible` en inputs/botones/enlaces.
- **Contraste**: paleta cuidada para **AA**.


---

## Guía de estilos
- **Mobile-first**: layouts en 1 columna; escalan a 2/3 columnas con `@media (min-width: 768px)` y `1024px`.
- **Arquitectura CSS**:
  - `base.css`: reset/tokens (colores, tipografía, espaciados).
  - `layout.css`: contenedores, grids.
  - `component.css`: patrones reutilizables (cards, inputs, botones).
  - `override.css`: helpers globales y ajustes de foco.
  - **Páginas**: estilos específicos de vista.
- **Botones**:
  - `.btn`, `.btn-primary`, `.btn-link`, y variantes locales por módulo:
    - Transferencias: `.btn-transfer`, `.btn-back-transfer`.
- **Tarjetas (UI)**:
  - Gradientes metálicos (Gold/Platinum/Black) y animación `@keyframes shine`.
  - Enmascarado: `1234 **** **** 1234`.

---

## Transferencias (flujo UI)
1. **Formulario** (propias/terceros):
   - Origen (select solo cuentas del usuario).
   - Destino (select si propias ≠ origen; input si terceros).
   - Moneda (auto o seleccionada).
   - Monto (numérico, `step="0.01"`).
   - Descripción (opcional).
   - **Continuar** (deshabilitado hasta validaciones mínimas).
2. **Confirmación**:
   - Resumen (origen, destino, monto, moneda, descripción, fecha/hora).
3. **Comprobante**:
   - Resultado (éxito/error) con opción **descargar/compartir**.

---

## Buenas prácticas aplicadas
- Arquitectura **mobile-first** y componentes reutilizables.
- **Sin librerías de UI** (Material/Bootstrap, etc.).
- **JSON** como fuente de datos para la primera entrega.
- Separación de lógica (ej.: `useRegisterForm`).
- Enrutamiento claro y navegación con botones “Volver”.
- Nombres de clases consistentes para evitar colisiones entre módulos.

---
