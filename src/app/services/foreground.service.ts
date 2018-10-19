import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAsset } from '../types/asset.types';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ForegroundService {

    constructor(
        private http: HttpClient
    ) { }

    getForegrounds() {
        return this.http.get<IAsset[]>(`${environment.questMixApiUrl}/foregrounds`);
    }

    getForegroundById(id: number) {
        return this.http.get<IAsset>(`${environment.questMixApiUrl}/foregrounds/${id}`);
    }

    createForeground(newForeground: Partial<IAsset>) {
        return this.http.post<IAsset>(`${environment.questMixApiUrl}/foregrounds`, newForeground);
    }

    updateForeground(foreground: IAsset) {
        return this.http.patch<IAsset>(`${environment.questMixApiUrl}/foregrounds/${foreground.id}`, foreground);
    }

    deleteForeground(id: number) {
        return this.http.delete(`${environment.questMixApiUrl}/foregrounds/${id}`);
    }
}
