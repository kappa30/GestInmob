import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { PropietariosService } from 'src/app/services/propietarios.service';
import { LoginService } from 'src/app/services/login.service';
import Ipropietario from 'src/app/interfaces/Ipropietarios';



@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.css']
})
export class PropietariosComponent implements OnInit {

 

constructor(private authService: AuthService, public router: Router, public fb:FormBuilder, private PropietariosService:PropietariosService, private LoginService:LoginService) {}


navegar(){
  if(this.authService.isAuthenticate()){
    console.log(this.authService.isAuthenticate)
  this.router.navigate(['/listarPropietarios'])
}
}
navegar1(){
  if(this.authService.isAuthenticate()){
    console.log(this.authService.isAuthenticate)
  this.router.navigate(['/crearPropietarios'])
}
}

  ngOnInit(): void {    



    
    }
  }

   
 


