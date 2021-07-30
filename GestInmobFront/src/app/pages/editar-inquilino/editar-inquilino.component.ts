import { Component, OnInit } from '@angular/core';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Iinquilino from 'src/app/interfaces/Iinquilino';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-editar-inquilino',
  templateUrl: './editar-inquilino.component.html',
  styleUrls: ['./editar-inquilino.component.css']
})
export class EditarInquilinoComponent implements OnInit {

  inquilino:Iinquilino[]=[];
  formUpdateI = this.fb.group({
    ID_INQUILINO:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    nombre:["",[Validators.required]],//Validators.pattern(/^([A-Z]|[a-z])+$/)
    apellido:["", Validators.required],
    tipoDoc:["", Validators.required],
    numDoc:["", [Validators.required, Validators.maxLength(8), Validators.minLength(6)]],
    email:["", [Validators.required]],//Validators.email
    email2:["", [Validators.email]],
    telefono:["", Validators.required],
    telefono2:["", Validators.required],
    tipoGarantia:["", Validators.required],
    garante:["", Validators.required],
    dniFoto:["", ]
  })

  constructor(public fb:FormBuilder, public InquilinosService:InquilinosService, private route:ActivatedRoute, public router: Router, private FileUploadService:FileUploadService) { }  
    
  ngOnInit():void {  
    this.route.params.subscribe((data) => {
      console.log(data)
      if (data.ID_INQUILINO) {        
        this.InquilinosService.getOneInquilinos(data.ID_INQUILINO).subscribe((resp)=>{
          console.log(resp)
          this.formUpdateI.get('ID_INQUILINO')?.setValue(resp.ID_INQUILINO);          
          this.formUpdateI.get('nombre')?.setValue(resp.NOMBRE);
          this.formUpdateI.get('apellido')?.setValue(resp.APELLIDO);
          this.formUpdateI.get('tipoDoc')?.setValue(resp.TIPO_DOC);
          this.formUpdateI.get('numDoc')?.setValue(resp.NUMERO_DOCUMENTO);
          this.formUpdateI.get('email')?.setValue(resp.EMAIL);
          this.formUpdateI.get('email2')?.setValue(resp.EMAIL2);
          this.formUpdateI.get('telefono')?.setValue(resp.TELEFONO);
          this.formUpdateI.get('telefono2')?.setValue(resp.TELEFONO2);
          this.formUpdateI.get('tipoGarantia')?.setValue(resp.TIPO_DE_GARANTIA);
          this.formUpdateI.get('garante')?.setValue(resp.GARANTE)
          this.formUpdateI.get('dniFoto')?.setValue(resp.DNI_FOTO)
        })
      }
    });    
  }

  public fileName: string[] = [];
  public files: any[] = [];
  public filesFormData: any;

  public createInquilinos!: FormGroup;
 
  private validar(event: any): Boolean {
    const maxSize = 500000000;
    this.files = event.target.files
    this.fileName = [];
    for (let file of this.files) {
      this.fileName.push(file.name);
    }

    if (this.files.length < 0) {
      console.log("No se adjunto ningun archivo")
      this.files = [];
      this.fileName = [];
      return false
    }

    if (this.files[0].size > maxSize) {
      console.log("ha superado el tamaño permitido")
      this.files = [];
      this.fileName = [];
      return false
    }

    if (this.files[0].type != 'image/png' && this.files[0].type != 'image/jpg' && this.files[0].type != 'image/jpeg') {
      console.log("El formato no es el permitido")
      this.files = [];
      this.fileName = [];
      return false
    }

    return true

  }

  onFileChange(event: any) {
    const validacion = this.validar(event)

    if (validacion) {
      this.filesFormData = new FormData();

      for (let i = 0; i < this.files.length; i++) {
        this.filesFormData.append('image', this.files[i], this.fileName[i]);
      }
    }

  }

  actualizar(){
    this.route.params.subscribe((data) => {
      console.log(data)
      if (data.ID_INQUILINO) {        
        this.InquilinosService.getOneInquilinos(data.ID_INQUILINO).subscribe((resp)=>{
          if(this.formUpdateI.valid){
            this.InquilinosService.updateInquilinos(resp.ID_INQUILINO,this.formUpdateI.value).subscribe(respuetaBackend=>{
              console.log(this.formUpdateI.value)
              
            })
          }
        })
      }
    })    
  }
  navegar(){
    // if(this.formCrearPropietario.valid){
    this.router.navigate(['/listarInquilinos'])}
}
// this.FileUploadService.sendFile(this.filesFormData, resp.data,).subscribe(resp => {
//   console.log(resp)
// })
// }
// else{
// console.log(resp)
// }