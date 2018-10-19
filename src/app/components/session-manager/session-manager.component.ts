import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-session-manager',
    templateUrl: './session-manager.component.html',
    styleUrls: ['./session-manager.component.css']
})
export class SessionManagerComponent implements OnInit {
    loading: boolean = false;
    signingIn: boolean = false;
    signedIn = false;
    invalidSignIn: boolean = false;
    username?: string;
    password?: string;

    @Output() newView = new EventEmitter<'home' | 'profile' | 'player' | 'editor'>();

    constructor(
        private sessionService: SessionService,
        private userService: UserService
    ) { }

    ngOnInit() {
    }

    signInClicked() {
        this.signingIn = true;
    }

    closeSignIn() {
        this.signingIn = false;
    }

    submitSignIn() {
        this.loading = true;
        if (this.username && this.password) {
            this.sessionService.createSession({
                username: this.username,
                password: this.password
            }).subscribe((data) => {
                this.signingIn = false;
                this.signedIn = true;
                this.username = undefined;
                this.password = undefined;
                this.userService.currentUser = data;
            });
        } else {
            this.invalidSignIn = true;
        }
    }

    signOut() {
        this.signedIn = false;
        this.userService.currentUser = undefined;
        this.newView.emit('home');
    }

}
