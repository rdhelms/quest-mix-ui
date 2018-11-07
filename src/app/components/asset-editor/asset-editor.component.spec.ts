import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AssetEditorComponent } from './asset-editor.component';
import { Component, Input } from '@angular/core';
import { IAsset } from '../../types/asset.types';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({selector: 'app-asset-preview', template: ''})
class AssetPreviewStubComponent {
  @Input() canvasSize!: number;
  @Input() asset?: IAsset;
}

describe('AssetEditorComponent', () => {
  let component: AssetEditorComponent;
  let fixture: ComponentFixture<AssetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        HttpClientTestingModule
       ],
      declarations: [
        AssetEditorComponent,
        AssetPreviewStubComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
