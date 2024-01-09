import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormLainnyaPage } from './form-lainnya.page';

describe('FormLainnyaPage', () => {
  let component: FormLainnyaPage;
  let fixture: ComponentFixture<FormLainnyaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormLainnyaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
