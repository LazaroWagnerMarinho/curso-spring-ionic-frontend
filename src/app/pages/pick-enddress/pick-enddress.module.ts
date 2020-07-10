import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickEnddressPageRoutingModule } from './pick-enddress-routing.module';

import { PickEnddressPage } from './pick-enddress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickEnddressPageRoutingModule
  ],
  declarations: [PickEnddressPage]
})
export class PickEnddressPageModule {}
