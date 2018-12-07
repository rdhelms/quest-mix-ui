import { IPosition, IPlayerSize, IPlayerOptions, TDirection } from '../types/player.types';

export class Player {
    pos: IPosition;
    nextPos?: IPosition;
    direction: TDirection;
    speed: number;
    size: IPlayerSize;
    color: string;

    constructor(options: IPlayerOptions) {
        this.pos = options.pos;
        this.direction = options.direction;
        this.speed = options.speed;
        this.size = options.size;
        this.color = options.color;
    }

    turn(dir: TDirection) {
        this.direction = dir;
    }

    update() {
        if (this.speed === 0) { return; }

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
        this.nextPos = newPos;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
    }
}
