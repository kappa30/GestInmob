import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import { LoginService } from 'src/app/services/login.service';
import Iinquilino from 'src/app/interfaces/Iinquilino';

@Component({
  selector: 'app-listar-inquilinos',
  templateUrl: './listar-inquilinos.component.html',
  styleUrls: ['./listar-inquilinos.component.css']
})
export class ListarInquilinosComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, public fb:FormBuilder, private InquilinosService:InquilinosService, private LoginService:LoginService) {}

  inquilino: Iinquilino[] = [];  
  
  
  navegar(){
     this.router.navigate(['/inquilinos'])}
  
  borrar(ID_INQUILINO:number){  
    this.InquilinosService.deleteInquilinos(ID_INQUILINO).subscribe(resp=>{
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
  

  
  
    
    ngOnInit(): void {    
      
      this.InquilinosService.getInquilinos().subscribe(res=>{
        this.inquilino = res
        console.log(res)
           })    
      }  
      
    }
  
  
