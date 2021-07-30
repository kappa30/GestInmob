import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPropietarioComponent } from './crear-propietario.component';

const routes: Routes = [
  {path:"", component:CrearPropietarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearPropietarioRoutingModule { }
