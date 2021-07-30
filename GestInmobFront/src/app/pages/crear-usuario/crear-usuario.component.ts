import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { LoginService } from 'src/app/services/login.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, public fb:FormBuilder, private UsuariosService:UsuariosService, private LoginService:LoginService) { }

  hide = true;

  formCrearUsuario= this.fb.group({
    nombreUsuario:["",[Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
    password:["", [Validators.required, Validators.maxLength(10), Validators.minLength(4)]],
    email:["", [Validators.required,Validators.email]],
    telefono:["", [Validators.required, Validators.pattern(/^(15|11|\+5411|\+5415|5415|5411)?[2-9]\d{7}$/)]],
    // estado:["",[Validators.required]]

  })

  CrearUsuario(){
    
    if(this.formCrearUsuario.valid){
      

      
      this.UsuariosService.CrearUsuario(this.formCrearUsuario.value).subscribe(resp=>{
        
        // if(resp.estado =="succes"){
          
          
        
          
        // }
        //   else{
        //     console.log(resp)
        //     console.log("estado auth", this.authService.authState)
        //     alert(resp.mensaje)
        //   }
     
    })
  }
    else{
      console.log("formulario invalido bro")
    }
  }
  navegar(){
  
    this.router.navigate(['/login'])}
  

  

ngOnInit(): void {
}

}