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
    const resultado = await pool.query(process.env.SELECT01);
    res.json(resultado.rows);
    pool.end;
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.get("/authlogin/:user/:pass", async (req, res) => {
  const user = req.params.user;
  const pass = req.params.pass;
  try {
    const resultado = await pool.query(`${process.env.SELECT03}($1, $2);`, [
      user,
      pass,
    ]);

    if (resultado.rows.length == 0) {
      res.status(204).json({ error: "Error usuario no encontrado" });
    } else {
      res.json(resultado.rows[0]);
    }
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }

  // pool.end();
});

// Empieza el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
