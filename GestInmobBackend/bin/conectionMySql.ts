import mysql from 'mysql';
import variables_entorno from '../config';

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: variables_entorno.DB_MYSQL,
    port: 3306
})

export default connection;
