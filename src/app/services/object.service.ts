import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAsset } from '../types/asset.types';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ObjectService {

    constructor(
        private http: HttpClient
    ) { }

    getObjects() {
        return this.http.get<IAsset[]>(`${environment.questMixApiUrl}/objects`);
    }

    getObjectById(id: number) {
        return this.http.get<IAsset>(`${environment.questMixApiUrl}/objects/${id}`);
    }

    createObject(newObject: Partial<IAsset>) {
        return this.http.post<IAsset>(`${environment.questMixApiUrl}/objects`, newObject);
    }

    updateObject(object: IAsset) {
        return this.http.patch<IAsset>(`${environment.questMixApiUrl}/objects/${object.id}`, object);
    }

    deleteObject(id: number) {
        return this.http.delete(`${environment.questMixApiUrl}/objects/${id}`);
    }
}
