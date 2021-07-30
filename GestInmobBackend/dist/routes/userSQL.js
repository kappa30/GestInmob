"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../class/token");
const authentication_1 = require("../middlewares/authentication");
const conectionMySql_1 = __importDefault(require("../bin/conectionMySql"));
const promesas_1 = __importDefault(require("../utils/promesas"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_1 = __importDefault(require("../class/email"));
const userSQLRoutes = express_1.Router();
userSQLRoutes.get('/pruebaSQL', (req, res) => {
    res.json({
        estado: "success",
        mensaje: "pruebaok"
    });
});
//Este funciona OK!!!!
userSQLRoutes.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            nombreUsuario: req.body.nombreUsuario,
            password: bcrypt_1.default.hashSync(req.body.password, 10),
            email: req.body.email,
            telefono: req.body.telefono,
            estado: req.body.estado,
        };
        //console.log(req)
        yield conectionMySql_1.default.query("start transaction");
        const insertUsuario = yield promesas_1.default("INSERT INTO USUARIOS(NOMBRE_USUARIO, PASSWORD, EMAIL_USUARIO, TELEFONO, ESTADO)VALUES(?,?,?,?,?)", [user.nombreUsuario, user.password, user.email, user.telefono, user.estado]);
        yield conectionMySql_1.default.query("commit");
        const usuarioInsertado = yield promesas_1.default("select * from usuarios where ID_USUARIO=?", [insertUsuario.insertId]);
        console.log(usuarioInsertado);
        res.json({ estado: "success",
            mensaje: usuarioInsertado
        });
        const emailEnvio = new email_1.default();
        const envio = yield emailEnvio.enviarEmail(user.email, "Alta usuario Gestion Inmobiliaria", "Tu usuario fue creado con exito con los siguientes datos: " + " usuario: " + user.nombreUsuario + " Contraseña: " + req.body.password);
        console.log(emailEnvio.enviarEmail);
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            mensaje: "No se pudo crear usuario",
            rollabck: rollback
        });
    }
}));
//GET para obtener usuario
userSQLRoutes.get('/listarOneUser', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            ID_USUARIO: req.query.ID_USUARIO
        };
        //console.log(req)
        const obtenerUsuario = yield promesas_1.default("select * from usuarios where ID_USUARIO=?", [user.ID_USUARIO]);
        if (obtenerUsuario >= 0) {
            return res.json({
                estado: "succes",
                mensaje: "usuario no encontrado en base de datos"
            });
        }
        res.json(obtenerUsuario[0]);
    }
    catch (error) {
        console.log(error);
    }
}));
//LOGIN
userSQLRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        };
        //let hasPass = await bcrypt.hash(user.password, 10);
        if (user.email && user.password) {
            //console.log(user.password)
            conectionMySql_1.default.query('SELECT * FROM USUARIOS where EMAIL_USUARIO = ?', [user.email], (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(result);
                if ((yield result.length) == 0 || (!bcrypt_1.default.compareSync(user.password, result[0].PASSWORD))) {
                    res.json({
                        estado: "success",
                        mensaje: "Usuario o contraseña incorrectos",
                    });
                }
                else {
                    const TokenJwt = token_1.Token.getToken({
                        id: result[0].ID_USUARIO,
                        nombre: result[0].NOMBRE_USUARIO,
                        email: result[0].EMAIL_USUARIO,
                        estado: result[0].ESTADO,
                    });
                    res.json({
                        estado: "success",
                        mensaje: "usuario encontrado",
                        data: result,
                        token: TokenJwt
                    });
                }
                //res.end();
            }));
        }
        else {
            res.send('El campo email o clave esta vacio');
            res.end();
        }
    }
    catch (error) {
        yield promesas_1.default("rollback", []);
        res.json({
            estado: "error y rollback",
            data: error
        });
    }
}));
//UPDATE
userSQLRoutes.put('/updateUsuario', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            ID_USUARIO: req.query.ID_USUARIO,
            nombreUsuario: req.body.nombreUsuario,
            password: bcrypt_1.default.hashSync(req.body.password, 10),
            email: req.body.email,
            telefono: req.body.telefono
        };
        // const obtenerUsuario:any = await query("select * from usuarios where nombre_usuario=?" ,[user.nombre])
        const updateUsuario = yield conectionMySql_1.default.query(`UPDATE USUARIOS SET NOMBRE_USUARIO='${user.nombreUsuario}', PASSWORD='${user.password}', EMAIL_USUARIO='${user.email}', TELEFONO='${user.telefono}' WHERE ID_USUARIO =${user.ID_USUARIO}`);
        yield conectionMySql_1.default.query("commit");
        const usuarioActual = yield promesas_1.default("select * from usuarios where nombre_usuario=?", [user.nombreUsuario]);
        res.json({ estado: "success",
            mensaje: "usuario actualizado con exito",
            data: usuarioActual[0]
        });
    }
    catch (error) {
        console.log(error);
    }
}));
//DELETE
userSQLRoutes.delete('/eliminarUsuario', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            nombre: req.body.nombre_usuario
        };
        const obtenerUsuario = yield promesas_1.default("select ID_USUARIO from USUARIOS where nombre_usuario=?", [user.nombre]);
        //console.log(obtenerUsuario[0].ID_USUARIO)
        const deleteUsuario = yield conectionMySql_1.default.query(`DELETE FROM USUARIOS WHERE ID_USUARIO =${obtenerUsuario[0].ID_USUARIO}`);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "El usuario " + user.nombre + " fue eliminado"
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = userSQLRoutes;
