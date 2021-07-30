import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquilinosComponent } from './inquilinos.component';

const routes: Routes = [
  {path:"", component:InquilinosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquilinosRoutingModule { }
