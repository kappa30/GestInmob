"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("../config"));
const connection = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: config_1.default.DB_MYSQL,
    port: 3306
});
exports.default = connection;
