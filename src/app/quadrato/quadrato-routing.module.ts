import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuadratoPage } from './quadrato.page';

const routes: Routes = [
  {
    path: '',
    component: QuadratoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuadratoPageRoutingModule {}
