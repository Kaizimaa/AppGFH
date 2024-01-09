import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TambahDataPage } from './tambah-data.page';

describe('TambahDataPage', () => {
  let component: TambahDataPage;
  let fixture: ComponentFixture<TambahDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TambahDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
