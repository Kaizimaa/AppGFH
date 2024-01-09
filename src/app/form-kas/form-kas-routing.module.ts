import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormKasPage } from './form-kas.page';

const routes: Routes = [
  {
    path: '',
    component: FormKasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormKasPageRoutingModule {}
