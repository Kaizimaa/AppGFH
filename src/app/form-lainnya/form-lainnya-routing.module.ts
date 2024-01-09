import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormLainnyaPage } from './form-lainnya.page';

const routes: Routes = [
  {
    path: '',
    component: FormLainnyaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormLainnyaPageRoutingModule {}
