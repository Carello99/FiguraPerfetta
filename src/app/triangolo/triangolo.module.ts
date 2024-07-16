import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TriangoloPage } from './triangolo.page';

import { TriangoloPageRoutingModule } from './triangolo-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TriangoloPageRoutingModule
  ],
  declarations: [TriangoloPage]
})
export class TriangoloPageModule {}
