import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../types/user.types';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor(
        private http: HttpClient
    ) { }

    createSession(userInfo: Partial<IUser>) {
        return this.http.post<IUser>(`${environment.questMixApiUrl}/sessions`, userInfo);
    }
}
