import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { WorldService } from '../../services/world.service';
import { World } from '../../classes/world';

@Component({
    selector: 'game-screen',
    templateUrl: './game-screen.component.html',
    styleUrls: ['./game-screen.component.css'],
})
export class GameScreenComponent implements AfterViewInit, OnDestroy {
    canvasContext?: CanvasRenderingContext2D;
    world?: World;
    animationRequest?: number;

    @ViewChild('gameScreenCanvas')
    canvasRef?: ElementRef;

    constructor(
        private worldService: WorldService,
    ) { }

    async ngAfterViewInit() {
        const canvas: HTMLCanvasElement = this.canvasRef && this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            this.canvasContext = ctx;
            // If we're loading an existing world
            const loadedWorld = await this.worldService.getWorld();
            if (loadedWorld) {
                this.world = new World(loadedWorld);
            } else {
                // If we don't have a world specified, use a default world
                const worldData = await this.worldService.getWorldById(1).toPromise();
                this.world = new World(worldData);
            }
            this.start();
        }
    }

    ngOnDestroy() {
        this.quit();
    }

    start() {
        this.animationRequest = window.requestAnimationFrame(() => {
            this.run();
        });
    }

    run() {
        if (this.world && this.canvasContext) {
            this.world.update();
            this.canvasContext.clearRect(0, 0, 600, 600);
            this.world.drawScene(this.canvasContext);
        } else {
            this.quit();
            return;
        }

        this.animationRequest = window.requestAnimationFrame(() => {
            this.run();
        });
    }

    quit() {
        if (this.animationRequest) {
            window.cancelAnimationFrame(this.animationRequest);
        }
    }

    pressedArrow(arrow: 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown') {
        const world = this.world;
        if (world) {
            const player = world.player;
            if ('isWalking' in player && player.isWalking()) {
                const newAction =
                    arrow === 'ArrowLeft' ? 'walkLeft'
                    : arrow === 'ArrowRight' ? 'walkRight'
                    : arrow === 'ArrowUp' ? 'walkUp'
                    : 'walkDown';
                if (player.action === newAction) {
                    player.speed = player.speed ? 0 : world.settings.speed;
                } else {
                    player.changeAction(newAction);
                    player.speed = world.settings.speed;
                }
            }
        }
    }

    handleKeyUp(evt: KeyboardEvent) {
        switch (evt.key) {
            case 'ArrowRight':
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowDown':
                this.pressedArrow(evt.key as 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown');
                break;
        }
    }

}
