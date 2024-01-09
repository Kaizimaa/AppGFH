import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormChatPage } from './form-chat.page';

describe('FormChatPage', () => {
  let component: FormChatPage;
  let fixture: ComponentFixture<FormChatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
