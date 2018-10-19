import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAsset } from '../types/asset.types';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AvatarService {

    constructor(
        private http: HttpClient
    ) { }

    getAvatars() {
        return this.http.get<IAsset[]>(`${environment.questMixApiUrl}/avatars`);
    }

    getAvatarById(id: number) {
        return this.http.get<IAsset>(`${environment.questMixApiUrl}/avatars/${id}`);
    }

    createAvatar(newAvatar: Partial<IAsset>) {
        return this.http.post<IAsset>(`${environment.questMixApiUrl}/avatars`, newAvatar);
    }

    updateAvatar(avatar: IAsset) {
        return this.http.patch<IAsset>(`${environment.questMixApiUrl}/avatars/${avatar.id}`, avatar);
    }

    deleteAvatar(id: number) {
        return this.http.delete(`${environment.questMixApiUrl}/avatars/${id}`);
    }
}
