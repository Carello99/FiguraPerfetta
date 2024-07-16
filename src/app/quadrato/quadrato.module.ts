import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuadratoPage } from './quadrato.page';

import { QuadratoPageRoutingModule } from './quadrato-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QuadratoPageRoutingModule
  ],
  declarations: [QuadratoPage]
})
export class QuadratoPageModule {}
