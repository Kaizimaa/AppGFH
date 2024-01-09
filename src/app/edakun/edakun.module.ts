import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdakunPageRoutingModule } from './edakun-routing.module';

import { EdakunPage } from './edakun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdakunPageRoutingModule
  ],
  declarations: [EdakunPage]
})
export class EdakunPageModule {}
