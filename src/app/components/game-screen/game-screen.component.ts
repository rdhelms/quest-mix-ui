import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Game } from '../../classes/game';
import { WorldService } from '../../services/world.service';
import { GameService } from '../../services/game.service';
import { World } from '../../classes/world';

@Component({
    selector: 'app-game-screen',
    templateUrl: './game-screen.component.html',
    styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('gameScreenCanvas')
    canvasRef?: ElementRef;

    game?: Game;

    constructor(
        private gameService: GameService,
        private worldService: WorldService
    ) { }

    ngOnInit() {}

    async ngAfterViewInit() {
        const canvas: HTMLCanvasElement = this.canvasRef && this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            const loadedGame = await this.gameService.getGame();
            if (loadedGame && loadedGame.world) {
                this.game = new Game({
                    canvas: ctx,
                    world: new World({
                        scenes: loadedGame.world.scenes
                    })
                });
            } else {
                const loadedWorld = await this.worldService.getWorld();
                if (loadedWorld) {
                    this.game = new Game({
                        canvas: ctx,
                        world: new World({
                            scenes: loadedWorld.scenes
                        })
                    });
                } else {
                    this.game = new Game({
                        canvas: ctx,
                        world: new World()
                    });
                }
            }
            this.gameService.currentGame = this.game;
            this.game.start();
        }
    }

    ngOnDestroy() {
        this.game && this.game.quit();
    }

    movePlayer(dir: 'left' | 'right' | 'up' | 'down') {
        const game = this.game;
        if (game && game.player) {
            const player = game.player;
            if (player.direction === dir) {
                player.speed = player.speed ? 0 : game.speed;
            } else {
                player.turn(dir);
                player.speed = game.speed;
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
