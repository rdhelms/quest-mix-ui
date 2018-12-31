import { IPosition, IPlayerSize, IPlayerOptions, TPlayerAction } from '../types/player.types';
import { IAsset } from '../types/asset.types';

export class Player {
    pos: IPosition;
    action: TPlayerAction;
    size: IPlayerSize;
    avatar: IAsset;

    speed = 0;
    currentFrameIndex = 0;
    nextPos?: IPosition;
    tick = 0;
    startTime = Date.now();

    constructor(options: IPlayerOptions) {
        this.pos = options.pos;
        this.action = options.action;
        this.size = options.size;
        this.avatar = options.avatar;
    }

    changeAction(action: TPlayerAction) {
        this.action = action;
    }

    isWalking() {
        return ['walkLeft', 'walkRight', 'walkUp', 'walkDown'].includes(this.action);
    }

    update() {
        const newPos = {
            x: this.pos.x,
            y: this.pos.y,
        };
        if (this.action === 'walkLeft') {
            newPos.x = this.pos.x - this.speed;
        } else if (this.action === 'walkRight') {
            newPos.x = this.pos.x + this.speed;
        } else if (this.action === 'walkUp') {
            newPos.y = this.pos.y - this.speed;
        } else if (this.action === 'walkDown') {
            newPos.y = this.pos.y + this.speed;
        }
        this.nextPos = newPos;

        this.tick++;

        if (this.tick > 10) {
            this.currentFrameIndex++;
            if (this.currentFrameIndex >= this.avatar.frames.length) {
                this.currentFrameIndex = 0;
            }
            this.tick = 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        // TODO: Get the frames for the player's current action
        this.avatar.frames[this.currentFrameIndex].forEach((pixelRow) => {
            if (pixelRow instanceof Array) {
                pixelRow.forEach((pixel) => {
                    if (pixel) {
                        ctx.fillStyle = pixel.color;
                        ctx.fillRect(
                            this.pos.x + pixel.pos.x * this.size.width / 100,
                            this.pos.y + pixel.pos.y * this.size.height / 100,
                            pixel.size * this.size.width / 50,
                            pixel.size * this.size.height / 50,
                        );
                    }
                });
            }
        });
    }
}
