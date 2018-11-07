import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, Input } from '@angular/core';
import { TAssetType } from '../types/asset.types';
import { SessionManagerComponent } from './session-manager/session-manager.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({selector: 'app-home', template: ''})
class HomeStubComponent {}

@Component({selector: 'app-profile', template: ''})
class ProfileStubComponent {}

@Component({selector: 'app-game-screen', template: ''})
class GameScreenStubComponent {}

@Component({selector: 'app-world-editor', template: ''})
class WorldEditorStubComponent {}

@Component({selector: 'app-asset-editor', template: ''})
class AssetEditorStubComponent {
  @Input() canvasSize!: number;
  @Input() assetType!: TAssetType;
  @Input() assetId?: number;
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeStubComponent,
        ProfileStubComponent,
        GameScreenStubComponent,
        WorldEditorStubComponent,
        AssetEditorStubComponent,
        SessionManagerComponent
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
