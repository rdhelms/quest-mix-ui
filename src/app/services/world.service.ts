import { Injectable } from '@angular/core';
import { World } from '../classes/world';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
            return JSON.parse(loadedWorldString) as World;
        }
    }

    getWorldById(id: number) {
        return this.http.get<World>(`${environment.questMixApiUrl}/worlds/${id}`);
    }

    createWorld(options?: Partial<World>) {
        return this.http.post<World>(`${environment.questMixApiUrl}/worlds`, options);
    }
}
