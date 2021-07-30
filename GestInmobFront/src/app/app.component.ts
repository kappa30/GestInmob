import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { LoginService } from './services/login.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})

export class AppComponent {
  title = 'claseMarVier';

  constructor(private loginService:LoginService){}

  color:boolean=false


  nombre_aplicacion:string = "App curso Martes y viernes";

  mostrar_clase:string = "propuedad1"

  nombre:string = "nombre"

  colorTitulo:string = "p1"

  nombreColor:string = ""

  cambiarClase(){
    this.mostrar_clase = "propuedad2"
  }

  cambiarColorTitulo(color:string){
    this.colorTitulo = color
  }

  productos:any=[
    {
      id_producto: 1,
      nombre_producto:"TV plana",
    },
    {
      id_producto: 2,
      nombre_producto:"Celular"
    }
  ]

  condicion_ngIf:boolean=false;

}
