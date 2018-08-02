import { Injectable } from '@angular/core';
import { Game } from '../classes/game';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    currentGame?: Game;

    constructor() { }

    async saveGame(game: Game) {
        localStorage.setItem('game', JSON.stringify(game));
    }

    async getGame() {
        const loadedGameString = localStorage.getItem('game');
        if (!loadedGameString) {
            return null;
        } else {
            return JSON.parse(loadedGameString) as Game;
        }
    }
}
