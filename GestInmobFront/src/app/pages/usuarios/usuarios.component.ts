import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Iusuario from 'src/app/interfaces/Iusuario';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import IrepBackend from 'src/app/interfaces/IrespBackend';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  hide = true;


  usuario: Iusuario={} as Iusuario;


  formU = this.fb.group({
    // ID_SERVICIO:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    nombreUsuario:["", [Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    email:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    telefono:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/) 
  })

  constructor(public fb:FormBuilder, public UsuariosService:UsuariosService, private route:ActivatedRoute, public router: Router) { }


navegar(){
   this.router.navigate(['/paginaInicio'])}

 
volverAlistar(){
  window.location.reload();

}


  
  ngOnInit(): void {
  
    
   let ID_USUARIO = new Number(localStorage.getItem("ID_USUARIO"))
   
    
   this.UsuariosService.getOneUsuario(ID_USUARIO).subscribe(res=>{
    this.usuario=res
     
      
               this.formU.get('nombreUsuario')?.setValue([res.NOMBRE_USUARIO]);
              this.formU.get('email')?.setValue(res.EMAIL_USUARIO);
              this.formU.get('telefono')?.setValue(res.TELEFONO);
         })  
    
  }
}

