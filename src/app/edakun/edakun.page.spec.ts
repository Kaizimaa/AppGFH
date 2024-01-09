import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdakunPage } from './edakun.page';

describe('EdakunPage', () => {
  let component: EdakunPage;
  let fixture: ComponentFixture<EdakunPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EdakunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
