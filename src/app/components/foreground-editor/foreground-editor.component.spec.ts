import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForegroundEditorComponent } from './foreground-editor.component';

describe('ForegroundEditorComponent', () => {
  let component: ForegroundEditorComponent;
  let fixture: ComponentFixture<ForegroundEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForegroundEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForegroundEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
