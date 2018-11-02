import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    view = 'home';
    currentlyEditing?: any = {
        type: 'avatar',
        info: {
            id: 0
        }
    };

    constructor(
        public userService: UserService
    ) { }

    changeView(newView: 'home' | 'profile' | 'quests' | 'worlds' | 'assets') {
        this.view = newView;
    }

    selectedAsset(asset: any) {
        if (asset) {
            this.currentlyEditing = asset;
            this.changeView('assets');
        }
    }
}
