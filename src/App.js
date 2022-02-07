import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

const App = function () {
  // State con información de la búsqueda
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  const { ciudad, pais } = busqueda;

  // State que controla cuándo hacer la consulta a la API
  const [consultar, guardarConsultar] = useState(false);

  // State del resultado de la consulta a la API
  const [resultado, guardarResultado] = useState({});

  // State error en la consulta a la API
  const [error, guardarError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = '8f8acf04c62a5e90ba1e3b6559cd3baf';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        // Detecta si hubo resultados correctos en la consulta
        if (resultado.cod === '404') {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
