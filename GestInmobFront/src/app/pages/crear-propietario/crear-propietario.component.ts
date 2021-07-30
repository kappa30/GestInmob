import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { PropietariosService } from 'src/app/services/propietarios.service';
import { LoginService } from 'src/app/services/login.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-crear-propietario',
  templateUrl: './crear-propietario.component.html',
  styleUrls: ['./crear-propietario.component.css']
})
export class CrearPropietarioComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, public fb:FormBuilder, private PropietariosService:PropietariosService, private LoginService:LoginService) { }



  formCrearPropietario= this.fb.group({
    nombre:["",[Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    apellido:["", Validators.required],
    tipoDoc:["", Validators.required],
    numDoc:["", [Validators.required, Validators.maxLength(8), Validators.minLength(6)]],
    email:["", [Validators.required,Validators.email]],
    email2:["", [Validators.email]],
    telefono:["", [Validators.required, Validators.pattern(/^(15|11|\+5411|\+5415|5415|5411)?[2-9]\d{7}$/)]],
    telefono2:["",[Validators.pattern(/^(15|11|\+5411|\+5415|5415|5411)?[2-9]\d{7}$/)]]

  })

  CrearPropietario(){
    
    if(this.formCrearPropietario.valid){
     
      
      this.PropietariosService.CrearPropietario(this.formCrearPropietario.value).subscribe(resp=>{
        console.log(this.LoginService.getToken)
        if(resp.estado =="succes"){
          
          
        
          
        }
          else{
            console.log(resp)
            console.log("estado auth", this.authService.authState)
          }
     
    })
  }
    else{
      console.log("formulario invalido bro")
    }
  }
  navegar(){
    
    this.router.navigate(['/propietarios'])}
  
  

ngOnInit(): void {
}

}

