import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdakunPage } from './edakun.page';

const routes: Routes = [
  {
    path: '',
    component: EdakunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdakunPageRoutingModule {}
