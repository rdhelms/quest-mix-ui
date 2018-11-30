import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScreenComponent } from './game-screen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameScreenComponent', () => {
  let component: GameScreenComponent;
  let fixture: ComponentFixture<GameScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ GameScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
