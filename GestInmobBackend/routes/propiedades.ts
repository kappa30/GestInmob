import {Router, Response, Request} from 'express';
import {Token} from '../class/token';
import { verificarToken } from '../middlewares/authentication';
import jwt from 'jsonwebtoken';
import connection from '../bin/conectionMySql';
import { json } from 'body-parser';
import query from '../utils/promesas'
import bcrypt from 'bcrypt';
import emailClass from '../class/email';


const propiedadesRoutes = Router();


propiedadesRoutes.post('/createPropiedad', verificarToken, async (req:any, res:Response)=>{

    try{
        const depto ={
                    direccion : req.body.direccion,
                    barrio : req.body.id_barrio,
                    propietario : req.body.id_propietario,
                    m2c : req.body.mts_cubiertos,
                    m2d : req.body.mts_descubiertos,
                    m2t : req.body.mts_totales,
                    ambientes : req.body.cantidad_ambientes,
                    cochera : req.body.cochera,
                    valor : req.body.valor_propiedad,
                    operacion : req.body.tipo_operacion,
                    estadoOperacion : req.body.estado_tipo_operacion
                    }

        await connection.query("start transaction");
        const creodepto:any = await query ("INSERT INTO PROPIEDADES(DIRECCION, ID_BARRIO, ID_PROPIETARIO, MTS_CUBIERTOS, MTS_DESCUBIERTOS, MTS_TOTALES, CANTIDAD_AMBIENTES, COCHERA, VALOR_PROPIEDAD, TIPO_OPERACION, ESTADO_TIPO_OPERACION)VALUES(?,?,?,?,?,?,?,?,?,?,?)",[depto.direccion, depto.barrio, depto.propietario, depto.m2c, depto.m2d, depto.m2t, depto.ambientes, depto.cochera, depto.valor, depto.operacion, depto.estadoOperacion]);
        await connection.query("commit");
        const deptoCreado =await query("select * from PROPIEDADES where ID_PROPIEDAD=?",[creodepto.insertId]);

        res.json({
                  estado: "success",
                  mensaje: deptoCreado
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


propiedadesRoutes.delete('/borrarPropiedad', verificarToken, async (req:any, res:Response)=>{

  try {

    const prop = {        
      tipoDoc : req.body.tipo_doc,
      numDoc : req.body.numero_documento
    }

    const getProp:any = await query("select * from PROPIETARIOS where TIPO_DOC=? AND NUMERO_DOCUMENTO=?" ,[prop.tipoDoc, prop.numDoc])
    console.log(getProp)

    const borraProp:any = await connection.query("DELETE FROM PROPIETARIOS WHERE ID_PROPIETARIO =?", [getProp[0].ID_PROPIETARIO] );
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

propiedadesRoutes.put('/actualizaPropiedad', verificarToken, async (req:any, res:Response)=>{

  try {

    const depto ={
        direccion : req.body.direccion,
        barrio : req.body.id_barrio,
        propietario : req.body.id_propietario,
        m2c : req.body.mts_cubiertos,
        m2d : req.body.mts_descubiertos,
        m2t : req.body.mts_totales,
        ambientes : req.body.cantidad_ambientes,
        cochera : req.body.cochera,
        valor : req.body.valor_propiedad,
        operacion : req.body.tipo_operacion,
        estadoOperacion : req.body.estado_tipo_operacion
        }

    const getDepto:any = await query("select * from PROPIEDADES where DIRECCION=?" ,[depto.direccion])
  

    const updateProp:any = await connection.query("UPDATE PROPIEDADES SET DIRECCION=?, ID_BARRIO=?, ID_PROPIETARIO=?, MTS_CUBIERTOS=?, MTS_DESCUBIERTOS=?, MTS_TOTALES=?, CANTIDAD_AMBIENTES=?, COCHERA=?, VALOR_PROPIEDAD=?, TIPO_OPERACION=?, ESTADO_TIPO_OPERACION=? WHERE ID_PROPIEDAD=?", [depto.direccion, depto.barrio, depto.propietario, depto.m2c, depto.m2d, depto.m2t, depto.ambientes, depto.cochera, depto.valor, depto.operacion, depto.estadoOperacion, getDepto[0].ID_PROPIEDAD]);
    
    await connection.query("commit");

        res.json(
            {estado: "success",
            mensaje: "La propiedad fue actualizada"
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




export default propiedadesRoutes;