import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormKasPageRoutingModule } from './form-kas-routing.module';

import { FormKasPage } from './form-kas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormKasPageRoutingModule
  ],
  declarations: [FormKasPage]
})
export class FormKasPageModule {}
