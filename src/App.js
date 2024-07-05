import React, { useState } from 'react';
import './App.css';

function App() {
  const [direccion, setDireccion] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleInputChange = (e) => {
    setDireccion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (direccion) {
      try {
        const response = await fetch(`http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccion}`);
        const data = await response.json();
        setResultados(data.direccionesNormalizadas || []);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Normalizador de Direcciones</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={direccion}
          onChange={handleInputChange}
          placeholder="Ingrese una dirección"
        />
        <button type="submit">Buscar</button>
      </form>
      <div>
        <h2>Resultados</h2>
        {resultados.length > 0 ? (
          <ul>
            {resultados.map((resultado, index) => (
              <li key={index}>
                <strong>{resultado.nombre_calle}</strong>: {resultado.direccion}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}

export default App;
