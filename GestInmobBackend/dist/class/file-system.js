"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    crearCarpetaUsuario(ID_INQUILINO) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads', ID_INQUILINO);
        const pathUserTemp = pathUser + "/temp";
        console.log("ruta pathUser", pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    generarNombreUnico(nombreOriginal) {
        const nombreArr = nombreOriginal.split('.'); //[1,2,8]
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    guardarImagenTemporal(ID_INQUILINO, file) {
        return new Promise((resolve, reject) => {
            const path = this.crearCarpetaUsuario(ID_INQUILINO); //donde la voy a guardar
            console.log("path", path);
            const nombreArchivo = this.generarNombreUnico(file.name); //con que nombre la voy a guardar
            file.mv(`${path}/${nombreArchivo}`, (error) => {
                if (error) {
                    return reject(error);
                }
                else {
                    return resolve(true);
                }
            });
        });
    }
    obtenerImagenesTemp(ID_INQUILINO) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads', ID_INQUILINO, "temp");
        return fs_1.default.readdirSync(pathTemp);
    }
    imagenesDeTempHaciaPost(ID_INQUILINO) {
        const pathUserTemp = path_1.default.resolve(__dirname, '../uploads', ID_INQUILINO, "temp"); //De donde voy a mover la imagen -- origen
        const pathUserPost = path_1.default.resolve(__dirname, '../uploads', ID_INQUILINO, "post"); // Hacia donde lo voy a mover -- destino
        if (!fs_1.default.existsSync(pathUserTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathUserPost)) {
            fs_1.default.mkdirSync(pathUserPost);
        }
        const imagenesTemp = this.obtenerImagenesTemp(ID_INQUILINO);
        imagenesTemp.forEach(imagenes => {
            fs_1.default.renameSync(`${pathUserTemp}/${imagenes}`, `${pathUserPost}/${imagenes}`);
        });
        return imagenesTemp;
    }
    getFotoUrl(ID_INQUILINO, img) {
        const pathFoto = path_1.default.resolve(__dirname, '../uploads', ID_INQUILINO, "post", img);
        if (fs_1.default.existsSync(pathFoto)) {
            return pathFoto;
        }
        else {
            return path_1.default.resolve(__dirname, '../assets/imagen_default.jpg');
        }
    }
    createCarpetaUploads() {
        const pathUploads = path_1.default.resolve(__dirname, 'uploads');
        if (!fs_1.default.existsSync(pathUploads)) {
            fs_1.default.mkdirSync(pathUploads);
        }
    }
}
exports.default = FileSystem;
