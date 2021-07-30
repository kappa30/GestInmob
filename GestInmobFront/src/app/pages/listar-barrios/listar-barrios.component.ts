import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BarriosService } from 'src/app/services/barrios.service';
import { LoginService } from 'src/app/services/login.service';
import Ibarrio from 'src/app/interfaces/Ibarrios';

@Component({
  selector: 'app-listar-barrios',
  templateUrl: './listar-barrios.component.html',
  styleUrls: ['./listar-barrios.component.css']
})
export class ListarBarriosComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, private BarriosService:BarriosService, private LoginService:LoginService) {}

  barrio: Ibarrio[] = [];  
  
   
  navegar(){
     this.router.navigate(['/mantenimiento'])}

  
  
  borrar(ID_BARRIO:number){  
    this.BarriosService.deleteBarrio(ID_BARRIO).subscribe(resp=>{
      if(resp.estado =="succes"){        
            
      }
        else{
          console.log(resp)
          console.log("estado auth", this.authService.authState)
        }
        })
  }  
  crearBarrio(){
    this.router.navigate(['/crearBarrios'])
  }
  volverAlistar(){
    window.location.reload();

  }
  
    
    ngOnInit(): void {    
      
      this.BarriosService.getBarrio().subscribe(res=>{
       this.barrio= res
        console.log(res)
           })    
      }  
      
    }
  
  