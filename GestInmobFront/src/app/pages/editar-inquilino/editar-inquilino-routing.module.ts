import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarInquilinoComponent } from './editar-inquilino.component';

const routes: Routes = [
  {path:"", component:EditarInquilinoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarInquilinoRoutingModule { }
