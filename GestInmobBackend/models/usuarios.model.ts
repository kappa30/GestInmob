import { request, Response } from "express";
import connection from "../bin/conectionMySql";


const getUsuario = (req:Request, res:Response) =>{
    return new Promise((resolve, reject) =>{
        connection.query('SELECT * FROM USUARIOS'), (error:any, result:any) => {
            if (error) reject(error)
            resolve(result)
        };
    });
};

export default getUsuario;