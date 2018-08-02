import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Player } from '../../classes/player';
import { World } from '../../classes/world';
import { WorldService } from '../../services/world.service';
import { Scene } from '../../classes/scene';

@Component({
    selector: 'app-game-editor',
    templateUrl: './game-editor.component.html',
    styleUrls: ['./game-editor.component.css']
})
export class GameEditorComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('gameEditorCanvas')
    canvasRef?: ElementRef;
    canvas?: HTMLCanvasElement;
    animationRequest?: number;
    lastClickPos: {
        x?: number;
        y?: number; 
    } = {};
    mousePos: {
        x?: number;
        y?: number;
    } = {};
    brushSize = {
        width: Player.defaults.size.width,
        height: Player.defaults.size.height
    };
    brushColor = Player.defaults.color;
    paintingInterval?: number;

    world?: World;
    currentSceneId: number = 0;

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
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.drawObjects();
                this.drawBrush();
                window.requestAnimationFrame(() => {
                    this.drawEditor();
                });
            }
        }
    }

    drawObjects() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const currentScene = this.world && this.world.scenes.find((scene) => scene.id === this.currentSceneId);
            if (ctx && currentScene) {
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

    drawBrush() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx && this.mousePos.x !== undefined && this.mousePos.y !== undefined) {
                ctx.strokeStyle = 'black';
                ctx.strokeRect(
                    this.mousePos.x,
                    this.mousePos.y,
                    this.brushSize.width,
                    this.brushSize.height
                );
                ctx.fillStyle = this.brushColor;
                ctx.fillRect(
                    this.mousePos.x,
                    this.mousePos.y,
                    this.brushSize.width,
                    this.brushSize.height
                );
            }
        }
    }

    drawGrid() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                for (let i = 0; i < canvas.width; i += this.brushSize.width) {
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, canvas.height);
                }
                for (let j = 0; j < canvas.height; j += this.brushSize.height) {
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
            this.mousePos.x = Math.floor(rawMouseX / this.brushSize.width) * this.brushSize.width;
            this.mousePos.y = Math.floor(rawMouseY / this.brushSize.height) * this.brushSize.height;
        }
    }

    handleMouseDown(evt: MouseEvent) {
        const world = this.world;
        let currentScene: Scene | undefined;
        if (this.world) {
            currentScene = this.world.scenes.find((scene) => scene.id === this.currentSceneId);
        }
        const canvas = this.canvas;
        if (world && canvas && currentScene) {
            const sceneObjects = currentScene.objects;
            this.paintingInterval = window.setInterval(() => {
                if (this.mousePos.x !== undefined && this.mousePos.y !== undefined) {
                    const newObject = {
                        pos: {
                            x: this.mousePos.x,
                            y: this.mousePos.y
                        },
                        size: {
                            width: this.brushSize.width,
                            height: this.brushSize.height
                        },
                        color: this.brushColor
                    }
                    const duplicateObject = sceneObjects.find((sceneObject) => {
                        return (
                            sceneObject.pos.x === newObject.pos.x &&
                            sceneObject.pos.y === newObject.pos.y
                        );
                    });
                    if (!duplicateObject) {
                        sceneObjects.push(newObject);
                    }
                }
            }, 10);
        }
    }

    handleMouseUp() {
        if (this.paintingInterval) {
            window.clearInterval(this.paintingInterval);
        }
    }

    clear() {
        const confirm = window.confirm('Are you sure you want to clear this scene?');
        if (!confirm) return;
        const world = this.world;
        let currentScene: Scene | undefined;
        if (this.world) {
            currentScene = this.world.scenes.find((scene) => scene.id === this.currentSceneId);
            if (currentScene) {
                currentScene.objects = [];
            }
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
