import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionManagerComponent } from './session-manager.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SessionManagerComponent', () => {
  let component: SessionManagerComponent;
  let fixture: ComponentFixture<SessionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
      ],
      declarations: [
        SessionManagerComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
