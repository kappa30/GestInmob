import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';
import { Observable } from 'rxjs';
import Ibarrio from '../interfaces/Ibarrios';


@Injectable({
  providedIn: 'root'
})
export class BarriosService {

  constructor(private http:HttpClient) { }

  rutaApi:string = "http://localhost:3000" 


  
  CrearBarrio(dataForm:{}){
    return this.http.post<IrepBackend>(`${this.rutaApi}/mantenimiento/createBarrio`, dataForm,{})
  } 

getBarrio():Observable<Ibarrio[]>{
    
    return this.http.get<Ibarrio[]>(`${this.rutaApi}/mantenimiento/listarBarrios`)
    
}
deleteBarrio(id_barrio:number){
    
  return this.http.delete<IrepBackend>(`${this.rutaApi}/mantenimiento/deleteBarrio?ID_BARRIO=${id_barrio}`)
}

updateBarrio(id_barrio:number,dataForm:{}){
  return this.http.put(`${this.rutaApi}/mantenimiento/updateBarrio?ID_BARRIO=${id_barrio}`,dataForm,{})
}

getOneBarrio(id_barrio:number):Observable<Ibarrio>{
    
  return this.http.get<Ibarrio>(`${this.rutaApi}/mantenimiento/listarOneBarrio?ID_BARRIO=${id_barrio}`)

}
}