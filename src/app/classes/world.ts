import { Scene } from './scene';
import { IWorldOptions } from '../types/world.types';
import { TDirection } from '../types/player.types';
import { Player } from './player';

export class World {
    name: string;
    player: Player;
    scenes: Scene[];

    constructor(
        options: IWorldOptions
    ) {
        this.name = options.name;
        this.player = options.player;
        this.scenes = options.scenes;
    }

    drawScene(ctx: CanvasRenderingContext2D, sceneId: number) {
        const currentScene = this.scenes.find((scene) => scene.id === sceneId);
        if (currentScene) {
            currentScene.objects.forEach((object) => {
                ctx.fillStyle = object.color;
                ctx.fillRect(
                    object.pos.x,
                    object.pos.y,
                    object.size.width,
                    object.size.height
                );
            });
        }
    }
}
