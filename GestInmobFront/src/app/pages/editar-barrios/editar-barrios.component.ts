import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarriosService } from 'src/app/services/barrios.service';
import { ActivatedRoute } from '@angular/router';
import Ibarrio from 'src/app/interfaces/Ibarrios';

@Component({
  selector: 'app-editar-barrios',
  templateUrl: './editar-barrios.component.html',
  styleUrls: ['./editar-barrios.component.css']
})
export class EditarBarriosComponent implements OnInit {

  barrio:Ibarrio[]=[];
  formUpdateB = this.fb.group({
    // ID_BARRIO:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    barrio:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
  })

  constructor(public fb:FormBuilder, public BarriosService:BarriosService, private route:ActivatedRoute, public router: Router) { }  
    
  ngOnInit():void {  
    this.route.params.subscribe((data) => {
      console.log(data)
      if (data.ID_BARRIO) {        
        this.BarriosService.getOneBarrio(data.ID_BARRIO).subscribe((resp)=>{
          console.log(resp)
          // this.formUpdateB.get('ID_BARRIO')?.setValue(resp.ID_BARRIO);          
          this.formUpdateB.get('barrio')?.setValue(resp.BARRIO);
        })
      }
    });    
  }
  actualizar(){
    this.route.params.subscribe((data) => {
      console.log(data)
      if (data.ID_BARRIO) {        
        this.BarriosService.getOneBarrio(data.ID_BARRIO).subscribe((resp)=>{
          if(this.formUpdateB.valid){
            this.BarriosService.updateBarrio(resp.ID_BARRIO,this.formUpdateB.value).subscribe(respuetaBackend=>{
              console.log(this.formUpdateB.value)
            })
          }
        })
      }
    })    
  }
  navegar(){
    // if(this.formCrearPropietario.valid){
    this.router.navigate(['/listarBarrios'])}
}
