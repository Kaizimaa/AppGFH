import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormLainnyaPageRoutingModule } from './form-lainnya-routing.module';

import { FormLainnyaPage } from './form-lainnya.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormLainnyaPageRoutingModule
  ],
  declarations: [FormLainnyaPage]
})
export class FormLainnyaPageModule {}
