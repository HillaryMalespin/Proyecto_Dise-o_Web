import React, { useState } from "react";
import MovementItem from "./MovementItem";
import "../styles/movements.css";

const MovementList = ({ movements }) => {
  const [filterType, setFilterType] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = movements.filter((m) => {
    const matchType = filterType === "ALL" || m.type === filterType;
    const matchSearch = m.description.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  if (movements.length === 0) {
    return (
      <p className="state-msg empty" aria-label="No hay movimientos para esta tarjeta">
        No hay movimientos para esta tarjeta
      </p>
    );
  }

  return (
    <div aria-label="Listado de movimientos con filtros">
      {/* Filtros */}
      <div className="filters" aria-label="Filtros de movimientos">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          aria-label="Filtrar por tipo de movimiento"
        >
          <option value="ALL">Todos</option>
          <option value="COMPRA">Compras</option>
          <option value="PAGO">Pagos</option>
        </select>
        <input
          type="text"
          placeholder="Buscar por descripción"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar movimiento por descripción"
          inputMode="search"
        />
      </div>

      {/* Lista */}
      <ul className="movement-list" aria-label="Resultados de movimientos">
        {filtered.length === 0 ? (
          <p className="state-msg empty" aria-label="No se encontraron resultados">
            No se encontraron resultados
          </p>
        ) : (
          filtered.map((m) => <MovementItem key={m.id} movement={m} />)
        )}
      </ul>
    </div>
  );
};

export default MovementList;
