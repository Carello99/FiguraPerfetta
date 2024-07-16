import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cerchio',
        loadChildren: () => import('../cerchio/cerchio.module').then(m => m.CerchioPageModule)
      },
      {
        path: 'triangolo',
        loadChildren: () => import('../triangolo/triangolo.module').then(m => m.TriangoloPageModule)
      },
      {
        path: 'quadrato',
        loadChildren: () => import('../quadrato/quadrato.module').then(m => m.QuadratoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/cerchio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/cerchio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
