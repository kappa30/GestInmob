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
const file_system_1 = __importDefault(require("../class/file-system"));
const inquilinosRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
inquilinosRoutes.post('/createInquilino', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inq = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            tipoDoc: req.body.tipoDoc,
            numDoc: req.body.numDoc,
            email: req.body.email,
            email2: req.body.email2,
            telefono: req.body.telefono,
            telefono2: req.body.telefono2,
            tipoGarantia: req.body.tipoGarantia,
            garante: req.body.garante,
            fotoDni: req.files
        };
        yield conectionMySql_1.default.query("start transaction");
        const insertInqui = yield promesas_1.default("INSERT INTO INQUILINOS (NOMBRE, APELLIDO, TIPO_DOC, NUMERO_DOCUMENTO, EMAIL, EMAIL2, TELEFONO, TELEFONO2, TIPO_DE_GARANTIA, GARANTE,DNI_FOTO)VALUES(?,?,?,?,?,?,?,?,?,?,?)", [inq.nombre, inq.apellido, inq.tipoDoc, inq.numDoc, inq.email, inq.email2, inq.telefono, inq.telefono2, inq.tipoGarantia, inq.garante, inq.fotoDni]);
        yield conectionMySql_1.default.query("commit");
        const inquiInsertado = yield promesas_1.default("select * from INQUILINOS where ID_INQUILINO=?", [insertInqui.insertId]);
        res.json({
            estado: "success",
            data: insertInqui.insertId
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
inquilinosRoutes.delete('/borrarInquilino', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inqui = {
            ID_INQUILINO: req.query.ID_INQUILINO,
            tipoDoc: req.body.tipo_doc,
            numDoc: req.body.numero_documento
        };
        // const getinqui:any = await query("select * from INQUILINOS where TIPO_DOC=? AND NUMERO_DOCUMENTO=?" ,[inqui.tipoDoc, inqui.numDoc])
        // console.log(getinqui)
        const borraInqui = yield conectionMySql_1.default.query("DELETE FROM INQUILINOS WHERE ID_INQUILINO =?", [inqui.ID_INQUILINO]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "El Inquilino fue eliminado"
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
inquilinosRoutes.put('/actualizaInquilino', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inq = {
            ID_INQUILINO: req.query.ID_INQUILINO,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            tipoDoc: req.body.tipoDoc,
            numDoc: req.body.numDoc,
            email: req.body.email,
            email2: req.body.email2,
            telefono: req.body.telefono,
            telefono2: req.body.telefono2,
            tipoGarantia: req.body.tipoGarantia,
            garante: req.body.garante
        };
        // const getInqui:any = await query("select * from INQUILINOS where TIPO_DOC=? AND NUMERO_DOCUMENTO=?" ,[inq.tipoDoc, inq.numDoc])
        const updateInqui = yield conectionMySql_1.default.query("UPDATE INQUILINOS SET NOMBRE=?, APELLIDO=?, TIPO_DOC=?, NUMERO_DOCUMENTO=?, EMAIL=?, EMAIL2=?, TELEFONO=?, TELEFONO2=?, TIPO_DE_GARANTIA=?, GARANTE=? WHERE ID_INQUILINO =?", [inq.nombre, inq.apellido, inq.tipoDoc, inq.numDoc, inq.email, inq.email2, inq.telefono, inq.telefono2, inq.tipoGarantia, inq.garante, inq.ID_INQUILINO]);
        yield conectionMySql_1.default.query("commit");
        res.json({ estado: "success",
            mensaje: "El inquilino fue actualizado"
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
inquilinosRoutes.get('/listarOneInq', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inq = {
            ID_INQUILINO: req.query.ID_INQUILINO,
        };
        const getInq = yield promesas_1.default("select * from INQUILINOS WHERE ID_INQUILINO =?", [inq.ID_INQUILINO]);
        res.json(getInq[0]);
    }
    catch (error) {
        res.json({
            estado: "error",
            data: error,
        });
    }
}));
inquilinosRoutes.get('/listarInquilinos', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getInq = yield promesas_1.default("select * from INQUILINOS", []);
        res.json(getInq);
    }
    catch (error) {
        res.json({
            estado: "error",
            data: error,
        });
    }
}));
//SUBIR IMAGEN A INQUILINO
inquilinosRoutes.put("/upload/", authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inq = {
            ID_INQUILINO: req.query.ID_INQUILINO
        };
        const getInq = yield promesas_1.default("select * from INQUILINOS WHERE ID_INQUILINO =?", [inq.ID_INQUILINO]);
        res.json({
            data: getInq[0]
        });
        if (req.files) {
            let arrayImagen = Object.values(req.files);
            //  console.log(arrayNuevo);
            if (Array.isArray(arrayImagen[0])) {
                arrayImagen[0].forEach((imagen) => __awaiter(void 0, void 0, void 0, function* () {
                    let nuevaImagen = imagen;
                    const imag = nuevaImagen;
                    console.log(imag, "imagen");
                    yield fileSystem.guardarImagenTemporal(inq.ID_INQUILINO, imag);
                }));
            }
            else {
                let nuevaImagen = arrayImagen[0];
                const imag = nuevaImagen;
                yield fileSystem.guardarImagenTemporal(inq.ID_INQUILINO, imag);
                console.log(imag);
            }
            const imagenes = yield fileSystem.imagenesDeTempHaciaPost(inq.ID_INQUILINO);
            // console.log(imagenes);
            imagenes.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                // console.log("este es el item", item);
                yield conectionMySql_1.default.query("start transaction");
                const insertar = yield promesas_1.default("UPDATE INQUILINOS SET DNI_FOTO=? WHERE ID_INQUILINO =?", [item, inq.ID_INQUILINO]);
                console.log(insertar);
                yield conectionMySql_1.default.query("commit");
            }));
            res.json({
                estado: 'success',
                data: arrayImagen
            });
        }
        else {
            return res.status(400).json({
                estado: 'error',
                mensaje: 'No se subió el archivo'
            });
        }
    }
    catch (error) {
        res.json({
            estado: "error",
            data: error,
        });
    }
}));
//OBTENER IMAGEN 
inquilinosRoutes.get('/upload/', authentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inq = req.query.ID_INQUILINO;
    const images = yield promesas_1.default("SELECT DNI_FOTO FROM INQUILINOS WHERE ID_INQUILINO =?", [inq.ID_INQUILINO]);
    console.log(images);
    res.json({
        estado: "success",
        data: images
    });
    const imagen = fileSystem.getFotoUrl(inq.ID_INQUILINO, images[0]);
    res.sendFile(imagen);
}));
exports.default = inquilinosRoutes;
