"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conectionMySql_1 = __importDefault(require("../bin/conectionMySql"));
const getUsuario = (req, res) => {
    return new Promise((resolve, reject) => {
        conectionMySql_1.default.query('SELECT * FROM USUARIOS'), (error, result) => {
            if (error)
                reject(error);
            resolve(result);
        };
    });
};
exports.default = getUsuario;
