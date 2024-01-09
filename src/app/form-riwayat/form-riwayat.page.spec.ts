import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRiwayatPage } from './form-riwayat.page';

describe('FormRiwayatPage', () => {
  let component: FormRiwayatPage;
  let fixture: ComponentFixture<FormRiwayatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormRiwayatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
