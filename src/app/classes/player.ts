import { IPosition, IPlayerSize, IPlayerOptions, TDirection } from "../types/player.types";
import { Game } from "./game";
import { Scene } from "./scene";

export class Player {
    static defaults = {
        pos: {
            x: 0,
            y: 0
        } as IPosition,
        direction: 'down' as TDirection,
        speed: 0,
        size: {
            width: 5,
            height: 10
        } as IPlayerSize,
        color: '#FFFFFF'
    }

    pos: IPosition = Player.defaults.pos;
    direction: TDirection = Player.defaults.direction;
    speed: number = Player.defaults.speed;
    size: IPlayerSize = Player.defaults.size;
    color: string = Player.defaults.color;
    currentScene?: Scene;

    constructor(options?: IPlayerOptions) {
        if (options) {
            this.pos = options.pos || this.pos;
            this.direction = options.direction || this.direction;
            this.speed = options.speed || this.speed;
            this.size = options.size || this.size;
            this.color = options.color || this.color;
            this.currentScene = options.currentScene;
        }
    }

    turn(dir: TDirection) {
        this.direction = dir;
    }

    update() {
        if (this.speed === 0) return;
        
        const newPos = {
            x: this.pos.x,
            y: this.pos.y
        };
        if (this.direction === 'left') {
            newPos.x = this.pos.x - this.speed;
        } else if (this.direction === 'right') {
            newPos.x = this.pos.x + this.speed;
        } else if (this.direction === 'up') {
            newPos.y = this.pos.y - this.speed;
        } else if (this.direction === 'down') {
            newPos.y = this.pos.y + this.speed;
        }

        if (
            newPos.x >= 0 &&
            (newPos.x + this.size.width) <= 400 &&
            newPos.y >= 0 &&
            (newPos.y + this.size.height) <= 400 &&
            !this.checkCollisions(newPos)
        ) {
            this.pos = newPos;
        } else {
            this.speed = 0;
        }
    }

    checkCollisions(newPos: IPosition) {
        if (this.currentScene) {
            const sceneObjects = this.currentScene.objects;
            const collisions = sceneObjects.filter((sceneObj) => {
                return (
                    newPos.x < sceneObj.pos.x + sceneObj.size.width &&
                    newPos.x + this.size.width > sceneObj.pos.x &&
                    newPos.y < sceneObj.pos.y + sceneObj.size.height &&
                    newPos.y + this.size.height > sceneObj.pos.y
                );
            });
            if (collisions.length > 0) {
                return collisions;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
    }
}