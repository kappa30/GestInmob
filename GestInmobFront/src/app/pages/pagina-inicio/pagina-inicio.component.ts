import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {


  constructor(public fb: FormBuilder, private loginService:LoginService, public authService: AuthService, private router: Router) {
    console.log("inicia constructor")
   }
  ambiente:string = environment.ambiente


   logaut(){
    this.authService.logoaut()
    this.router.navigate(['/'])
  }

  irLogin(){
    this.router.navigate(['/login'])
  }

   irPropietarios(){
            
       this.router.navigate(['/propietarios'])
    
        }

  ngOnInit(): void {
  }

}


