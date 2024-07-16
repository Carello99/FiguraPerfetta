import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CerchioPage } from './cerchio.page';

import { CerchioPageRoutingModule } from './cerchio-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CerchioPageRoutingModule
  ],
  declarations: [CerchioPage]
})
export class CerchioPageModule {}
