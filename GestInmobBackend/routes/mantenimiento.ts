import {Router, Response, Request} from 'express';
import {Token} from '../class/token';
import { verificarToken } from '../middlewares/authentication';
import jwt from 'jsonwebtoken';
import connection from '../bin/conectionMySql';
import bodyParser, { json } from 'body-parser';
import query from '../utils/promesas'
import bcrypt from 'bcrypt';
import emailClass from '../class/email';
import { CreateDateColumn } from 'typeorm';


const mantenimientoRoutes = Router();

mantenimientoRoutes.post('/createBarrio', verificarToken, async (req:any, res:Response)=>{

    try{

        const barrio = req.body.barrio;
        const creaBarrio:any = await query("INSERT INTO BARRIOS (BARRIO) VALUES (?)", [barrio]);
        await connection.query("commit");
        const barrioInsertado =await query("select * from BARRIOS where ID_BARRIO=?",[creaBarrio.insertId]);

        res.json({
                  estado: "success",
                  mensaje: barrioInsertado
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
//tiene constaint, ver de poner estado
mantenimientoRoutes.delete('/deleteBarrio', verificarToken, async (req:any, res:Response)=>{

    try {
  
        const barrio = {
          ID_BARRIO : req.query.ID_BARRIO
        }
      
      
      // const getbarrio:any = await query("select * from BARRIOS where BARRIO=?" ,[barrio])
      // console.log(getbarrio)
  
      await connection.query("DELETE FROM barrios WHERE ID_BARRIO =?", [barrio.ID_BARRIO] );
      await connection.query("commit");
  
          res.json(
              {estado: "success",
              mensaje: "El barrio fue eliminado"
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

mantenimientoRoutes.put('/updateBarrio', verificarToken, async (req:any, res:Response)=>{

    try {
  
        const barrio = {
          ID_BARRIO: req.query.ID_BARRIO,
          barrio: req.body.barrio
        }
      
      
      // const getbarrio:any = await query("select * from BARRIOS where BARRIO=?" ,[barrio])
      // console.log(getbarrio)
  
      const updateBarrio:any = await connection.query("UPDATE BARRIOS SET BARRIO=? WHERE ID_BARRIO =?", [barrio.barrio, barrio.ID_BARRIO] );
      await connection.query("commit");
  
          res.json(
              {estado: "success",
              mensaje: "El barrio fue actualizado"
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

mantenimientoRoutes.get('/listarBarrios', verificarToken, async (req:any, res:Response)=>{

    try {
      const getBarrio:any = await query("select * from BARRIOS",[])
  // console.log(getProp[0].ID_PROPIETARIO)    
             res.json(             
              getBarrio
          );    
  }
  catch(error){  
    res.json({
              estado:"error",
              data:error, 
              });
              }
  })
  
mantenimientoRoutes.get('/listarOneBarrio', verificarToken, async (req:any, res:Response)=>{
  
    try {
      const barrio = {
        ID_BARRIO: req.query.ID_BARRIO,
       }
      const getBarrio:any = await query("select * from BARRIOS WHERE ID_BARRIO =?",[barrio.ID_BARRIO])
  
             res.json(              
              getBarrio[0]
          );    
  }
  catch(error){  
    res.json({
              estado:"error",
              data:error, 
              });
    }
  })
  

//Administraciones
  mantenimientoRoutes.post('/createAdministracion', verificarToken, async (req:any, res:Response)=>{

    try{

        const adm = {

            nombre: req.body.nombre,
            mail: req.body.mail,
            telefono: req.body.telefono
        }
        const creaAdm:any = await query("INSERT INTO ADMINISTRACIONES (NOMBRE, MAIL, TELEFONO) VALUES (?,?,?)", [adm.nombre, adm.mail, adm.telefono]);
        await connection.query("commit");
        const admInsertado = await query("select * from ADMINISTRACIONES where ID_ADMINISTRACION=?",[creaAdm.insertId]);

        res.json({
                  estado: "success",
                  mensaje: admInsertado
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

mantenimientoRoutes.delete('/deleteAdministracion', verificarToken, async (req:any, res:Response)=>{

    try{

        const adm = {

            nombre: req.body.nombre,
            mail: req.body.mail,
            telefono: req.body.telefono
        }
      
      
      const getadm:any = await query("select * from ADMINISTRACIONES where NOMBRE=?" ,[adm.nombre])
      console.log(getadm)
      
  
      const borraAdm:any = await connection.query("DELETE FROM ADMINISTRACIONES WHERE ID_ADMINISTRACION =?", [getadm[0].ID_ADMINISTRACION] );
      await connection.query("commit");
      
  
          res.json(
              {estado: "success",
              mensaje: "Se elimino la Administracion"
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

mantenimientoRoutes.put('/updateAdministracion', verificarToken, async (req:any, res:Response)=>{

    try {
  
        const adm = {

            nombre: req.body.nombre,
            mail: req.body.mail,
            telefono: req.body.telefono
        }
      
      
        const getadm:any = await query("select * from ADMINISTRACIONES where NOMBRE=?" ,[adm.nombre])
        console.log(getadm)
  
      const updateAdm:any = await connection.query("UPDATE ADMINISTRACIONES SET NOMBRE=?, MAIL=?, TELEFONO=? WHERE ID_ADMINISTRACION =?", [adm.nombre, adm.mail, adm.telefono, getadm[0].ID_ADMINISTRACION] );
      await connection.query("commit");
  
          res.json(
              {estado: "success",
              mensaje: "La administracion fue actualizada"
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

  // medio de pago

mantenimientoRoutes.post('/createPagos', verificarToken, async (req:any, res:Response)=>{

    try{

        const pagos = req.body.medio_de_pago
           
        
        const creaPago:any = await query("INSERT INTO MEDIOS_DE_PAGO (MEDIO_DE_PAGO) VALUES (?)", [pagos]);
        await connection.query("commit");
        const pagoInsertado = await query("select * from MEDIOS_DE_PAGO where ID_PAGO=?",[creaPago.insertId]);

        res.json({
                  estado: "success",
                  mensaje: pagoInsertado
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

mantenimientoRoutes.put('/updatePagos', verificarToken, async (req:any, res:Response)=>{

  try {

    const pagos = req.body.medio_de_pago
    
      const getpago:any = await query("select * from MEDIOS_DE_PAGO where MEDIO_DE_PAGO=?" ,[pagos])
      console.log(getpago)

    const updatePagos:any = await connection.query("UPDATE MEDIOS_DE_PAGO SET MEDIO_DE_PAGO=? WHERE ID_PAGO =?", [pagos, getpago[0].ID_PAGO] );
    await connection.query("commit");

        res.json(
            {estado: "success",
            mensaje: "Se actualizo medio de pago"
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


mantenimientoRoutes.post('/createServicio', verificarToken, async (req:any, res:Response)=>{

  try{

      const servicio = req.body.nombre_servicio
      const empresa = req.body.empresa

         
      
      const creaServicio:any = await query("INSERT INTO SERVICIOS (NOMBRE_SERVICIO, EMPRESA) VALUES (?,?)", [servicio, empresa]);
      await connection.query("commit");
      const servicioInsertado = await query("select * from SERVICIOS where ID_SERVICIO=?",[creaServicio.insertId]);

      res.json({
                estado: "success",
                mensaje: servicioInsertado
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

mantenimientoRoutes.put('/updateServicio', verificarToken, async (req:any, res:Response)=>{

  try{

      const servicios = {
        ID_SERVICIO: req.query.ID_SERVICIO,
        nombre_servicio: req.body.nombre_servicio,
        empresa : req.body.empresa

      } 
      // const getServicio:any = await query("select * from SERVICIOS where NOMBRE_SERVICIO=?",[servicio]);
      // console.log(getServicio)
      const updateServicio:any = await query("UPDATE SERVICIOS  SET NOMBRE_SERVICIO=?, EMPRESA =? WHERE ID_SERVICIO=?", [servicios.nombre_servicio, servicios.empresa, servicios.ID_SERVICIO]);
      await connection.query("commit");

      res.json({
                estado: "success",
                mensaje: "Se actualizo el servicio"
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

mantenimientoRoutes.get('/listarservicio', verificarToken, async (req:any, res:Response)=>{

  try {
    const getservicio:any = await query("select * from SERVICIOS",[])

           res.json(             
            getservicio
        );    
}
catch(error){  
  res.json({
            estado:"error",
            data:error, 
            });
            }
})

mantenimientoRoutes.get('/listarOneServicio', verificarToken, async (req:any, res:Response)=>{

  try {
    const servicio = {
      ID_SERVICIO: req.query.ID_SERVICIO,
     }
    const getservicio:any = await query("select * from SERVICIOS WHERE ID_SERVICIO =?",[servicio.ID_SERVICIO])

           res.json(              
            getservicio[0]
        );    
}
catch(error){  
  res.json({
            estado:"error",
            data:error, 
            });
  }
})
mantenimientoRoutes.delete('/borrarServicio', verificarToken, async (req:any, res:Response)=>{

  try {

    const servicio = {        
      ID_SERVICIO: req.query.ID_SERVICIO,
      
    }
    await connection.query("DELETE FROM SERVICIOS WHERE ID_SERVICIO =?", [servicio.ID_SERVICIO] );
    await connection.query("commit");

        res.json(
            {estado: "success",
            mensaje: "El servicio fue eliminado"
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


mantenimientoRoutes.post('/createTipoDoc', verificarToken, async (req:any, res:Response)=>{

  try{

      const tipoDoc = req.body.tipo_documento       
      
      const creaDoc:any = await query("INSERT INTO TIPO_DOCUMENTOS (TIPO_DOCUMENTO) VALUES (?)", [tipoDoc]);
      await connection.query("commit");
      const docInsertado = await query("select * from TIPO_DOCUMENTOS where ID_DOCUMENTO=?",[creaDoc.insertId]);
creaDoc
      res.json({
                estado: "success",
                mensaje: docInsertado
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

mantenimientoRoutes.post('/createTipoOperacion', verificarToken, async (req:any, res:Response)=>{

  try{

      const tipoOperacion = req.body.tipo_operacion
      
      const creaTipoOperacion:any = await query("INSERT INTO TIPO_OPERACIONES (TIPO_OPERACION) VALUES (?)", [tipoOperacion]);
      await connection.query("commit");
      const tipoPperaInsertado = await query("select * from TIPO_OPERACIONES where ID_OPERACION=?",[creaTipoOperacion.insertId]);

      res.json({
                estado: "success",
                mensaje: tipoPperaInsertado
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

mantenimientoRoutes.post('/createTipogarantia', verificarToken, async (req:any, res:Response)=>{

  try{

      const tipoGarantia = req.body.tipo_garantia
      
      const creaTipoGarantia:any = await query("INSERT INTO GARANTIAS (TIPO_GARANTIA) VALUES (?)", [tipoGarantia]);
      await connection.query("commit");
      const tipoGarantiaInsertado = await query("select * from GARANTIAS where ID_GARANTIA=?",[creaTipoGarantia.insertId]);

      res.json({
                estado: "success",
                mensaje: tipoGarantiaInsertado
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
export default mantenimientoRoutes;