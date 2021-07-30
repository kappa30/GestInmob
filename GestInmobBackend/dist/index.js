"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const conectionMySql_1 = __importDefault(require("./bin/conectionMySql"));
const body_parser_1 = __importDefault(require("body-parser"));
const userSQL_1 = __importDefault(require("./routes/userSQL"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const file_system_1 = __importDefault(require("./class/file-system"));
const propietarios_1 = __importDefault(require("./routes/propietarios"));
const propiedades_1 = __importDefault(require("./routes/propiedades"));
const inquilinos_1 = __importDefault(require("./routes/inquilinos"));
const mantenimiento_1 = __importDefault(require("./routes/mantenimiento"));
const admDeptos_1 = __importDefault(require("./routes/admDeptos"));
const cors_1 = __importDefault(require("cors"));
//Creando servidor web
const server = new server_1.default();
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.puerto} y en host ${server.host}`);
});
// body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use((req, res, next) => {
    // Dominio que tengan acceso (ej. 'http://example.com')
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Metodos de solicitud que deseas permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
//upload
const crearFolder = new file_system_1.default();
crearFolder.createCarpetaUploads();
server.app.use(express_fileupload_1.default());
server.app.use(cors_1.default());
//Rutas aplicacion
server.app.use('/userSQL', userSQL_1.default);
server.app.use('/propietarios', propietarios_1.default);
server.app.use('/propiedades', propiedades_1.default);
server.app.use('/inquilinos', inquilinos_1.default);
server.app.use('/mantenimiento', mantenimiento_1.default);
server.app.use('/admDepos', admDeptos_1.default);
//Conexión dataBase MySQL
conectionMySql_1.default.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("Aplicacion conectada a base de datos MySql");
    }
});
