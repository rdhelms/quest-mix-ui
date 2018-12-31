import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAsset } from '../types/asset.types';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BackgroundService {

    constructor(
        private http: HttpClient,
    ) { }

    getBackgrounds() {
        return this.http.get<IAsset[]>(`${environment.questMixApiUrl}/backgrounds`);
    }

    getBackgroundById(id: number) {
        return this.http.get<IAsset>(`${environment.questMixApiUrl}/backgrounds/${id}`);
    }

    createBackground(newBackground: Partial<IAsset>) {
        return this.http.post<IAsset>(`${environment.questMixApiUrl}/backgrounds`, newBackground);
    }

    updateBackground(background: IAsset) {
        return this.http.patch<IAsset>(`${environment.questMixApiUrl}/backgrounds/${background.id}`, background);
    }

    deleteBackground(id: number) {
        return this.http.delete(`${environment.questMixApiUrl}/backgrounds/${id}`);
    }

}
