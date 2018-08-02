import { Injectable } from '@angular/core';
import { World } from '../classes/world';

@Injectable({
    providedIn: 'root'
})
export class WorldService {

    constructor() { }

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
}
