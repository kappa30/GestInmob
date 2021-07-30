import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';
import Iinquilino from '../interfaces/Iinquilino';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InquilinosService {

  constructor(private http:HttpClient) { }

  rutaApi:string = "http://localhost:3000" 


  
  CrearInquilino(dataForm:{}):Observable<any>{
    return this.http.post(`${this.rutaApi}/inquilinos/createInquilino`, dataForm,{})
  } 

 getInquilinos():Observable<Iinquilino[]>{
    
    return this.http.get<Iinquilino[]>(`${this.rutaApi}/inquilinos/listarInquilinos`)
    
}
deleteInquilinos(id_inquilino:number){
    
  return this.http.delete<IrepBackend>(`${this.rutaApi}/inquilinos/borrarInquilino?ID_INQUILINO=${id_inquilino}`)
}

updateInquilinos(id_inquilino:number,dataForm:{}){
  return this.http.put(`${this.rutaApi}/inquilinos/actualizaInquilino?ID_INQUILINO=${id_inquilino}`,dataForm,{})
}

getOneInquilinos(id_inquilino:number):Observable<Iinquilino>{
    
  return this.http.get<Iinquilino>(`${this.rutaApi}/inquilinos/listarOneInq?ID_INQUILINO=${id_inquilino}`)

}
}