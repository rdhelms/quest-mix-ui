import { Injectable } from '@angular/core';
import { World } from '../classes/world';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IWorldState } from '../types/world.types';

@Injectable({
    providedIn: 'root'
})
export class WorldService {

    constructor(
        private http: HttpClient,
    ) { }

    async saveWorld(world: World) {
        localStorage.setItem('world', JSON.stringify(world));
    }

    async getWorld() {
        const loadedWorldString = localStorage.getItem('world');
        if (!loadedWorldString) {
            return null;
        } else {
            return JSON.parse(loadedWorldString) as IWorldState;
        }
    }

    getWorldById(id: number) {
        return this.http.get<IWorldState>(`${environment.questMixApiUrl}/worlds/${id}`);
    }

    createWorld(options?: Partial<World>) {
        return this.http.post<IWorldState>(`${environment.questMixApiUrl}/worlds`, options);
    }
}
