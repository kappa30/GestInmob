import {Router, Request, Response} from 'express';

export = {
    token: (req:any, res:Response)=>{
        const propietario = req.propietario;

        res.json({
            estado: "succes",
            data: propietario
        })
      
    }
}
