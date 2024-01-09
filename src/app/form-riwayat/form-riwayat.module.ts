import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRiwayatPageRoutingModule } from './form-riwayat-routing.module';

import { FormRiwayatPage } from './form-riwayat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormRiwayatPageRoutingModule
  ],
  declarations: [FormRiwayatPage]
})
export class FormRiwayatPageModule {}
