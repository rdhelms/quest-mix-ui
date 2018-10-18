import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface IUserInfo {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    getUsers() {
        return this.http.get(`${environment.questMixApiUrl}/users`);
    }

}
