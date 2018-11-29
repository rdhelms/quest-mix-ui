import { Player } from './player';
import { IGameOptions } from '../types/game.types';
import { World } from './world';

export class Game {

    canvas: CanvasRenderingContext2D;
    animationRequest?: number;
    startTime: number = Date.now();
    speed = 1;
    player: Player;
    world: World;
    currentSceneId = 0;

    constructor(options: IGameOptions) {
        this.canvas = options.canvas;
        this.world = options.world;
        this.player = options.player;
    }

    start() {
        this.animationRequest = window.requestAnimationFrame(() => {
            this.run();
        });
    }

    update() {
        if (this.player) {
            this.player.update();
        }
    }

    draw() {
        this.canvas.clearRect(0, 0, 600, 600);
        if (this.player) {
            this.player.draw(this.canvas);
        }
        if (this.world) {
            this.world.drawScene(this.canvas, this.currentSceneId);
        }
    }

    run() {
        this.update();
        this.draw();

        this.animationRequest = window.requestAnimationFrame(() => {
            this.run();
        });
    }

    quit() {
        if (this.animationRequest) {
            window.cancelAnimationFrame(this.animationRequest);
        }
    }

}
