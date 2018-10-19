import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../types/user.types';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    currentUser?: IUser;

    constructor(
        private http: HttpClient
    ) { }

    getUsers() {
        return this.http.get(`${environment.questMixApiUrl}/users`);
    }

}
