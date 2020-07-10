import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickEnddressPage } from './pick-enddress.page';

const routes: Routes = [
  {
    path: '',
    component: PickEnddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickEnddressPageRoutingModule {}
