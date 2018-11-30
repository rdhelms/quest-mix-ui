import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Game } from '../../classes/game';
import { WorldService } from '../../services/world.service';
import { GameService } from '../../services/game.service';
import { World } from '../../classes/world';
import { Player } from 'src/app/classes/player';

@Component({
    selector: 'game-screen',
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
            // If we're resuming a game that was already in progress
            const loadedGame = await this.gameService.getGame();
            if (loadedGame && loadedGame.world) {
                const currentScene = loadedGame.world.scenes.find((scene) => scene.id === loadedGame.world.player.sceneId);
                if (!currentScene) {
                    throw new Error(`No scene found in world ${loadedGame.world.name}`);
                }
                this.game = new Game({
                    canvas: ctx,
                    world: new World({
                        ...loadedGame.world
                    }),
                    player: new Player({
                        ...loadedGame.player,
                        currentScene
                    })
                });
            } else {
                // If we're starting a new game in an existing world
                const loadedWorld = await this.worldService.getWorld();
                if (loadedWorld) {
                    const currentScene = loadedWorld.scenes.find((scene) => scene.id === loadedWorld.player.sceneId);
                    if (!currentScene) {
                        throw new Error(`No scene found in world ${loadedWorld.name}`);
                    }
                    this.game = new Game({
                        canvas: ctx,
                        world: new World({
                            ...loadedWorld
                        }),
                        player: new Player({
                            ...loadedWorld.player,
                            currentScene
                        })
                    });
                } else {
                    // If we're starting a new game without a world specified, use a default world
                    const worldData = await this.worldService.getWorldById(3).toPromise();
                    const world = new World(worldData);
                    const currentScene = world.scenes.find((scene) => scene.id === world.player.sceneId);
                    if (!currentScene) {
                        throw new Error(`No scene found in world ${world.name}`);
                    }
                    this.game = new Game({
                        canvas: ctx,
                        world,
                        player: new Player({
                            ...world.player,
                            currentScene
                        })
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
        if (game) {
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
