import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef, Input } from '@angular/core';
import { IPixel, TFrame } from '../../types/editor.types';
import { AvatarService } from '../../services/avatar.service';

@Component({
    selector: 'app-avatar-editor',
    templateUrl: './avatar-editor.component.html',
    styleUrls: ['./avatar-editor.component.css']
})
export class AvatarEditorComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() canvasSize!: number;
    @Input() avatarId?: number;

    @ViewChild('avatarEditorCanvas') canvasRef?: ElementRef;
    @ViewChild('avatarPreviewCanvas') previewRef?: ElementRef;

    canvas?: HTMLCanvasElement;
    preview?: HTMLCanvasElement;
    pixelSize: number = 4;
    animationRequest?: number;
    previewRequest?: number;
    mousePos: {
        x?: number;
        y?: number;
    } = {};
    brushSize: number = 10;
    brushColor = '#FFFFFF';
    paintingInterval?: number;
    erasing: boolean = false;
    name: string = '';
    frames: TFrame[] = Array(4).fill(null).map(() => []);
    currentFrame: TFrame = this.frames[0];
    currentPreviewFrame: TFrame = this.frames[0];
    animationCounter: number = 0;

    constructor(
        private avatarService: AvatarService
    ) { }

    async ngOnInit() {
        // if (this.avatarId !== undefined) {
            const loadedAvatar = await this.avatarService.getAvatar(/*this.avatarId*/);
            if (loadedAvatar) {
                this.name = loadedAvatar.name || '';
                this.frames = loadedAvatar.frames;
            }
        // }
        this.currentFrame = this.frames[0];
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef && this.canvasRef.nativeElement;
        this.preview = this.previewRef && this.previewRef.nativeElement;
        this.animationRequest = window.requestAnimationFrame(() => {
            this.drawEditor();
        });
        this.previewRequest = window.requestAnimationFrame(() => {
            this.drawPreview();
        });
    }

    ngOnDestroy() {
        if (this.clearPaintingInterval) {
            this.clearPaintingInterval();
        }
        if (this.animationRequest) {
            window.cancelAnimationFrame(this.animationRequest);
        }
        if (this.previewRequest) {
            window.cancelAnimationFrame(this.previewRequest);
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
                this.drawPixels();
                this.drawBrush();
                this.animationRequest = window.requestAnimationFrame(() => {
                    this.drawEditor();
                });
            }
        }
    }

    drawPreview() {
        const preview = this.preview;
        if (preview) {
            const ctx = preview.getContext('2d');
            if (ctx && this.currentPreviewFrame instanceof Array) {
                ctx.clearRect(0, 0, preview.width, preview.height);
                this.currentPreviewFrame.forEach((pixelRow) => {
                    pixelRow instanceof Array && pixelRow.forEach((pixel) => {
                        if (pixel) {
                            ctx.fillStyle = pixel.color;
                            ctx.fillRect(
                                pixel.pos.x,
                                pixel.pos.y,
                                pixel.size,
                                pixel.size
                            );
                        }
                    });
                });
                if (this.animationCounter > 10) {
                    this.animationCounter = 0;
                    const currentPreviewFrameIndex = this.frames.indexOf(this.currentPreviewFrame);
                    if (currentPreviewFrameIndex < this.frames.length - 1) {
                        this.currentPreviewFrame = this.frames[currentPreviewFrameIndex + 1];
                    } else {
                        this.currentPreviewFrame = this.frames[0];
                    }
                }
                this.animationCounter++;
                this.previewRequest = window.requestAnimationFrame(() => {
                    this.drawPreview();
                });
            }
        }
    }

    drawPixels() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx && this.currentFrame instanceof Array) {
                ctx.beginPath();
                this.currentFrame.forEach((pixelRow) => {
                    pixelRow instanceof Array && pixelRow.forEach((pixel) => {
                        if (pixel) {
                            ctx.fillStyle = pixel.color;
                            ctx.fillRect(
                                pixel.pos.x,
                                pixel.pos.y,
                                pixel.size,
                                pixel.size
                            );
                        }
                    });
                });
            }
        }
    }

    drawBrush() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx && this.mousePos.x !== undefined && this.mousePos.y !== undefined) {
                ctx.beginPath();
                ctx.save();
                ctx.fillStyle = this.brushColor;
                ctx.globalAlpha = 0.8;
                const scaleFactor = this.brushSize * this.pixelSize;
                for (let i = this.mousePos.x - scaleFactor; i <= this.mousePos.x + scaleFactor; i += this.pixelSize) {
                    for (let j = this.mousePos.y - scaleFactor; j <= this.mousePos.y + scaleFactor; j += this.pixelSize) {
                        ctx.fillRect(i, j, this.pixelSize, this.pixelSize);
                    }
                }
                ctx.restore();
                ctx.strokeStyle = '#CCCCCC';
                ctx.strokeRect(
                    this.mousePos.x - scaleFactor,
                    this.mousePos.y - scaleFactor,
                    (scaleFactor) * 2 + this.pixelSize,
                    (scaleFactor) * 2 + this.pixelSize
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
        this.paintingInterval = window.setInterval(() => {
            if (this.mousePos.x !== undefined && this.mousePos.y !== undefined) {
                const scaleFactor = this.brushSize * this.pixelSize;
                for (let i = this.mousePos.x - scaleFactor; i <= this.mousePos.x + scaleFactor; i += this.pixelSize) {
                    for (let j = this.mousePos.y - scaleFactor; j <= this.mousePos.y + scaleFactor; j += this.pixelSize) {
                        if (this.canvas && (i < 0 || j < 0 || i > this.canvas.width || j > this.canvas.height)) {
                            continue;
                        }
                        if (this.erasing) {
                            this.deletePixel(i, j);
                        } else {
                            const newPixel = {
                                pos: {
                                    x: i,
                                    y: j
                                },
                                size: this.pixelSize,
                                color: this.brushColor
                            }
                            this.addPixel(newPixel);
                        }
                    }
                }
            }
        }, 10);
    }

    deletePixel(x: number, y: number) {
        const row = this.currentFrame[x];
        if (row instanceof Array) {
            delete row[y];
        }
    }

    addPixel(newPixel: IPixel) {
        const row = this.currentFrame[newPixel.pos.x];
        // If the row does not yet exist, create it with the new pixel
        // If the row does exist, update the pixel in that row
        if (!row) {
            const newRow: IPixel[] = [];
            newRow[newPixel.pos.y] = newPixel;
            this.currentFrame[newPixel.pos.x] = newRow;
        } else {
            row[newPixel.pos.y] = newPixel;
        }
    }

    handleMouseUp() {
        this.clearPaintingInterval();
    }

    handleMouseLeave() {
        this.mousePos = {
            x: undefined,
            y: undefined
        };
        this.clearPaintingInterval();
    }

    clearPaintingInterval() {
        if (this.paintingInterval) {
            window.clearInterval(this.paintingInterval);
        }
    }

    clear() {
        const confirm = window.confirm('Are you sure you want to clear this scene?');
        if (!confirm) return;
        if (this.currentFrame) {
            this.currentFrame = [];
        }
    }

    save(evt?: MouseEvent) {
        if (this.currentFrame) {
            const avatar = {
                name: this.name,
                frames: this.frames
            };
            this.avatarService.saveAvatar(avatar).then(() => {
                // Checking for the event ensures that the alert is only shown after the button is clicked
                // as opposed to when this method is called as a background save
                if (evt) {
                    alert('Saved!');
                }
            });
        }
    }

    prevFrame() {
        const currentIndex = this.frames.indexOf(this.currentFrame);
        if (currentIndex > 0) {
            this.currentFrame = this.frames[currentIndex - 1];
        }
    }

    nextFrame() {
        const currentIndex = this.frames.indexOf(this.currentFrame);
        if (currentIndex < this.frames.length - 1) {
            this.currentFrame = this.frames[currentIndex + 1];
        }
    }

    copyFrame() {
        this.avatarService.copyFrame(this.currentFrame);
    }

    pasteFrame() {
        const frameToPaste = this.avatarService.pasteFrame();
        if (frameToPaste) {
            const currentIndex = this.frames.indexOf(this.currentFrame);
            this.frames[currentIndex] = frameToPaste;
            this.currentFrame = this.frames[currentIndex];
        }
    }
}
