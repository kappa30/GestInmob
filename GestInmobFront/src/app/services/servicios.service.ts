import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';
import { Observable } from 'rxjs';
import Iservicio from '../interfaces/Iservicios';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http:HttpClient) { }

  rutaApi:string = "http://localhost:3000" 


  
  CrearServicio(dataForm:{}){
    return this.http.post<IrepBackend>(`${this.rutaApi}/mantenimiento/createServicio`, dataForm,{})
  } 

getServicio():Observable<Iservicio[]>{
    
    return this.http.get<Iservicio[]>(`${this.rutaApi}/mantenimiento/listarservicio`)
    
}
deleteServicio(id_servicio:number){
    
  return this.http.delete<IrepBackend>(`${this.rutaApi}/mantenimiento/borrarServicio?ID_SERVICIO=${id_servicio}`)
}

updateServicio(id_servicio:number,dataForm:{}){
  return this.http.put(`${this.rutaApi}/mantenimiento/updateServicio?ID_SERVICIO=${id_servicio}`,dataForm,{})
}

getOneServicio(id_servicio:number):Observable<Iservicio>{
    
  return this.http.get<Iservicio>(`${this.rutaApi}/mantenimiento/listarOneServicio?ID_SERVICIO=${id_servicio}`)

}
}
