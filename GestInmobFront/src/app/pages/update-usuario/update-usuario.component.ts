import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import Iusuario from 'src/app/interfaces/Iusuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {

  hide = true;


  usuario: Iusuario={} as Iusuario;

    formUpdateU = this.fb.group({
    // ID_SERVICIO:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    nombreUsuario:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    password:["", [Validators.required, Validators.maxLength(10), Validators.minLength(4)]],//Validators.pattern(/^([A-Z]|[a-z])+$/) 
    email:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    telefono:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/) 
  })
  


  constructor(public fb:FormBuilder, public UsuariosService:UsuariosService, private route:ActivatedRoute, public router: Router) { }

navegar(){
   this.router.navigate(['/usuarios'])}

 
volverAlistar(){
  window.location.reload();

}


  
  ngOnInit(): void {    

   let ID_USUARIO = new Number(localStorage.getItem("ID_USUARIO"))
    
   this.UsuariosService.getOneUsuario(ID_USUARIO).subscribe((resp)=>{
     this.usuario=resp;
        this.formUpdateU.get('nombreUsuario')?.setValue(resp.NOMBRE_USUARIO);
        this.formUpdateU.get('email')?.setValue(resp.EMAIL_USUARIO);
        this.formUpdateU.get('telefono')?.setValue(resp.TELEFONO);
         })    
     
        }

 actualizar(){
    if(this.formUpdateU.valid){
            this.UsuariosService.updateUsuarios(this.usuario.ID_USUARIO,this.formUpdateU.value).subscribe(respuetaBackend=>{
          
            })
          }
  }
}
