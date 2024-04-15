const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; // Cambia esta URI según la configuración de tu base de datos
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado a la base de datos');
    return client.db('nombre_basedatos'); // Cambia 'nombre_basedatos' por el nombre de tu base de datos
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };

const { connectToDatabase } = require('./database'); // Importa la función connectToDatabase

app.post('/docentes', async (req, res) => {
  const nuevoDocente = req.body;
  const db = await connectToDatabase();
  const docentesCollection = db.collection('docentes');
  await docentesCollection.insertOne(nuevoDocente);
  res.status(201).send('Docente agregado correctamente');
});





// Middleware para permitir el uso de JSON en las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JavaScript)
app.use(express.static('public'));

// Ruta para manejar la solicitud POST para agregar un docente
app.post('/docentes', (req, res) => {
  const nuevoDocente = req.body; // El cuerpo de la solicitud contiene los datos del docente
  // Aquí deberías agregar el nuevo docente a la lista de docentes
  // Ejemplo: docentes.push(nuevoDocente);
  res.status(201).send('Docente agregado correctamente');
});

// Ruta para manejar la solicitud PUT para actualizar un docente
app.put('/docentes/:id', (req, res) => {
  const id = req.params.id;
  const nuevoDocente = req.body;
  // Aquí deberías actualizar el docente con el ID proporcionado
  // Ejemplo: docentes[id] = nuevoDocente;
  res.send('Docente actualizado correctamente');
});

// Ruta para manejar la solicitud DELETE para eliminar un docente
app.delete('/docentes/:id', (req, res) => {
  const id = req.params.id;
  // Aquí deberías eliminar el docente con el ID proporcionado
  // Ejemplo: docentes.splice(id, 1);
  res.send('Docente eliminado correctamente');
});

// Escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor web escuchando en el puerto ${PORT}`);
});