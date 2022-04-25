// ABaez: 11/04/2022: Se declaran variables de y se descargan sus librerias
const express = require('express')
const mongoose = require('mongoose');
const { Db } = require('mongodb')
const Schema = mongoose.Schema;
const database = require('./src/config/database.config');
const usersRouter = require('./src/routes/users.router')
const bodyParser = require('body-parser');

const cors = require('cors');
const passport = require('passport');
const app = express()
const port = 3000


//ABaez: 11/04/2022: Se realiza la conexión a mongo via mongoose 
mongoose.connect(database.database, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {//ABaez: 11/04/2022: Se realiza la coneccion a BD
    console.log('Connected to Database', database.database);//ABaez: 11/04/2022: Muestra mensaje en consola "Conexion de bade de datos"
});
mongoose.connection.on('error', (err) => {//ABaez: 11/04/2022: En caso de no realizar conexión a BD 
    console.log('Connecting to Database ERROR', err);//ABaez: 11/04/2022: Manda mensaje de error desde consola 
});

//ABaez: 11/04/2022: Se agreagan Middlewares
app.use(cors()); //ABaez: 11/04/2022: Activa credenciales
app.use(bodyParser.json());//ABaez: 11/04/2022: Extrae informacion de la API 
app.use(passport.initialize());//ABaez: 11/04/2022: Se usa la funcion express y se inicializa el maddleware para utilizar "passport.session" 
app.use(passport.session());//ABaez: 11/04/2022: Se usa la funcion express e inicia la sesión del usuario
require('./src/config/passport.config')(passport);//ABaez: 11/04/2022: Se asigna la ruta donde se encuentra nuestro archivo


//Routes
app.use('/api/users', usersRouter);


app.listen(port, () => { //ABaez: 11/04/2022: Se usa la funcion exprees 
    console.log(`Run on port http://localhost:${port}`)//ABaez: 11/04/2022: Muestra mensaje que indica conexion al puerto
})