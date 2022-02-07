import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {
  // State del error de validación
  const [error, guardarError] = useState(false);

  // Extraer ciudad y país
  const { ciudad, pais } = busqueda;

  // Obtiene los datos del formulario y los guarda en el state
  const handleChange = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // Envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (ciudad.trim() === '' || pais.trim() === '') {
      guardarError(true);
      return;
    }

    // Quitamos error por si lo hubo anteriormente
    guardarError(false);

    // Realizar consulta a la API
    guardarConsultar(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Ambos los campos son obligatorios" /> : null}

      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>

      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">-- Seleccione un país --</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País: </label>
      </div>

      <div className="input-field col s12">
        <input
          type="submit"
          value="Buscar Clima"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 black-text"
        />
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsultar: PropTypes.func.isRequired,
};

export default Formulario;
