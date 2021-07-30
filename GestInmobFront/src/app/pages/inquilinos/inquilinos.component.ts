import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-inquilinos',
  templateUrl: './inquilinos.component.html',
  styleUrls: ['./inquilinos.component.css']
})
export class InquilinosComponent implements OnInit {



  constructor(private authService: AuthService, public router: Router, public fb:FormBuilder, private InquilinosService:InquilinosService, private LoginService:LoginService) {}



  navegar(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/listarInquilinos'])
  }
  }
  navegar1(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/crearInquilinos'])
  }
  }
  ngOnInit(): void {
  }

}
