import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CerchioPage } from './cerchio.page';

const routes: Routes = [
  {
    path: '',
    component: CerchioPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CerchioPageRoutingModule {}
