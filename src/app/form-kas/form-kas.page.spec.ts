import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormKasPage } from './form-kas.page';

describe('FormKasPage', () => {
  let component: FormKasPage;
  let fixture: ComponentFixture<FormKasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormKasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
