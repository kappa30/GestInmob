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
const authentication_1 = require("../middlewares/authentication");
const conectionMySql_1 = __importDefault(require("../bin/conectionMySql"));
const promesas_1 = __importDefault(require("../utils/promesas"));
const mantenimientoRoutes = express_1.Router();
mantenimientoRoutes.post('/createBarrio', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barrio = req.body.barrio;
        const creaBarrio = yield promesas_1.default("INSERT INTO BARRIOS (BARRIO) VALUES (?)", [barrio]);
        yield conectionMySql_1.default.query("commit");
        const barrioInsertado = yield promesas_1.default("select * from BARRIOS where ID_BARRIO=?", [creaBarrio.insertId]);
        res.json({
            estado: "success",
            mensaje: barrioInsertado
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
//tiene constaint, ver de poner estado
mantenimientoRoutes.delete('/deleteBarrio', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barrio = {
            ID_BARRIO: req.query.ID_BARRIO
        };
        // const getbarrio:any = await query("select * from BARRIOS where BARRIO=?" ,[barrio])
        // console.log(getbarrio)
        yield conectionMySql_1.default.query("DELETE FROM barrios WHERE ID_BARRIO =?", [barrio.ID_BARRIO]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "El barrio fue eliminado"
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.put('/updateBarrio', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barrio = {
            ID_BARRIO: req.query.ID_BARRIO,
            barrio: req.body.barrio
        };
        // const getbarrio:any = await query("select * from BARRIOS where BARRIO=?" ,[barrio])
        // console.log(getbarrio)
        const updateBarrio = yield conectionMySql_1.default.query("UPDATE BARRIOS SET BARRIO=? WHERE ID_BARRIO =?", [barrio.barrio, barrio.ID_BARRIO]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "El barrio fue actualizado"
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.get('/listarBarrios', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getBarrio = yield promesas_1.default("select * from BARRIOS", []);
        // console.log(getProp[0].ID_PROPIETARIO)    
        res.json(getBarrio);
    }
    catch (error) {
        res.json({
            estado: "error",
            data: error,
        });
    }
}));
mantenimientoRoutes.get('/listarOneBarrio', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barrio = {
            ID_BARRIO: req.query.ID_BARRIO,
        };
        const getBarrio = yield promesas_1.default("select * from BARRIOS WHERE ID_BARRIO =?", [barrio.ID_BARRIO]);
        res.json(getBarrio[0]);
    }
    catch (error) {
        res.json({
            estado: "error",
            data: error,
        });
    }
}));
//Administraciones
mantenimientoRoutes.post('/createAdministracion', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adm = {
            nombre: req.body.nombre,
            mail: req.body.mail,
            telefono: req.body.telefono
        };
        const creaAdm = yield promesas_1.default("INSERT INTO ADMINISTRACIONES (NOMBRE, MAIL, TELEFONO) VALUES (?,?,?)", [adm.nombre, adm.mail, adm.telefono]);
        yield conectionMySql_1.default.query("commit");
        const admInsertado = yield promesas_1.default("select * from ADMINISTRACIONES where ID_ADMINISTRACION=?", [creaAdm.insertId]);
        res.json({
            estado: "success",
            mensaje: admInsertado
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.delete('/deleteAdministracion', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adm = {
            nombre: req.body.nombre,
            mail: req.body.mail,
            telefono: req.body.telefono
        };
        const getadm = yield promesas_1.default("select * from ADMINISTRACIONES where NOMBRE=?", [adm.nombre]);
        console.log(getadm);
        const borraAdm = yield conectionMySql_1.default.query("DELETE FROM ADMINISTRACIONES WHERE ID_ADMINISTRACION =?", [getadm[0].ID_ADMINISTRACION]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "Se elimino la Administracion"
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.put('/updateAdministracion', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adm = {
            nombre: req.body.nombre,
            mail: req.body.mail,
            telefono: req.body.telefono
        };
        const getadm = yield promesas_1.default("select * from ADMINISTRACIONES where NOMBRE=?", [adm.nombre]);
        console.log(getadm);
        const updateAdm = yield conectionMySql_1.default.query("UPDATE ADMINISTRACIONES SET NOMBRE=?, MAIL=?, TELEFONO=? WHERE ID_ADMINISTRACION =?", [adm.nombre, adm.mail, adm.telefono, getadm[0].ID_ADMINISTRACION]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "La administracion fue actualizada"
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
// medio de pago
mantenimientoRoutes.post('/createPagos', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagos = req.body.medio_de_pago;
        const creaPago = yield promesas_1.default("INSERT INTO MEDIOS_DE_PAGO (MEDIO_DE_PAGO) VALUES (?)", [pagos]);
        yield conectionMySql_1.default.query("commit");
        const pagoInsertado = yield promesas_1.default("select * from MEDIOS_DE_PAGO where ID_PAGO=?", [creaPago.insertId]);
        res.json({
            estado: "success",
            mensaje: pagoInsertado
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.put('/updatePagos', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagos = req.body.medio_de_pago;
        const getpago = yield promesas_1.default("select * from MEDIOS_DE_PAGO where MEDIO_DE_PAGO=?", [pagos]);
        console.log(getpago);
        const updatePagos = yield conectionMySql_1.default.query("UPDATE MEDIOS_DE_PAGO SET MEDIO_DE_PAGO=? WHERE ID_PAGO =?", [pagos, getpago[0].ID_PAGO]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "Se actualizo medio de pago"
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.post('/createServicio', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servicio = req.body.nombre_servicio;
        const empresa = req.body.empresa;
        const creaServicio = yield promesas_1.default("INSERT INTO SERVICIOS (NOMBRE_SERVICIO, EMPRESA) VALUES (?,?)", [servicio, empresa]);
        yield conectionMySql_1.default.query("commit");
        const servicioInsertado = yield promesas_1.default("select * from SERVICIOS where ID_SERVICIO=?", [creaServicio.insertId]);
        res.json({
            estado: "success",
            mensaje: servicioInsertado
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.put('/updateServicio', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servicios = {
            ID_SERVICIO: req.query.ID_SERVICIO,
            nombre_servicio: req.body.nombre_servicio,
            empresa: req.body.empresa
        };
        // const getServicio:any = await query("select * from SERVICIOS where NOMBRE_SERVICIO=?",[servicio]);
        // console.log(getServicio)
        const updateServicio = yield promesas_1.default("UPDATE SERVICIOS  SET NOMBRE_SERVICIO=?, EMPRESA =? WHERE ID_SERVICIO=?", [servicios.nombre_servicio, servicios.empresa, servicios.ID_SERVICIO]);
        yield conectionMySql_1.default.query("commit");
        res.json({
            estado: "success",
            mensaje: "Se actualizo el servicio"
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.get('/listarservicio', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getservicio = yield promesas_1.default("select * from SERVICIOS", []);
        res.json(getservicio);
    }
    catch (error) {
        res.json({
            estado: "error",
            data: error,
        });
    }
}));
mantenimientoRoutes.get('/listarOneServicio', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servicio = {
            ID_SERVICIO: req.query.ID_SERVICIO,
        };
        const getservicio = yield promesas_1.default("select * from SERVICIOS WHERE ID_SERVICIO =?", [servicio.ID_SERVICIO]);
        res.json(getservicio[0]);
    }
    catch (error) {
        res.json({
            estado: "error",
            data: error,
        });
    }
}));
mantenimientoRoutes.delete('/borrarServicio', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servicio = {
            ID_SERVICIO: req.query.ID_SERVICIO,
        };
        yield conectionMySql_1.default.query("DELETE FROM SERVICIOS WHERE ID_SERVICIO =?", [servicio.ID_SERVICIO]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "El servicio fue eliminado"
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.post('/createTipoDoc', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipoDoc = req.body.tipo_documento;
        const creaDoc = yield promesas_1.default("INSERT INTO TIPO_DOCUMENTOS (TIPO_DOCUMENTO) VALUES (?)", [tipoDoc]);
        yield conectionMySql_1.default.query("commit");
        const docInsertado = yield promesas_1.default("select * from TIPO_DOCUMENTOS where ID_DOCUMENTO=?", [creaDoc.insertId]);
        creaDoc;
        res.json({
            estado: "success",
            mensaje: docInsertado
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.post('/createTipoOperacion', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipoOperacion = req.body.tipo_operacion;
        const creaTipoOperacion = yield promesas_1.default("INSERT INTO TIPO_OPERACIONES (TIPO_OPERACION) VALUES (?)", [tipoOperacion]);
        yield conectionMySql_1.default.query("commit");
        const tipoPperaInsertado = yield promesas_1.default("select * from TIPO_OPERACIONES where ID_OPERACION=?", [creaTipoOperacion.insertId]);
        res.json({
            estado: "success",
            mensaje: tipoPperaInsertado
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
mantenimientoRoutes.post('/createTipogarantia', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipoGarantia = req.body.tipo_garantia;
        const creaTipoGarantia = yield promesas_1.default("INSERT INTO GARANTIAS (TIPO_GARANTIA) VALUES (?)", [tipoGarantia]);
        yield conectionMySql_1.default.query("commit");
        const tipoGarantiaInsertado = yield promesas_1.default("select * from GARANTIAS where ID_GARANTIA=?", [creaTipoGarantia.insertId]);
        res.json({
            estado: "success",
            mensaje: tipoGarantiaInsertado
        });
    }
    catch (error) {
        const rollback = yield conectionMySql_1.default.query("rollback");
        res.json({
            estado: "error",
            data: error,
            rollabck: rollback
        });
    }
}));
exports.default = mantenimientoRoutes;
