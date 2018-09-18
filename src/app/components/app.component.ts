import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quest Mix';
  view = 'home';
  currentlyEditing?: any = {
      type: 'avatar',
      info: {
          id: 0
      }
  };

  changeView(newView: 'home' | 'profile' | 'player' | 'editor') {
    this.view = newView;
  }

  selectedAsset(asset: any) {
    if (asset) {
      this.currentlyEditing = asset;
      this.changeView('editor');
    }
  }
}
