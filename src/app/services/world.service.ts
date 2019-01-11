import { Injectable } from '@angular/core';
import { World } from '../classes/world';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IWorldState } from '../types/world.types';

@Injectable({
    providedIn: 'root',
})
export class WorldService {
    currentWorldId = 1;

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

    setCurrentWorldId(id: number) {
        this.currentWorldId = id;
    }

    getAllWorlds(page = 0) {
        return this.http.get<IWorldState[]>(`${environment.questMixApiUrl}/worlds`, {
            params: {
                page: String(page),
            },
        });
    }

    getWorldById(id: number) {
        return this.http.get<IWorldState>(`${environment.questMixApiUrl}/worlds/${id}`);
    }

    createWorld(options?: Partial<World>) {
        return this.http.post<IWorldState>(`${environment.questMixApiUrl}/worlds`, options);
    }

    updateWorld(options: IWorldState) {
        return this.http.patch<IWorldState>(`${environment.questMixApiUrl}/worlds/${options.id}`, options);
    }
}
