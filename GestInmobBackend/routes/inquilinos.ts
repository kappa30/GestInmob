import {Router, Response, Request} from 'express';
import {Token} from '../class/token';
import { verificarToken } from '../middlewares/authentication';
import jwt from 'jsonwebtoken';
import connection from '../bin/conectionMySql';
import { json } from 'body-parser';
import query from '../utils/promesas'
import { IfileUpload } from '../interfaces/file-upload';
import FileSystem from '../class/file-system';



const inquilinosRoutes = Router();
const fileSystem = new FileSystem();


inquilinosRoutes.post('/createInquilino', verificarToken, async (req:any, res:Response)=>{

    try{
        const inq ={
                    nombre : req.body.nombre,
                    apellido : req.body.apellido,
                    tipoDoc : req.body.tipoDoc,
                    numDoc : req.body.numDoc,
                    email : req.body.email,
                    email2 : req.body.email2,
                    telefono : req.body.telefono,
                    telefono2 : req.body.telefono2,
                    tipoGarantia : req.body.tipoGarantia,
                    garante: req.body.garante,
                    fotoDni: req.files

                    }

        await connection.query("start transaction");
        const insertInqui:any = await query ("INSERT INTO INQUILINOS (NOMBRE, APELLIDO, TIPO_DOC, NUMERO_DOCUMENTO, EMAIL, EMAIL2, TELEFONO, TELEFONO2, TIPO_DE_GARANTIA, GARANTE,DNI_FOTO)VALUES(?,?,?,?,?,?,?,?,?,?,?)",[inq.nombre, inq.apellido, inq.tipoDoc, inq.numDoc, inq.email, inq.email2, inq.telefono, inq.telefono2, inq.tipoGarantia, inq.garante, inq.fotoDni]);
        await connection.query("commit");
        const inquiInsertado =await query("select * from INQUILINOS where ID_INQUILINO=?",[insertInqui.insertId]);

        res.json({
                  estado: "success",
                  data: insertInqui.insertId
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


inquilinosRoutes.delete('/borrarInquilino', verificarToken, async (req:any, res:Response)=>{

  try {

    const inqui = {
      ID_INQUILINO : req.query.ID_INQUILINO,
      tipoDoc : req.body.tipo_doc,
      numDoc : req.body.numero_documento
    }
    
    // const getinqui:any = await query("select * from INQUILINOS where TIPO_DOC=? AND NUMERO_DOCUMENTO=?" ,[inqui.tipoDoc, inqui.numDoc])
    // console.log(getinqui)

    const borraInqui:any = await connection.query("DELETE FROM INQUILINOS WHERE ID_INQUILINO =?", [inqui.ID_INQUILINO] );
    await connection.query("commit");

        res.json(
            {estado: "success",
            mensaje: "El Inquilino fue eliminado"
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

inquilinosRoutes.put('/actualizaInquilino', verificarToken, async (req:any, res:Response)=>{

  try {

    const inq ={
      ID_INQUILINO : req.query.ID_INQUILINO,
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        tipoDoc : req.body.tipoDoc,
        numDoc : req.body.numDoc,
        email : req.body.email,
        email2 : req.body.email2,
        telefono : req.body.telefono,
        telefono2 : req.body.telefono2,
        tipoGarantia : req.body.tipoGarantia,
        garante: req.body.garante

        }

    // const getInqui:any = await query("select * from INQUILINOS where TIPO_DOC=? AND NUMERO_DOCUMENTO=?" ,[inq.tipoDoc, inq.numDoc])


    const updateInqui:any = await connection.query("UPDATE INQUILINOS SET NOMBRE=?, APELLIDO=?, TIPO_DOC=?, NUMERO_DOCUMENTO=?, EMAIL=?, EMAIL2=?, TELEFONO=?, TELEFONO2=?, TIPO_DE_GARANTIA=?, GARANTE=? WHERE ID_INQUILINO =?", [inq.nombre, inq.apellido, inq.tipoDoc, inq.numDoc, inq.email, inq.email2, inq.telefono, inq.telefono2,inq.tipoGarantia, inq.garante, inq.ID_INQUILINO] );
    
    await connection.query("commit");

        res.json(
            {estado: "success",
            mensaje: "El inquilino fue actualizado"
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

inquilinosRoutes.get('/listarOneInq', verificarToken, async (req:any, res:Response)=>{

  try {
    const inq = {
      ID_INQUILINO : req.query.ID_INQUILINO,
     }
    const getInq:any = await query("select * from INQUILINOS WHERE ID_INQUILINO =?",[inq.ID_INQUILINO])
    
           res.json(
            
            getInq[0]
        );    
}
catch(error){  
  res.json({
            estado:"error",
            data:error, 
            });
  }
})
inquilinosRoutes.get('/listarInquilinos', verificarToken, async (req:any, res:Response)=>{

  try {
 
    const getInq:any = await query("select * from INQUILINOS",[])
 
           res.json(
            
            getInq
        );    
}
catch(error){  
  res.json({
            estado:"error",
            data:error, 
            });
            }
})








//SUBIR IMAGEN A INQUILINO
inquilinosRoutes.put("/upload/", verificarToken, async (req: any, res: Response) => {

  try {
    const inq = {
      ID_INQUILINO : req.query.ID_INQUILINO
     }
    const getInq:any = await query("select * from INQUILINOS WHERE ID_INQUILINO =?",[inq.ID_INQUILINO]);
    
           res.json({
            
            data: getInq[0]
           });    

           if (req.files) {
             let arrayImagen: any = Object.values(req.files);
            //  console.log(arrayNuevo);
             if (Array.isArray(arrayImagen[0])) {
              arrayImagen[0].forEach(async (imagen: any) => {
                            let nuevaImagen: any = imagen;
                            const imag: IfileUpload = nuevaImagen;
              
                            console.log(imag, "imagen");
                            await fileSystem.guardarImagenTemporal(inq.ID_INQUILINO, imag);
                        });
                     
                        
              }
             else {
              let nuevaImagen: any = arrayImagen[0];
              const imag: IfileUpload = nuevaImagen;
              
              await fileSystem.guardarImagenTemporal(inq.ID_INQUILINO, imag);
              console.log(imag);
            }
        const imagenes: Array<string> = await fileSystem.imagenesDeTempHaciaPost(inq.ID_INQUILINO);
      // console.log(imagenes);
      

      imagenes.forEach(async item => {
        // console.log("este es el item", item);
        await connection.query("start transaction");
          const insertar = await query("UPDATE INQUILINOS SET DNI_FOTO=? WHERE ID_INQUILINO =?", [item, inq.ID_INQUILINO]);
          
          console.log(insertar)
          await connection.query("commit");
         

      })   
      res.json({
        estado: 'success',
        data: arrayImagen
    });
     }
  else {
          return res.status(400).json({
              estado: 'error',
              mensaje: 'No se subió el archivo'
          })
        }
       
        
}
catch(error){  
  res.json({
            estado:"error",
            data:error, 
            });
  }



})

//OBTENER IMAGEN 
inquilinosRoutes.get('/upload/', verificarToken, async (req: any, res: Response) => {

  const inq = req.query.ID_INQUILINO
  

const images:any = await query("SELECT DNI_FOTO FROM INQUILINOS WHERE ID_INQUILINO =?", [inq.ID_INQUILINO]);
console.log(images)
    res.json({
        estado: "success",
        data: images
    })
    const imagen = fileSystem.getFotoUrl(inq.ID_INQUILINO, images[0]);
    res.sendFile(imagen);
  })


export default inquilinosRoutes;