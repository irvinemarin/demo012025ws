const pool = require("./database/db.js"); // importa la conexión
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Hola desde tu Web Service en Render!");
});

// Endpoint con JSON array personalizado
app.get("/users", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT androidemosecurity.usersdemo ORDER  ASC "
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Empieza el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
