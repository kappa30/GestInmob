import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { BarriosService } from 'src/app/services/barrios.service';
import { LoginService } from 'src/app/services/login.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-crear-barrios',
  templateUrl: './crear-barrios.component.html',
  styleUrls: ['./crear-barrios.component.css']
})
export class CrearBarriosComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, public fb:FormBuilder, private BarriosService:BarriosService, private LoginService:LoginService) { }



  formCrearBarrio= this.fb.group({
    barrio:["",[Validators.required]],
  })

  CrearBarrrio(){
    
    if(this.formCrearBarrio.valid){      
      this.BarriosService.CrearBarrio(this.formCrearBarrio.value).subscribe(resp=>{
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
    
    this.router.navigate(['/listarBarrios'])}
 

  

ngOnInit(): void {
}

}

