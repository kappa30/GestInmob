"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
class email {
    constructor() {
        this.host = "smtp.gmail.com";
        this.port = 587;
        this.secure = false;
        this.tsl = false;
        this.auth = {
            user: "gestinmob2021@gmail.com",
            pass: "29849414"
        };
    }
    // private consultarDatos(){
    //    const datosEmail = await query("select host, post, secure, lts, user,pass from cuentas_correo ")
    //    return datosEmail //[{host: smtp.gmail.com, port: 587}]
    // }
    enviarEmail(cuentaCorreoDestion, asunto = "Alta usuario Gestion Inmobiliaria", cuerpoEmail = "Tu usuario fue creado con exito con los siguientes datos", html = "") {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer_1.default.createTransport({
                host: this.host,
                port: this.port,
                secure: this.secure,
                auth: {
                    user: this.auth.user,
                    pass: this.auth.pass
                },
                tls: {
                    rejectUnauthorized: this.tsl
                }
            });
            const mailOptions = {
                from: this.auth.user,
                to: cuentaCorreoDestion,
                subject: asunto,
                text: cuerpoEmail,
                html: html,
                attachments: [
                    {
                        path: path_1.default.resolve(__dirname, '../assets', 'isabel brex.png')
                    }
                ]
            };
            nodemailer_1.default.createTestAccount((error) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        return resolve(info);
                        console.log(info);
                    }
                });
            });
        });
    }
}
exports.default = email;
