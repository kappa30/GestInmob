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
const propiedadesRoutes = express_1.Router();
propiedadesRoutes.post('/createPropiedad', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const depto = {
            direccion: req.body.direccion,
            barrio: req.body.id_barrio,
            propietario: req.body.id_propietario,
            m2c: req.body.mts_cubiertos,
            m2d: req.body.mts_descubiertos,
            m2t: req.body.mts_totales,
            ambientes: req.body.cantidad_ambientes,
            cochera: req.body.cochera,
            valor: req.body.valor_propiedad,
            operacion: req.body.tipo_operacion,
            estadoOperacion: req.body.estado_tipo_operacion
        };
        yield conectionMySql_1.default.query("start transaction");
        const creodepto = yield promesas_1.default("INSERT INTO PROPIEDADES(DIRECCION, ID_BARRIO, ID_PROPIETARIO, MTS_CUBIERTOS, MTS_DESCUBIERTOS, MTS_TOTALES, CANTIDAD_AMBIENTES, COCHERA, VALOR_PROPIEDAD, TIPO_OPERACION, ESTADO_TIPO_OPERACION)VALUES(?,?,?,?,?,?,?,?,?,?,?)", [depto.direccion, depto.barrio, depto.propietario, depto.m2c, depto.m2d, depto.m2t, depto.ambientes, depto.cochera, depto.valor, depto.operacion, depto.estadoOperacion]);
        yield conectionMySql_1.default.query("commit");
        const deptoCreado = yield promesas_1.default("select * from PROPIEDADES where ID_PROPIEDAD=?", [creodepto.insertId]);
        res.json({
            estado: "success",
            mensaje: deptoCreado
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
propiedadesRoutes.delete('/borrarPropiedad', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prop = {
            tipoDoc: req.body.tipo_doc,
            numDoc: req.body.numero_documento
        };
        const getProp = yield promesas_1.default("select * from PROPIETARIOS where TIPO_DOC=? AND NUMERO_DOCUMENTO=?", [prop.tipoDoc, prop.numDoc]);
        console.log(getProp);
        const borraProp = yield conectionMySql_1.default.query("DELETE FROM PROPIETARIOS WHERE ID_PROPIETARIO =?", [getProp[0].ID_PROPIETARIO]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "El propietario fue eliminado"
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
propiedadesRoutes.put('/actualizaPropiedad', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const depto = {
            direccion: req.body.direccion,
            barrio: req.body.id_barrio,
            propietario: req.body.id_propietario,
            m2c: req.body.mts_cubiertos,
            m2d: req.body.mts_descubiertos,
            m2t: req.body.mts_totales,
            ambientes: req.body.cantidad_ambientes,
            cochera: req.body.cochera,
            valor: req.body.valor_propiedad,
            operacion: req.body.tipo_operacion,
            estadoOperacion: req.body.estado_tipo_operacion
        };
        const getDepto = yield promesas_1.default("select * from PROPIEDADES where DIRECCION=?", [depto.direccion]);
        const updateProp = yield conectionMySql_1.default.query("UPDATE PROPIEDADES SET DIRECCION=?, ID_BARRIO=?, ID_PROPIETARIO=?, MTS_CUBIERTOS=?, MTS_DESCUBIERTOS=?, MTS_TOTALES=?, CANTIDAD_AMBIENTES=?, COCHERA=?, VALOR_PROPIEDAD=?, TIPO_OPERACION=?, ESTADO_TIPO_OPERACION=? WHERE ID_PROPIEDAD=?", [depto.direccion, depto.barrio, depto.propietario, depto.m2c, depto.m2d, depto.m2t, depto.ambientes, depto.cochera, depto.valor, depto.operacion, depto.estadoOperacion, getDepto[0].ID_PROPIEDAD]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "La propiedad fue actualizada"
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
exports.default = propiedadesRoutes;
