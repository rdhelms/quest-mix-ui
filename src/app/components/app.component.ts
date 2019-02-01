import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { WorldService } from '../services/world.service';
import { TSelectedAssetEvent } from './home/home.component';
import { SessionService } from '../services/session.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    loading = true;
    view = 'assets';
    currentlyEditing?: any = {
        type: 'avatar',
        info: {
            id: 0,
        },
    };

    constructor(
        private worldService: WorldService,
        public userService: UserService,
        private sessionService: SessionService,
    ) { }

    async ngOnInit() {
        this.loading = true;
        try {
            const loggedInUser = await this.sessionService.loadUserFromSession().toPromise();
            this.userService.currentUser = loggedInUser;
        } catch (err) { }
        this.loading = false;
    }

    changeView(newView: 'home' | 'profile' | 'quests' | 'worlds' | 'assets') {
        this.view = newView;
    }

    selectedAsset(asset: TSelectedAssetEvent) {
        if (asset) {
            if (asset.type === 'quest' || asset.type === 'world') {
                this.worldService.setCurrentWorldId(asset.info.id);
                this.changeView('worlds');
            } else {
                this.currentlyEditing = asset;
                this.changeView('assets');
            }
        }
    }
}
