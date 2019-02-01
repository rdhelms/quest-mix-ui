import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../types/user.types';

@Injectable({
    providedIn: 'root',
})
export class SessionService {

    constructor(
        private http: HttpClient,
    ) { }

    loadUserFromSession() {
        return this.http.get<IUser>(`${environment.questMixApiUrl}/sessions`, {
            withCredentials: true,
        });
    }

    createSession(userInfo: Partial<IUser>) {
        return this.http.post<IUser>(`${environment.questMixApiUrl}/sessions`, userInfo, {
            withCredentials: true,
        });
    }

    deleteSession() {
        return this.http.delete(`${environment.questMixApiUrl}/sessions`, {
            withCredentials: true,
        });
    }
}
