import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAsset } from '../types/asset.types';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EntityService {

    constructor(
        private http: HttpClient
    ) { }

    getEntities() {
        return this.http.get<IAsset[]>(`${environment.questMixApiUrl}/entities`);
    }

    getEntityById(id: number) {
        return this.http.get<IAsset>(`${environment.questMixApiUrl}/entities/${id}`);
    }

    createEntity(newEntity: Partial<IAsset>) {
        return this.http.post<IAsset>(`${environment.questMixApiUrl}/entities`, newEntity);
    }

    updateEntity(entity: IAsset) {
        return this.http.patch<IAsset>(`${environment.questMixApiUrl}/entities/${entity.id}`, entity);
    }

    deleteEntity(id: number) {
        return this.http.delete(`${environment.questMixApiUrl}/entities/${id}`);
    }
}
