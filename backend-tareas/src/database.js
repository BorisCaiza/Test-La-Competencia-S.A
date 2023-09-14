const mongoose = require('mongoose');
//variable de entorno
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
//const dbCconfig = require("./config/config");

//const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = dbCconfig

//const URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`

const URL = "mongodb://127.0.0.1:27017/laCompetencia"


//mongodb://viradmin:hetvir123@135.181.205.61:27017/scandere?authSource=admin`


//mongodb://viradmin:hetvir123@135.181.205.61:27017/scandere?authSource=admin`

//Conectarse a la base de datos
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Successfully connected to the database");
        // await initial(); // Llama a la función inicial después de la conexión exitosa
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit(1); // Sale del proceso si hay un error de conexión
    });


module.exports = mongoose;


