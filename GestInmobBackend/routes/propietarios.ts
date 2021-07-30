import {Router, Response, Request} from 'express';
import {Token} from '../class/token';
import { verificarToken } from '../middlewares/authentication';
import jwt from 'jsonwebtoken';
import connection from '../bin/conectionMySql';
import { json } from 'body-parser';
import query from '../utils/promesas'
import emailClass from '../class/email';


const propietariosRoutes = Router();

propietariosRoutes.post('/createPropietario', verificarToken, async (req:any, res:Response)=>{

    try{
        const prop ={
                    nombre : req.body.nombre,
                    apellido : req.body.apellido,
                    tipoDoc : req.body.tipoDoc,
                    numDoc : req.body.numDoc,
                    email : req.body.email,
                    email2 : req.body.email2,
                    telefono : req.body.telefono,
                    telefono2 : req.body.telefono2
                    }

        await connection.query("start transaction");
        const insertprop:any = await query ("INSERT INTO PROPIETARIOS(NOMBRE, APELLIDO, TIPO_DOC, NUMERO_DOCUMENTO, EMAIL, EMAIL2, TELEFONO, TELEFONO2)VALUES(?,?,?,?,?,?,?,?)",[prop.nombre, prop.apellido, prop.tipoDoc, prop.numDoc, prop.email, prop.email2, prop.telefono, prop.telefono2]);
        
        await connection.query("commit");
        const propInsertado =await query("select * from PROPIETARIOS where ID_PROPIETARIO=?",[insertprop.insertId]);

        res.json({
                  estado: "success",
                  mensaje: propInsertado
                }) 
        }    
        catch(error){
        const rollback = await connection.query("rollback");
        res.json({
                  estado:"error",
                  data:error, 
                  rollabck:rollback});
        }
})


propietariosRoutes.delete('/borrarPropietario', verificarToken, async (req:any, res:Response)=>{

  try {

    const prop = {        
      ID_PROPIETARIO: req.query.ID_PROPIETARIO,
      // tipoDoc : req.body.tipo_doc,
      // numDoc : req.body.numero_documento
    }

    // const getProp:any = await query("select * from PROPIETARIOS where ID_PROPIETARIO=?" ,[prop.ID_PROPIETARIO])
    // console.log(getProp)

    await connection.query("DELETE FROM PROPIETARIOS WHERE ID_PROPIETARIO =?", [prop.ID_PROPIETARIO] );
    await connection.query("commit");

        res.json(
            {estado: "success",
            mensaje: "El propietario fue eliminado"
        });
    
}
catch(error){
  const rollback = await connection.query("rollback");
  res.json({
            estado:"error",
            data:error, 
            rollabck:rollback});
  }
})

propietariosRoutes.put('/actualizaPropietario', verificarToken, async (req:any, res:Response)=>{

  try {
    const prop = {
      ID_PROPIETARIO: req.query.ID_PROPIETARIO,
      nombre : req.body.nombre,
      apellido : req.body.apellido,
      tipoDoc : req.body.tipoDoc,
      numDoc : req.body.numDoc,
      email : req.body.email,
      email2 : req.body.email2,
      telefono : req.body.telefono,
      telefono2 : req.body.telefono2
      }
  //   const getProp:any = await query("select * from PROPIETARIOS where ID_PROPIETARIO=?" ,[prop.ID_PROPIETARIO])
  console.log(prop.ID_PROPIETARIO)
    const updateProp:any = await connection.query("UPDATE PROPIETARIOS SET NOMBRE=?, APELLIDO=?, TIPO_DOC=?, NUMERO_DOCUMENTO=?, EMAIL=?, EMAIL2=?, TELEFONO=?, TELEFONO2=? WHERE ID_PROPIETARIO =?", [prop.nombre, prop.apellido, prop.tipoDoc, prop.numDoc, prop.email, prop.email2, prop.telefono, prop.telefono2, prop.ID_PROPIETARIO] );
    await connection.query("commit");
        res.json(
            {estado: "success",
            mensaje: "El propietario fue actualizado"
        });    
}
catch(error){
  const rollback = await connection.query("rollback");
  res.json({
            estado:"error",
            data:error, 
            rollabck:rollback});
  }
})

propietariosRoutes.get('/listarPropietarios', verificarToken, async (req:any, res:Response)=>{

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
    const getProp:any = await query("select * from PROPIETARIOS",[])
// console.log(getProp[0].ID_PROPIETARIO)    
           res.json(
            
            getProp
        );    
}
catch(error){  
  res.json({
            estado:"error",
            data:error, 
            });
            }
})

propietariosRoutes.get('/listarOneProp', verificarToken, async (req:any, res:Response)=>{

  try {
    const prop = {
      ID_PROPIETARIO: req.query.ID_PROPIETARIO,
     }
    const getProp:any = await query("select * from PROPIETARIOS WHERE ID_PROPIETARIO =?",[prop.ID_PROPIETARIO])
// console.log(getProp[0].ID_PROPIETARIO)    
           res.json(
            
            getProp[0]
        );    
}
catch(error){  
  res.json({
            estado:"error",
            data:error, 
            });
  }
})



export default propietariosRoutes;