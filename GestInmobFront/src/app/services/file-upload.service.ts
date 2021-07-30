import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  sendFile(images: FormData, token: any) {
    return this.http.post(`http://localhost:3000/inquilinos/upload/`, images, { headers: new HttpHeaders().set('x-token', `${token}`) })

    //   sendFile(imagen:FormData){
    //     return this.http.post(`${this.rutaApi}/post/upload`, imagen,{})
    //   }

  }

  getFile(imgName: string) {
  }
}