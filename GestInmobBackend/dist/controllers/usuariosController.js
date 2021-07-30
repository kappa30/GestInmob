"use strict";
module.exports = {
    token: (req, res) => {
        const usuario = req.usuario;
        res.json({
            estado: "succes",
            mensaje: "Usuario logueado",
            data: usuario
        });
    }
};
//import { Router, Request, Response } from "express";
// import Usuario from "../models/usuarios.model";
// import { IrequestExpress } from "../interfaces/requestExpress";
// export = {
//     token: (req:any, res:Response, next:any)=>{
//         const request:IrequestExpress = req;
//         const usuario = request.usuario.id_usuario;
//         console.log("request", req)
//         res.json({
//             estado:"succes",
//             mensaje: usuario
//         })
//         next()
//     }
// }
