import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { LoginService } from 'src/app/services/login.service';
import Iservicio from 'src/app/interfaces/Iservicios';

@Component({
  selector: 'app-listar-servicios',
  templateUrl: './listar-servicios.component.html',
  styleUrls: ['./listar-servicios.component.css']
})
export class ListarServiciosComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, private ServiciosService:ServiciosService, private LoginService:LoginService) {}

  servicio: Iservicio[] = [];  
  
   
  navegar(){
     this.router.navigate(['/mantenimiento'])}
  
  borrar(ID_SERVICIO:number){  
    this.ServiciosService.deleteServicio(ID_SERVICIO).subscribe(resp=>{
      if(resp.estado =="succes"){        
            
      }
        else{
          console.log(resp)
          console.log("estado auth", this.authService.authState)
        }
        })
  }  
  crearServicio(){
    this.router.navigate(['/crearServicio'])
  }
  volverAlistar(){
    window.location.reload();

  }
  
    
    ngOnInit(): void {    
      
      this.ServiciosService.getServicio().subscribe(res=>{
       this.servicio= res
        console.log(res)
           })    
      }  
      
    }
  
  