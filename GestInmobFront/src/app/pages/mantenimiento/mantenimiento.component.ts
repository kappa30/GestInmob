import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router) { }


  navegar(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/listarBarrios'])
  }
  }
  navegar1(){
    if(this.authService.isAuthenticate()){
      console.log(this.authService.isAuthenticate)
    this.router.navigate(['/listarServicios'])
  }
  }
  ngOnInit(): void {
  }

}
