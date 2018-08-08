import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef, Input } from '@angular/core';
import { IPixel } from '../../types/editor.types';
import { ForegroundService } from '../../services/foreground.service';

const pixelSize = 4;

@Component({
    selector: 'app-foreground-editor',
    templateUrl: './foreground-editor.component.html',
    styleUrls: ['./foreground-editor.component.css']
})
export class ForegroundEditorComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() canvasSize!: number;
    @Input() foregroundId?: number;

    @ViewChild('foregroundEditorCanvas') canvasRef?: ElementRef;

    canvas?: HTMLCanvasElement;
    pixelSize: number = pixelSize;
    animationRequest?: number;
    mousePos: {
        x?: number;
        y?: number;
    } = {};
    brushSize: number = 10;
    brushColor = '#FFFFFF';
    paintingInterval?: number;
    erasing: boolean = false;
    name: string = '';
    pixels: IPixel[][] = [];

    constructor(
        private foregroundService: ForegroundService
    ) { }

    async ngOnInit() {
        // if (this.foregroundId !== undefined) {
            const loadedForeground = await this.foregroundService.getForeground(/*this.foregroundId*/);
            if (loadedForeground) {
                this.name = loadedForeground.name || '';
                this.pixels = loadedForeground.pixels;
            }
        // }
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef && this.canvasRef.nativeElement;
        this.animationRequest = window.requestAnimationFrame(() => {
            this.drawEditor();
        });
    }

    ngOnDestroy() {
        if (this.clearPaintingInterval) {
            this.clearPaintingInterval();
        }
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
                this.drawPixels();
                this.drawBrush();
                ctx.closePath();
                this.animationRequest = window.requestAnimationFrame(() => {
                    this.drawEditor();
                });
            }
        }
    }

    drawPixels() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx && this.pixels instanceof Array) {
                ctx.beginPath();
                this.pixels.forEach((pixelRow) => {
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
                ctx.closePath();
            }
        }
    }

    drawBrush() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx && this.mousePos.x !== undefined && this.mousePos.y !== undefined) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = this.brushColor;
                ctx.globalAlpha = 0.8;
                const scaleFactor = this.brushSize * this.pixelSize;
                for (let i = this.mousePos.x - scaleFactor; i <= this.mousePos.x + scaleFactor; i += this.pixelSize) {
                    for (let j = this.mousePos.y - scaleFactor; j <= this.mousePos.y + scaleFactor; j += this.pixelSize) {
                        ctx.fillRect(i, j, this.pixelSize, this.pixelSize);
                    }
                }
                ctx.closePath();
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
                ctx.closePath();
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
        const row = this.pixels[x];
        if (row instanceof Array) {
            delete row[y];
        }
    }

    addPixel(newPixel: IPixel) {
        const row = this.pixels[newPixel.pos.x];
        // If the row does not yet exist, create it with the new pixel
        // If the row does exist, update the pixel in that row
        if (!row) {
            const newRow: IPixel[] = [];
            newRow[newPixel.pos.y] = newPixel;
            this.pixels[newPixel.pos.x] = newRow;
        } else {
            row[newPixel.pos.y] = newPixel;
        }
    }

    handleMouseUp() {
        this.clearPaintingInterval();
    }

    handleMouseLeave() {
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
        if (this.pixels) {
            this.pixels = [];
        }
    }

    save(evt?: MouseEvent) {
        if (this.pixels) {
            const foreground = {
                name: this.name,
                pixels: this.pixels
            };
            this.foregroundService.saveForeground(foreground).then(() => {
                // Checking for the event ensures that the alert is only shown after the button is clicked
                // as opposed to when this method is called as a foreground save
                if (evt) {
                    alert('Saved!');
                }
            });
        }
    }

}
