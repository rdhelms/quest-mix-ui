import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zztjs';
  view = 'editor';

  changeView(newView: 'player' | 'editor') {
    this.view = newView;
  }
}
