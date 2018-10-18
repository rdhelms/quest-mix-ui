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
export class SessionService {

  constructor(
      private http: HttpClient
  ) { }

  createSession(userInfo: IUserInfo) {
      return this.http.post(`${environment.questMixApiUrl}/sessions`, userInfo);
  }
}
