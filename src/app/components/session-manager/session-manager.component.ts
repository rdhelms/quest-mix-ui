import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

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

    constructor(
        private sessionService: SessionService
    ) { }

    ngOnInit() {
    }

    signInClicked() {
        this.signingIn = true;
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
            });
        } else {
            this.invalidSignIn = true;
        }
    }

    signOut() {
        this.signedIn = false;
    }

}
