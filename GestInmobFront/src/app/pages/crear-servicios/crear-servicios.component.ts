import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ServiciosService } from 'src/app/services/servicios.service';
import { LoginService } from 'src/app/services/login.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-crear-servicios',
  templateUrl: './crear-servicios.component.html',
  styleUrls: ['./crear-servicios.component.css']
})
export class CrearServiciosComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, public fb:FormBuilder, private ServiciosService:ServiciosService, private LoginService:LoginService) { }



  formCrearServicio= this.fb.group({
    nombre_servicio:["",[Validators.required]],
    empresa:["",[Validators.required]]
  })

  CrearServicio(){
    
    if(this.formCrearServicio.valid){      
      this.ServiciosService.CrearServicio(this.formCrearServicio.value).subscribe(resp=>{
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
    
    this.router.navigate(['/listarServicios'])}
 

  

ngOnInit(): void {
}

}