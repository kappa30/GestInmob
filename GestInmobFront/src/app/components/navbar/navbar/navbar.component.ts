import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ambiente:string = environment.ambiente

  navegar(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/usuarios'])
  }
  }
  navegar1(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/administraciones'])
  }
  }
  navegar2(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/propiedades'])
  }
  }
  navegar3(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/inquilinos'])
  }
  }
  navegar4(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/propietarios'])
  }
  }
  navegar5(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/mantenimiento'])
  }
  }
  navegar6(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/paginaInicio'])
  }
  }

  logout(){
    this.authService.logoaut()
    this.router.navigate(['/'])
  }

 


  ngOnInit(): void {
  }

}
