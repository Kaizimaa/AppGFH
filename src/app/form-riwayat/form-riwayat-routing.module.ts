import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRiwayatPage } from './form-riwayat.page';

const routes: Routes = [
  {
    path: '',
    component: FormRiwayatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRiwayatPageRoutingModule {}
