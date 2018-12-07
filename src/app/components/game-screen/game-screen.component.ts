import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Game } from '../../classes/game';
import { WorldService } from '../../services/world.service';
import { GameService } from '../../services/game.service';
import { World } from '../../classes/world';

@Component({
    selector: 'game-screen',
    templateUrl: './game-screen.component.html',
    styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements AfterViewInit, OnDestroy {

    @ViewChild('gameScreenCanvas')
    canvasRef?: ElementRef;

    game?: Game;

    constructor(
        private gameService: GameService,
        private worldService: WorldService
    ) { }

    async ngAfterViewInit() {
        const canvas: HTMLCanvasElement = this.canvasRef && this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            const loadedGame = await this.gameService.getGame();
            // If we're resuming a game that was already in progress
            if (loadedGame && loadedGame.world) {
                const world = new World(loadedGame.world);
                this.game = new Game({
                    canvas: ctx,
                    world
                });
            } else {
                // If we're starting a new game in an existing world
                const loadedWorld = await this.worldService.getWorld();
                if (loadedWorld) {
                    const world = new World(loadedWorld);
                    this.game = new Game({
                        canvas: ctx,
                        world
                    });
                } else {
                    // If we're starting a new game without a world specified, use a default world
                    const worldData = await this.worldService.getWorldById('default').toPromise();
                    const world = new World(worldData);
                    this.game = new Game({
                        canvas: ctx,
                        world
                    });
                }
            }
            this.gameService.currentGame = this.game;
            this.game.start();
        }
    }

    ngOnDestroy() {
        if (this.game) {
            this.game.quit();
        }
    }

    movePlayer(dir: 'left' | 'right' | 'up' | 'down') {
        const game = this.game;
        if (game && game.world) {
            const player = game.world.player;
            if (!('turn' in player)) {
                return;
            }
            if (player.direction === dir) {
                player.speed = player.speed ? 0 : game.world.settings.speed;
            } else {
                player.turn(dir);
                player.speed = game.world.settings.speed;
            }
        }
    }

    handleKeyUp(evt: KeyboardEvent) {
        switch (evt.key) {
            case 'ArrowRight':
                this.movePlayer('right');
                break;
            case 'ArrowLeft':
                this.movePlayer('left');
                break;
            case 'ArrowUp':
                this.movePlayer('up');
                break;
            case 'ArrowDown':
                this.movePlayer('down');
                break;
        }
    }

}
