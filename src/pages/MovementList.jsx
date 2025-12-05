import React, { useState } from "react";
import MovementItem from "./MovementItem";
import "../styles/movements.css";

export default function MovementList({ movements }) {
  const [filterType, setFilterType] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = movements.filter((m) => {
    const type = (m.type ?? "").toUpperCase();
    const matchType = filterType === "ALL" || type === filterType;
    const matchSearch = (m.description ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchType && matchSearch;
  });

  if (!movements.length) {
    return <p className="state-msg">No hay movimientos para esta tarjeta</p>;
  }

  return (
    <div>
      {/* Filtros */}
      <div className="filters">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="ALL">Todos</option>
          <option value="COMPRA">Compras</option>
          <option value="PAGO">Pagos</option>
          <option value="MOVIMIENTO">Generales</option>
        </select>

        <input
          type="text"
          placeholder="Buscar descripción"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Lista */}
      <ul className="movement-list">
        {filtered.length === 0 ? (
          <p className="state-msg">No se encontraron resultados</p>
        ) : (
          filtered.map((m) => <MovementItem key={m.id} movement={m} />)
        )}
      </ul>
    </div>
  );
}
