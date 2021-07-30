import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import IrepBackend from '../interfaces/IrespBackend';
import ItipoDoc from '../interfaces/ItipoDoc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocService {

  constructor(private http:HttpClient) { }

  rutaApi:string = "http://localhost:3000" 


  

}
