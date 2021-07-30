import nodemailer from 'nodemailer';
import path from 'path'

export default class email {

    host:string = "smtp.gmail.com"
    port:number = 587
    secure:boolean = false
    tsl:boolean = false
    auth = {
        user: "gestinmob2021@gmail.com",
        pass: "29849414"
    }
    constructor(){

    }
    // private consultarDatos(){
    //    const datosEmail = await query("select host, post, secure, lts, user,pass from cuentas_correo ")
    //    return datosEmail //[{host: smtp.gmail.com, port: 587}]
    // }

    enviarEmail(cuentaCorreoDestion:string, asunto:string="Alta usuario Gestion Inmobiliaria", cuerpoEmail:string ="Tu usuario fue creado con exito con los siguientes datos", html:string = ""){

        return new Promise((resolve,reject)=>{
            const transporter = nodemailer.createTransport({
                host: this.host,
                port: this.port,
                secure: this.secure,
                auth:{
                    user: this.auth.user,
                    pass: this.auth.pass
                },
                tls:{
                    rejectUnauthorized: this.tsl
                }
            })
    
            const mailOptions = {
                from: this.auth.user,
                to: cuentaCorreoDestion,
                subject: asunto,
                text: cuerpoEmail,
                html: html,
                attachments:[
                    {
                        path: path.resolve(__dirname, '../assets', 'isabel brex.png')
                    }
                ]
            }
    
            nodemailer.createTestAccount((error)=>{
                transporter.sendMail(mailOptions,(error, info)=>{
                    if(error){
                        reject(error)
                    }
                    else{
                        return resolve(info)
                        console.log(info)
                    }
                })
            })
        })

    }
}