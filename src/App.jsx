import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/status')
      .then((res) => {
        if (!res.ok) throw new Error('Error en la red');
        return res.json();
      })
      .then((json) => {
        setData(json.message);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Dashboard Principal</h1>
      
      {loading && <p id="loading-indicator">⏳ Conectando con el servidor backend...</p>}
      
      {error && <p id="error-message" style={{ color: 'red' }}>Error: {error}</p>}
      
      {data && (
        <div id="success-panel" style={{ padding: '20px', border: '2px solid #28a745', borderRadius: '8px' }}>
          <h2>Estado del Servidor:</h2>
          <p id="server-data">{data}</p>
        </div>
      )}
    </div>
  );
}

export default App;