import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { GameEditorComponent } from './components/game-editor/game-editor.component';
import { BackgroundEditorComponent } from './components/background-editor/background-editor.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForegroundEditorComponent } from './components/foreground-editor/foreground-editor.component';
import { WorldEditorComponent } from './components/world-editor/world-editor.component';
import { ObjectEditorComponent } from './components/object-editor/object-editor.component';
import { EntityEditorComponent } from './components/entity-editor/entity-editor.component';
import { AvatarEditorComponent } from './components/avatar-editor/avatar-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    GameScreenComponent,
    GameEditorComponent,
    BackgroundEditorComponent,
    HomeComponent,
    ProfileComponent,
    ForegroundEditorComponent,
    WorldEditorComponent,
    ObjectEditorComponent,
    EntityEditorComponent,
    AvatarEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
