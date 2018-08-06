import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { GameEditorComponent } from './components/game-editor/game-editor.component';
import { BackgroundEditorComponent } from './components/background-editor/background-editor.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    GameScreenComponent,
    GameEditorComponent,
    BackgroundEditorComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
