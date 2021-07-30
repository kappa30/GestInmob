import {Router, Response, Request} from 'express';
import {Token} from '../class/token';
import { verificarToken } from '../middlewares/authentication';
import jwt from 'jsonwebtoken';
import connection from '../bin/conectionMySql';
import { json } from 'body-parser';
import query from '../utils/promesas'
import bcrypt from 'bcrypt';
import emailClass from '../class/email';




const userSQLRoutes = Router();


userSQLRoutes.get('/pruebaSQL', (req:Request, res:Response)=>{

    res.json({
                estado: "success",
                mensaje: "pruebaok"
             })    
});

//Este funciona OK!!!!
userSQLRoutes.post('/createUser', async (req:any, res:Response)=>{

    try{
        const user ={
                    
            nombreUsuario: req.body.nombreUsuario,
            password : bcrypt.hashSync(req.body.password,10),
            email : req.body.email,
            telefono : req.body.telefono,
            estado : req.body.estado,
                    }
                    //console.log(req)
        

        await connection.query("start transaction");

        const insertUsuario:any = await query("INSERT INTO USUARIOS(NOMBRE_USUARIO, PASSWORD, EMAIL_USUARIO, TELEFONO, ESTADO)VALUES(?,?,?,?,?)",[user.nombreUsuario, user.password, user.email, user.telefono, user.estado]);
        
        await connection.query("commit");
        
        const usuarioInsertado =await query("select * from usuarios where ID_USUARIO=?",[insertUsuario.insertId]);
        console.log(usuarioInsertado)

        

        res.json(
            {estado: "success",
            mensaje: usuarioInsertado
            });

        const emailEnvio = new emailClass()
        const envio = await emailEnvio.enviarEmail(user.email, "Alta usuario Gestion Inmobiliaria", "Tu usuario fue creado con exito con los siguientes datos: " + " usuario: "+ user.nombreUsuario +  " Contraseña: " + req.body.password);
        console.log(emailEnvio.enviarEmail)
        
    }
    catch(error){
                const rollback = await connection.query("rollback");
                res.json({
                          estado:"error",
                          data:error,
                          mensaje: "No se pudo crear usuario" ,
                          rollabck:rollback});
                }
        
})

//GET para obtener usuario
userSQLRoutes.get('/listarOneUser', verificarToken, async (req,res)=>{

    try{
        const user = 
        {
            ID_USUARIO : req.query.ID_USUARIO
        }    
    //console.log(req)
    const obtenerUsuario:any = await query("select * from usuarios where ID_USUARIO=?" ,[user.ID_USUARIO]) 
        if (obtenerUsuario>=0){
            return res.json({
                estado: "succes",
                mensaje: "usuario no encontrado en base de datos"
            })
        }
        res.json(
        obtenerUsuario[0]
        

           )
          
    }
    catch(error){
                 console.log(error);
    }
})


//LOGIN
userSQLRoutes.post('/login', async (req: Request, res: Response) => {
    console.log(req.body)

     
    try {

        const user = {
            email: req.body.email,
            password: req.body.password,
        }

         

        //let hasPass = await bcrypt.hash(user.password, 10);

        if (user.email && user.password) {
            

            //console.log(user.password)

             connection.query('SELECT * FROM USUARIOS where EMAIL_USUARIO = ?',[user.email], async (error:any, result:any) => {
                console.log(result)
               if (await result.length == 0 ||(!bcrypt.compareSync(user.password, result[0].PASSWORD ))) {
                    
                    res.json({
                        estado: "success",
                        mensaje: "Usuario o contraseña incorrectos",

                    })
                }
                else {

                    const TokenJwt = Token.getToken({
                        id: result[0].ID_USUARIO,
                        nombre: result[0].NOMBRE_USUARIO,
                        email: result[0].EMAIL_USUARIO,
                        estado: result[0].ESTADO,
                    });

                    res.json({
                        estado: "success",
                        mensaje: "usuario encontrado",
                        data: result,
                        token: TokenJwt


                    })

                }
                //res.end();
        });

     } else {

            res.send('El campo email o clave esta vacio');
            res.end();
        }
    
    } catch (error) {
        await query("rollback", []);
        res.json({
            estado: "error y rollback",
            data: error
        });
    }
});

//UPDATE
userSQLRoutes.put('/updateUsuario', verificarToken, async (req:any, res:Response)=>{
  
    try {

    const user = {
        ID_USUARIO: req.query.ID_USUARIO,
        nombreUsuario : req.body.nombreUsuario,
        password : bcrypt.hashSync(req.body.password,10),
        email : req.body.email,
        telefono : req.body.telefono
    }

    // const obtenerUsuario:any = await query("select * from usuarios where nombre_usuario=?" ,[user.nombre])

    const updateUsuario:any = await connection.query(`UPDATE USUARIOS SET NOMBRE_USUARIO='${user.nombreUsuario}', PASSWORD='${user.password}', EMAIL_USUARIO='${user.email}', TELEFONO='${user.telefono}' WHERE ID_USUARIO =${user.ID_USUARIO}`);
    await connection.query("commit");
    const usuarioActual:any = await query("select * from usuarios where nombre_usuario=?" ,[user.nombreUsuario])
        res.json(
            {estado: "success",
            mensaje: "usuario actualizado con exito",
            data: usuarioActual[0]
        });
    
}
catch(error){
             console.log(error);
}
})

//DELETE
userSQLRoutes.delete('/eliminarUsuario', verificarToken, async (req:any, res:Response)=>{
  
    try {

    const user = {        
        nombre : req.body.nombre_usuario
    }

    const obtenerUsuario:any = await query("select ID_USUARIO from USUARIOS where nombre_usuario=?" ,[user.nombre])
    //console.log(obtenerUsuario[0].ID_USUARIO)

    const deleteUsuario:any = await connection.query(`DELETE FROM USUARIOS WHERE ID_USUARIO =${obtenerUsuario[0].ID_USUARIO}`);
    await connection.query("commit");

        res.json(
            {estado: "success",
            mensaje: "El usuario " + user.nombre + " fue eliminado"
        });
    
}
catch(error){
             console.log(error);
}
})


export default userSQLRoutes;