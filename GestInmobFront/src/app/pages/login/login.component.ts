import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {  

  constructor(public fb: FormBuilder, private loginService:LoginService, private authService: AuthService, public router: Router) {
    
   }

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  formLogin = this.fb.group({
    email:["", [Validators.required, Validators.email]],
    password:["", Validators.required]
  });

  hacerLogin(){
    if(this.formLogin.valid){
      
      this.loginService.login(this.formLogin.value).subscribe(resp=>{
        console.log(resp.data)
        
        if(resp.mensaje =="usuario encontrado"){
          localStorage.setItem("token", resp.token);
          localStorage.setItem("ID_USUARIO", resp.data[0].ID_USUARIO.toString());
        
        
          this.authService.authenticate()
          this.router.navigate(['/paginaInicio'])
          
        }
        else{
          console.log(resp)
          console.log("estado auth", this.authService.authState)
          alert(resp.mensaje)
        }
      })
    }
    else{
      console.log("formulario invalido")
      alert("No ha completado los datos del formulario")
    
    }
  }

  ngOnInit(): void {
   
  }

  

}
