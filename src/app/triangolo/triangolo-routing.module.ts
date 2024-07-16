import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriangoloPage } from './triangolo.page';

const routes: Routes = [
  {
    path: '',
    component: TriangoloPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TriangoloPageRoutingModule {}
