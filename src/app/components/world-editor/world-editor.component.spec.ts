import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldEditorComponent } from './world-editor.component';

describe('WorldEditorComponent', () => {
  let component: WorldEditorComponent;
  let fixture: ComponentFixture<WorldEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
