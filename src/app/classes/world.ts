import { Scene } from './scene';
import { IWorldOptions, IWorldSettings } from '../types/world.types';
import { Player } from './player';
import { IPosition, IPlayerState } from '../types/player.types';
import { ISceneState } from '../types/scene.types';

export class World {
    id: number;
    name: string;
    player: Player | IPlayerState;
    settings: IWorldSettings;
    scenes: ISceneState[];
    currentSceneId: number;

    tick = 0;
    startTime = Date.now();
    currentScene?: Scene;

    constructor(
        options: IWorldOptions
    ) {
        this.id = options.id;
        this.name = options.name;
        this.player = new Player(options.player);
        this.settings = options.settings;
        this.scenes = options.scenes;
        this.currentSceneId = options.currentSceneId;

        this.currentScene = this.scenes.find(scene => scene.id === this.currentSceneId);
    }

    update() {
        if (!this.player || !('update' in this.player)) {
            return;
        }
        this.player.update();
        const nextPos = this.player.nextPos;
        if (nextPos
            && nextPos.x >= 0 && (nextPos.x + this.player.size.width) <= 600
            && nextPos.y >= 0 && (nextPos.y + this.player.size.height) <= 600
            && !this.checkPlayerCollisions(nextPos)
        ) {
            this.player.pos = nextPos;
        } else {
            this.player.speed = 0;
        }

        this.tick++;

        if (this.tick > 10) {
            this.tick = 0;
        }
    }

    checkPlayerCollisions(newPos: IPosition) {
        if (this.currentScene) {
            const sceneObjects = this.currentScene.objects;
            const objectCollisions = sceneObjects.filter((sceneObj) => {
                return (
                    newPos.x < sceneObj.pos.x + sceneObj.size.width &&
                    newPos.x + this.player.size.width > sceneObj.pos.x &&
                    newPos.y < sceneObj.pos.y + sceneObj.size.height &&
                    newPos.y + this.player.size.height > sceneObj.pos.y
                );
            });
            return objectCollisions.length > 0;
        }
    }

    drawScene(ctx: CanvasRenderingContext2D) {
        if (this.currentScene) {
            // NOTE: Whether an Object or Entity is in the Background or Foreground is determined by position

            // Draw Background

            // Draw Background Objects
            this.currentScene.objects.forEach((object) => {
                ctx.fillStyle = object.color;
                ctx.fillRect(
                    object.pos.x,
                    object.pos.y,
                    object.size.width,
                    object.size.height
                );
            });

            // Draw Background Entities

            // Draw Player
            if (this.player && 'draw' in this.player) {
                this.player.draw(ctx);
            }

            // Draw Foreground Objects

            // Draw Foreground Entities

            // Draw Foreground
        }
    }
}
