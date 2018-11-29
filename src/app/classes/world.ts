import { Scene } from './scene';
import { IWorldOptions } from '../types/world.types';
import { TDirection } from '../types/player.types';

export class World {
    name = 'No Name';
    player = {
        speed: 0,
        size: {
            width: 5,
            height: 10
        },
        color: '#FFFFFF',
        direction: 'down' as TDirection,
        sceneId: 0,
        pos: {
            x: 0,
            y: 0
        }
    };

    scenes: Scene[] = [{
        id: 0,
        objects: []
    }];

    constructor(
        options?: IWorldOptions
    ) {
        if (options) {
            this.scenes = options.scenes || this.scenes;
        }
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
