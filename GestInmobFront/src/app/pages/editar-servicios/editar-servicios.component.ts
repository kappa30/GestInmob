import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ActivatedRoute } from '@angular/router';
import Iservicio from 'src/app/interfaces/Iservicios';

@Component({
  selector: 'app-editar-servicios',
  templateUrl: './editar-servicios.component.html',
  styleUrls: ['./editar-servicios.component.css']
})
export class EditarServiciosComponent implements OnInit {
  servicio:Iservicio[]=[];
  formUpdateS = this.fb.group({
    // ID_SERVICIO:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    nombre_servicio:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    empresa:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/) 
  })

  constructor(public fb:FormBuilder, public ServiciosService:ServiciosService, private route:ActivatedRoute, public router: Router) { }  
    
  ngOnInit():void {  
    this.route.params.subscribe((data) => {
      console.log(data)
      if (data.ID_SERVICIO) {        
        this.ServiciosService.getOneServicio(data.ID_SERVICIO).subscribe((resp)=>{
          console.log(resp)
          // this.formUpdateB.get('ID_SERVICIO')?.setValue(resp.ID_SERVICIO);          
          this.formUpdateS.get('nombre_servicio')?.setValue(resp.NOMBRE_SERVICIO);
          this.formUpdateS.get('empresa')?.setValue(resp.EMPRESA);
        })
      }
    });    
  }
  actualizar(){
    this.route.params.subscribe((data) => {
      console.log(data)
      if (data.ID_SERVICIO) {        
        this.ServiciosService.getOneServicio(data.ID_SERVICIO).subscribe((resp)=>{
          if(this.formUpdateS.valid){
            this.ServiciosService.updateServicio(resp.ID_SERVICIO,this.formUpdateS.value).subscribe(respuetaBackend=>{
              console.log(this.formUpdateS.value)
            })
          }
        })
      }
    })    
  }
  navegar(){
    
    this.router.navigate(['/listarServicios'])}
}
