import { Component, OnInit } from '@angular/core';
import { PropietariosService } from 'src/app/services/propietarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ListarPropietariosComponent } from '../listar-propietarios/listar-propietarios.component';
import Ipropietario from 'src/app/interfaces/Ipropietarios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-propietario',
  templateUrl: './editar-propietario.component.html',
  styleUrls: ['./editar-propietario.component.css']
})
export class EditarPropietarioComponent implements OnInit {

  propietario:Ipropietario[]=[];
  formUpdateP = this.fb.group({
    ID_PROPIETARIO:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    nombre:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    apellido:["", Validators.required],
    tipoDoc:["", Validators.required],
    numDoc:["", [Validators.required, Validators.maxLength(8), Validators.minLength(6)]],
    email:["", [Validators.required]],//Validators.email
    email2:["", [Validators.required]],//Validators.email
    // telefono:["", Validators.pattern(/^(15|11|\+5411|\+5415|5415|5411)?[2-9]\d{7}$/)],
    // telefono2:["", Validators.pattern(/^(15|11|\+5411|\+5415|5415|5411)?[2-9]\d{7}$/)]
    telefono:["", Validators.required],
    telefono2:["", Validators.required]
  })

  constructor(public fb:FormBuilder, public PropietariosService:PropietariosService, private route:ActivatedRoute, public router: Router) { }  
    
  ngOnInit():void {  
    this.route.params.subscribe((data) => {
      console.log(data)
      if (data.ID_PROPIETARIO) {        
        this.PropietariosService.getOnePropietarios(data.ID_PROPIETARIO).subscribe((resp)=>{
          console.log(resp)
          this.formUpdateP.get('ID_PROPIETARIO')?.setValue(resp.ID_PROPIETARIO);          
          this.formUpdateP.get('nombre')?.setValue(resp.NOMBRE);
          this.formUpdateP.get('apellido')?.setValue(resp.APELLIDO);
          this.formUpdateP.get('tipoDoc')?.setValue(resp.TIPO_DOC);
          this.formUpdateP.get('numDoc')?.setValue(resp.NUMERO_DOCUMENTO);
          this.formUpdateP.get('email')?.setValue(resp.EMAIL);
          this.formUpdateP.get('email2')?.setValue(resp.EMAIL2);
          this.formUpdateP.get('telefono')?.setValue(resp.TELEFONO);
          this.formUpdateP.get('telefono2')?.setValue(resp.TELEFONO2)
        })
      }
    });    
  }
  actualizar(){
    this.route.params.subscribe((data) => {
      console.log(data)
      if (data.ID_PROPIETARIO) {        
        this.PropietariosService.getOnePropietarios(data.ID_PROPIETARIO).subscribe((resp)=>{
          if(this.formUpdateP.valid){
            this.PropietariosService.updatePropietario(resp.ID_PROPIETARIO,this.formUpdateP.value).subscribe(respuetaBackend=>{
              console.log(this.formUpdateP.value)
            })
          }
        })
      }
    })    
  }
  navegar(){
    // if(this.formCrearPropietario.valid){
    this.router.navigate(['/listarPropietarios'])}
}


  

 

