import Server from './class/server';
import connection from './bin/conectionMySql';
import mongoose from 'mongoose';
import bodyPaser from 'body-parser';
import userSQLRoutes from './routes/userSQL';
import fileUpload from 'express-fileupload'
import fs from 'fs';
import path from 'path';
import FileSystem from './class/file-system';
import propietariosRoutes from './routes/propietarios';
import propiedadesRoutes from './routes/propiedades';
import inquilinosRoutes from './routes/inquilinos';
import mantenimientoRoutes from './routes/mantenimiento';
import admDeptosRoutes from './routes/admDeptos'
import cors from 'cors';

//Creando servidor web
const server = new Server();

server.start(()=>{
    console.log(`Servidor corriendo en puerto ${server.puerto} y en host ${server.host}`);
});



// body parser
server.app.use(bodyPaser.urlencoded({extended:true}));
server.app.use(bodyPaser.json());
server.app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
    })
//upload
const crearFolder = new FileSystem();
crearFolder.createCarpetaUploads();
server.app.use(fileUpload());



server.app.use(cors());

//Rutas aplicacion

server.app.use('/userSQL', userSQLRoutes);
server.app.use('/propietarios', propietariosRoutes);
server.app.use('/propiedades', propiedadesRoutes);
server.app.use('/inquilinos', inquilinosRoutes);
server.app.use('/mantenimiento', mantenimientoRoutes);
server.app.use('/admDepos', admDeptosRoutes);





//Conexión dataBase MySQL
connection.connect((error)=>{
    if(error){
        throw error
    }
    else{
        console.log("Aplicacion conectada a base de datos MySql")
    }
})

