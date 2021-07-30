import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';
import Ipropietario from '../interfaces/Ipropietarios'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietariosService {

  constructor(private http:HttpClient) { }

  rutaApi:string = "http://localhost:3000" 


  
  CrearPropietario(dataForm:{}){
    return this.http.post<IrepBackend>(`${this.rutaApi}/propietarios/createPropietario`, dataForm,{})
  } 

 getPropietarios():Observable<Ipropietario[]>{
    
    return this.http.get<Ipropietario[]>(`${this.rutaApi}/propietarios/listarPropietarios`)
    
}
deletePropietarios(id_propietario:number){
    
  return this.http.delete<IrepBackend>(`${this.rutaApi}/propietarios/borrarPropietario?ID_PROPIETARIO=${id_propietario}`)
}

updatePropietario(id_propietario:number,dataForm:{}){
  return this.http.put(`${this.rutaApi}/propietarios/actualizaPropietario?ID_PROPIETARIO=${id_propietario}`,dataForm,{})
}

getOnePropietarios(id_propietario:number):Observable<Ipropietario>{
    
  return this.http.get<Ipropietario>(`${this.rutaApi}/propietarios/listarOneProp?ID_PROPIETARIO=${id_propietario}`)

}
}