const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola desde tu Web Service en Render!');
});

// Endpoint con JSON array personalizado
app.get('/users', (req, res) => {
    const usuarios = [
      {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan@example.com'
      },
      {
        id: 2,
        nombre: 'María Gómez',
        email: 'maria@example.com'
      }
    ];
  
    res.json(usuarios); // Esta línea responde con el JSON array
  });

// Empieza el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
