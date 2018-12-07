import { IGameOptions } from '../types/game.types';
import { World } from './world';

export class Game {

    canvas: CanvasRenderingContext2D;
    animationRequest?: number;
    startTime: number = Date.now();
    world: World;

    constructor(options: IGameOptions) {
        this.canvas = options.canvas;
        this.world = options.world;
    }

    start() {
        this.animationRequest = window.requestAnimationFrame(() => {
            this.run();
        });
    }

    update() {
        if (this.world) {
            this.world.update();
        }
    }

    draw() {
        this.canvas.clearRect(0, 0, 600, 600);
        if (this.world) {
            this.world.drawScene(this.canvas);
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
