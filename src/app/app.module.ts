import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { GameEditorComponent } from './components/game-editor/game-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    GameScreenComponent,
    GameEditorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
