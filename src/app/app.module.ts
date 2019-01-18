import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WorldEditorComponent } from './components/world-editor/world-editor.component';
import { AssetEditorComponent } from './components/asset-editor/asset-editor.component';
import { AssetPreviewComponent } from './components/asset-preview/asset-preview.component';
import { SessionManagerComponent } from './components/session-manager/session-manager.component';
import { AssetsComponent } from './components/assets/assets.component';

@NgModule({
  declarations: [
    AppComponent,
    AssetEditorComponent,
    AssetPreviewComponent,
    AssetsComponent,
    GameScreenComponent,
    HomeComponent,
    SessionManagerComponent,
    UserProfileComponent,
    WorldEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
