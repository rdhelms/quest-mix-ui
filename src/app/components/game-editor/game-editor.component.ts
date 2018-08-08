import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { World } from '../../classes/world';
import { WorldService } from '../../services/world.service';
import { Scene } from '../../classes/scene';

const pixelSize = 4;

@Component({
    selector: 'app-game-editor',
    templateUrl: './game-editor.component.html',
    styleUrls: ['./game-editor.component.css']
})
export class GameEditorComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() currentlyEditing: any = {
        type: 'background',
        info: {
            id: 0
        }
    };

    @ViewChild('gameEditorCanvas')
    canvasRef?: ElementRef;
    canvas?: HTMLCanvasElement;
    canvasSize: number = 600;
    pixelSize: number = pixelSize;
    animationRequest?: number;
    mousePos: {
        x?: number;
        y?: number;
    } = {};
    world?: World;
    currentSceneId: number = 0;
    currentScene?: Scene;

    constructor(
        private worldService: WorldService
    ) { }

    async ngOnInit() {
        const loadedWorld = await this.worldService.getWorld();
        if (loadedWorld) {
            this.world = new World({
                scenes: loadedWorld.scenes
            });
        } else {
            this.world = new World();
        }
        this.currentScene = this.world.scenes.find((scene) => scene.id === this.currentSceneId);
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef && this.canvasRef.nativeElement;
        this.animationRequest = window.requestAnimationFrame(() => {
            this.drawEditor();
        });
    }

    ngOnDestroy() {
        if (this.animationRequest) {
            window.cancelAnimationFrame(this.animationRequest);
        }
        this.save();
    }

    drawEditor() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.drawObjects();
                this.animationRequest = window.requestAnimationFrame(() => {
                    this.drawEditor();
                });
            }
        }
    }

    drawObjects() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx && this.currentScene) {
                ctx.beginPath();
                this.currentScene.objects.forEach((object) => {
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

    drawGrid() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                for (let i = 0; i < canvas.width; i += this.pixelSize) {
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, canvas.height);
                }
                for (let j = 0; j < canvas.height; j += this.pixelSize) {
                    ctx.moveTo(0, j);
                    ctx.lineTo(canvas.width, j);
                }
                ctx.strokeStyle = 'rgb(255,255,255)';
                ctx.stroke();
            }
        }
    }

    handleMouseMove(evt: MouseEvent) {
        const canvas = this.canvas;
        if (canvas) {
            const rawMouseX = Math.floor(evt.offsetX * (canvas.width / canvas.clientWidth));
            const rawMouseY = Math.floor(evt.offsetY * (canvas.height / canvas.clientHeight));
            this.mousePos.x = Math.floor(rawMouseX / this.pixelSize) * this.pixelSize;
            this.mousePos.y = Math.floor(rawMouseY / this.pixelSize) * this.pixelSize;
        }
    }

    handleMouseDown(evt: MouseEvent) {
        // Will be interacting with the current scene somehow
    }

    handleMouseUp() {
        // Complete some action
    }

    handleMouseLeave() {
        // Should clear everything possible to avoid side effects of mouse re-entry
    }

    clear() {
        const confirm = window.confirm('Are you sure you want to clear this scene?');
        if (!confirm) return;
        if (this.currentScene) {
            this.currentScene.objects = [];
            // Reset anything else about the scene here
        }
    }

    save(evt?: MouseEvent) {
        if (this.world) {
            this.worldService.saveWorld(this.world).then(() => {
                if (evt) {
                    alert('Saved!');
                }
            });
        }
    }

}
