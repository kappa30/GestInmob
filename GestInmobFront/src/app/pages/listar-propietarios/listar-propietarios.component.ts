import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { PropietariosService } from 'src/app/services/propietarios.service';
import { LoginService } from 'src/app/services/login.service';
import Ipropietario from 'src/app/interfaces/Ipropietarios';

@Component({
  selector: 'app-listar-propietarios',
  templateUrl: './listar-propietarios.component.html',
  styleUrls: ['./listar-propietarios.component.css']
})
export class ListarPropietariosComponent implements OnInit {

 
constructor(private authService: AuthService, public router: Router, public fb:FormBuilder, private PropietariosService:PropietariosService, private LoginService:LoginService) {}

propietario: Ipropietario[] = [];  

  //<a class="text-reset col-2" [routerLink]="['/agenda/', dto.idAtencion]">Editar</a>
navegar(){
   this.router.navigate(['/propietarios'])}

borrar(ID_PROPIETARIO:number){  
  this.PropietariosService.deletePropietarios(ID_PROPIETARIO).subscribe(resp=>{
    if(resp.estado =="succes"){        
          
    }
      else{
        console.log(resp)
        console.log("estado auth", this.authService.authState)
      }
      })
}  
volverAlistar(){
  window.location.reload();

}

// getOnePropietarios(ID_PROPIETARIO:number){
//   this.PropietariosService.getOnePropietarios(ID_PROPIETARIO).subscribe(resp=>{
    
//       console.log(resp) 
//   })
// }


  
  ngOnInit(): void {    
    
    this.PropietariosService.getPropietarios().subscribe(res=>{
      this.propietario = res
      console.log(res)
         })    
    }  
    
  }


