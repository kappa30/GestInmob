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
const propietariosRoutes = express_1.Router();
propietariosRoutes.post('/createPropietario', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prop = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            tipoDoc: req.body.tipoDoc,
            numDoc: req.body.numDoc,
            email: req.body.email,
            email2: req.body.email2,
            telefono: req.body.telefono,
            telefono2: req.body.telefono2
        };
        yield conectionMySql_1.default.query("start transaction");
        const insertprop = yield promesas_1.default("INSERT INTO PROPIETARIOS(NOMBRE, APELLIDO, TIPO_DOC, NUMERO_DOCUMENTO, EMAIL, EMAIL2, TELEFONO, TELEFONO2)VALUES(?,?,?,?,?,?,?,?)", [prop.nombre, prop.apellido, prop.tipoDoc, prop.numDoc, prop.email, prop.email2, prop.telefono, prop.telefono2]);
        yield conectionMySql_1.default.query("commit");
        const propInsertado = yield promesas_1.default("select * from PROPIETARIOS where ID_PROPIETARIO=?", [insertprop.insertId]);
        res.json({
            estado: "success",
            mensaje: propInsertado
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
propietariosRoutes.delete('/borrarPropietario', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prop = {
            ID_PROPIETARIO: req.query.ID_PROPIETARIO,
            // tipoDoc : req.body.tipo_doc,
            // numDoc : req.body.numero_documento
        };
        // const getProp:any = await query("select * from PROPIETARIOS where ID_PROPIETARIO=?" ,[prop.ID_PROPIETARIO])
        // console.log(getProp)
        yield conectionMySql_1.default.query("DELETE FROM PROPIETARIOS WHERE ID_PROPIETARIO =?", [prop.ID_PROPIETARIO]);
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
propietariosRoutes.put('/actualizaPropietario', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prop = {
            ID_PROPIETARIO: req.query.ID_PROPIETARIO,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            tipoDoc: req.body.tipoDoc,
            numDoc: req.body.numDoc,
            email: req.body.email,
            email2: req.body.email2,
            telefono: req.body.telefono,
            telefono2: req.body.telefono2
        };
        //   const getProp:any = await query("select * from PROPIETARIOS where ID_PROPIETARIO=?" ,[prop.ID_PROPIETARIO])
        console.log(prop.ID_PROPIETARIO);
        const updateProp = yield conectionMySql_1.default.query("UPDATE PROPIETARIOS SET NOMBRE=?, APELLIDO=?, TIPO_DOC=?, NUMERO_DOCUMENTO=?, EMAIL=?, EMAIL2=?, TELEFONO=?, TELEFONO2=? WHERE ID_PROPIETARIO =?", [prop.nombre, prop.apellido, prop.tipoDoc, prop.numDoc, prop.email, prop.email2, prop.telefono, prop.telefono2, prop.ID_PROPIETARIO]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "El propietario fue actualizado"
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
propietariosRoutes.get('/listarPropietarios', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const prop = {
        //   nombre : req.body.nombre,
        //   apellido : req.body.apellido,
        //   tipoDoc : req.body.tipo_doc,
        //   numDoc : req.body.numero_documento,
        //   email : req.body.email,
        //   email2 : req.body.email2,
        //   telefono : req.body.telefono,
        //   telefono2 : req.body.telefono,      
        //   }
        const getProp = yield promesas_1.default("select * from PROPIETARIOS", []);
        // console.log(getProp[0].ID_PROPIETARIO)    
        res.json(getProp);
    }
    catch (error) {
        res.json({
            estado: "error",
            data: error,
        });
    }
}));
propietariosRoutes.get('/listarOneProp', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prop = {
            ID_PROPIETARIO: req.query.ID_PROPIETARIO,
        };
        const getProp = yield promesas_1.default("select * from PROPIETARIOS WHERE ID_PROPIETARIO =?", [prop.ID_PROPIETARIO]);
        // console.log(getProp[0].ID_PROPIETARIO)    
        res.json(getProp[0]);
    }
    catch (error) {
        res.json({
            estado: "error",
            data: error,
        });
    }
}));
exports.default = propietariosRoutes;
