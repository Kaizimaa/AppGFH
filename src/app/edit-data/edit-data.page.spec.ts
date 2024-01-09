import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDataPage } from './edit-data.page';

describe('EditDataPage', () => {
  let component: EditDataPage;
  let fixture: ComponentFixture<EditDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
