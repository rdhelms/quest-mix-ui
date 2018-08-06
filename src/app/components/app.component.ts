import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quest Creator';
  view = 'home';

  changeView(newView: 'player' | 'editor') {
    this.view = newView;
  }
}
