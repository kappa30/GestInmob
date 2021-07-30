import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearBarriosComponent } from './crear-barrios.component';

const routes: Routes = [
  {path:"", component:CrearBarriosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearBarriosRoutingModule { }
