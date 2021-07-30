import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators, FormControl, FormGroup } from '@angular/forms';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-crear-inquilino',
  templateUrl: './crear-inquilino.component.html',
  styleUrls: ['./crear-inquilino.component.css']
})
export class CrearInquilinoComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, public fb:FormBuilder, private InquilinosService:InquilinosService, private LoginService:LoginService) { }


  




  //   this.fileName = event.target.file[0].name

  //   if(this.file.length < 0){
  //   console.log("No se adjunto archivo")
  //   this.fileName = "Error de validacion"
  //   return false
  // }
  //   if(this.file[0].size > maxSize){
  //     console.log("ha superado el tamaño permitido")
  //     this.fileName = "Error de validacion"
  //     return false
  //   }
  //   if (this.file[0].type != 'image/jpeg'){
  //     console.log("El formato no es el permitido")
  //     this.fileName = "Error de validacion"
  //     return false
  //   }

  //   return true
  // }

  




  formCrearInquilino= this.fb.group({
    nombre:["",[Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
    apellido:["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
    tipoDoc:["", Validators.required],
    numDoc:["", [Validators.required, Validators.maxLength(8), Validators.minLength(6)]],
    email:["", [Validators.required,Validators.email]],
    email2:["", [Validators.email]],
    telefono:["", [Validators.required, Validators.pattern(/^(15|11|\+5411|\+5415|5415|5411)?[2-9]\d{7}$/)]],
    telefono2:["",],
    tipoGarantia:["", Validators.required],
    garante:["", Validators.required],
    dniFoto:["", ],

  })

  CrearInquilino(){
    
    if(this.formCrearInquilino.valid){
      console.log(this.formCrearInquilino)
          this.InquilinosService.CrearInquilino(this.formCrearInquilino.value).subscribe(resp=>{
        
            if(resp.estado =="succes"){

                
          }

    } ) 
  }
    else{
      console.log("formulario invalido bro")
    }
  }

  
  navegar(){
  
    this.router.navigate(['/inquilinos'])}
  

  

ngOnInit(): void {
}

}




