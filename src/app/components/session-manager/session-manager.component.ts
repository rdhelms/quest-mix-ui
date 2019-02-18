import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from '../../types/user.types';

@Component({
    selector: 'session-manager',
    templateUrl: './session-manager.component.html',
    styleUrls: ['./session-manager.component.css'],
})
export class SessionManagerComponent implements OnInit {
    loading = false;
    registering = false;
    signingIn = false;
    signedIn = false;
    invalidSignIn = false;
    username?: string;
    password?: string;
    email?: string;

    @Output() newView = new EventEmitter<'home' | 'profile' | 'player' | 'editor'>();
    @Output() loggedInUser = new EventEmitter<IUser>();
    @Output() loggedOut = new EventEmitter();

    constructor(
        private sessionService: SessionService,
        public userService: UserService,
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
                password: this.password,
            }).subscribe((data) => {
                this.signingIn = false;
                this.signedIn = true;
                this.username = undefined;
                this.password = undefined;
                this.userService.currentUser = data;
                this.loggedInUser.emit(data);
            });
        } else {
            this.invalidSignIn = true;
        }
    }

    async signOut() {
        this.signedIn = false;
        this.userService.currentUser = undefined;
        try {
            await this.sessionService.deleteSession().toPromise();
        } catch (err) {
            console.log(err);
        }
        this.newView.emit('home');
        this.loggedOut.emit();
    }

    registerClicked() {
        this.registering = true;
    }

    closeRegistration() {
        this.registering = false;
    }

    submitRegistration() {
        this.loading = true;
        if (this.username && this.password && this.email) {
            this.userService.createUser({
                username: this.username,
                password: this.password,
                emails: [this.email],
            }).subscribe((data) => {
                this.registering = false;
                this.signedIn = true;
                this.username = undefined;
                this.password = undefined;
                this.email = undefined;
                this.userService.currentUser = data;
            });
        } else {
            this.invalidSignIn = true;
        }
    }

}
