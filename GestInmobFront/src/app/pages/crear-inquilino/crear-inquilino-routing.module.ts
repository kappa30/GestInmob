import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearInquilinoComponent } from './crear-inquilino.component';

const routes: Routes = [
  {path:"", component:CrearInquilinoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearInquilinoRoutingModule { }
