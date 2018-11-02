import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef, Input } from '@angular/core';
import { IPixel, TFrame, TDrawType } from '../../types/editor.types';
import { AssetService } from '../../services/asset.service';
import { IAsset, TAssetType } from '../../types/asset.types';

@Component({
    selector: 'app-asset-editor',
    templateUrl: './asset-editor.component.html',
    styleUrls: ['./asset-editor.component.css']
})
export class AssetEditorComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() canvasSize!: number;
    @Input() assetType!: TAssetType;
    @Input() assetId?: number;

    @ViewChild('assetEditorCanvas') canvasRef?: ElementRef;

    canvas?: HTMLCanvasElement;
    pixelSize = 4;
    animationRequest?: number;
    mousePos: {
        x?: number;
        y?: number;
    } = {};
    brushSize = 10;
    brushColor = '#FFFFFF';
    paintingInterval?: number;
    drawType: TDrawType = 'brush';
    asset?: IAsset;
    numFrames?: number;
    currentFrame?: TFrame;

    constructor(
        private assetService: AssetService
    ) { }

    async ngOnInit() {
        this.assetService.currentType = this.assetType;
        let loadedAsset: IAsset | null | undefined;
        if (this.assetId !== undefined) {
            loadedAsset = await this.assetService.getAssetById(this.assetId);
        }
        if (!loadedAsset) {
            loadedAsset = await this.assetService.getCurrentAsset();
        }
        if (!loadedAsset) {
            this.asset = {
                id: Date.now(),
                name: '',
                frames: (this.assetType === 'background' || this.assetType === 'foreground') ? [[]] : Array(4).fill(null).map(() => [])
            };
        } else {
            this.asset = loadedAsset;
        }

        this.currentFrame = this.asset && this.asset.frames && this.asset.frames[0];
        this.numFrames = this.asset && this.asset.frames && this.asset.frames.length;
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

    drawPixels() {
        const canvas = this.canvas;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx && this.currentFrame instanceof Array) {
                ctx.beginPath();
                this.currentFrame.forEach((pixelRow) => {
                    if (pixelRow instanceof Array) {
                        pixelRow.forEach((pixel) => {
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
                    }
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

                // If the user has selected the color picker, draw just a pixel selector
                // Otherwise, draw the full brush
                if (this.drawType === 'colorPicker') {
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.strokeRect(
                        this.mousePos.x,
                        this.mousePos.y,
                        this.pixelSize,
                        this.pixelSize
                    );
                } else {
                    const scaleFactor = this.brushSize * this.pixelSize;
                    for (let i = this.mousePos.x - scaleFactor; i <= this.mousePos.x + scaleFactor; i += this.pixelSize) {
                        for (let j = this.mousePos.y - scaleFactor; j <= this.mousePos.y + scaleFactor; j += this.pixelSize) {
                            ctx.fillRect(i, j, this.pixelSize, this.pixelSize);
                        }
                    }
                    ctx.strokeStyle = '#CCCCCC';
                    ctx.strokeRect(
                        this.mousePos.x - scaleFactor,
                        this.mousePos.y - scaleFactor,
                        (scaleFactor) * 2 + this.pixelSize,
                        (scaleFactor) * 2 + this.pixelSize
                    );
                }

                ctx.restore();
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
                // If color-picking, then just grab the color from the currently selected pixel
                // Otherwise, continue as usual
                if (this.drawType === 'colorPicker') {
                    let currentPixel;
                    const currentRow = this.currentFrame && this.currentFrame[this.mousePos.x];
                    if (currentRow instanceof Array) {
                        currentPixel = currentRow[this.mousePos.y];
                    }
                    if (currentPixel) {
                        this.brushColor = currentPixel.color;
                    }
                } else {
                    const scaleFactor = this.brushSize * this.pixelSize;
                    for (let i = this.mousePos.x - scaleFactor; i <= this.mousePos.x + scaleFactor; i += this.pixelSize) {
                        for (let j = this.mousePos.y - scaleFactor; j <= this.mousePos.y + scaleFactor; j += this.pixelSize) {
                            if (this.canvas && (i < 0 || j < 0 || i > this.canvas.width || j > this.canvas.height)) {
                                continue;
                            }
                            if (this.drawType === 'eraser') {
                                this.deletePixel(i, j);
                            } else {
                                const newPixel = {
                                    pos: {
                                        x: i,
                                        y: j
                                    },
                                    size: this.pixelSize,
                                    color: this.brushColor
                                };
                                this.addPixel(newPixel);
                            }
                        }
                    }
                }
            }
        }, 10);
    }

    deletePixel(x: number, y: number) {
        const row = this.currentFrame && this.currentFrame[x];
        if (row instanceof Array) {
            delete row[y];
        }
    }

    addPixel(newPixel: IPixel) {
        if (!this.currentFrame) { this.currentFrame = []; }

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
        if (!confirm) { return; }
        if (this.currentFrame && this.asset) {
            const emptyFrame: TFrame = [];
            const currentFrameIndex = this.asset.frames.indexOf(this.currentFrame);
            this.asset.frames[currentFrameIndex] = emptyFrame;
            this.currentFrame = emptyFrame;
        }
    }

    save(evt?: MouseEvent) {
        if (this.currentFrame && this.asset) {
            this.assetService.saveAsset(this.asset).then(() => {
                // Checking for the event ensures that the alert is only shown after the button is clicked
                // as opposed to when this method is called as a background save
                if (evt) {
                    alert('Saved!');
                }
            });
        }
    }

    delete() {
        if (this.currentFrame && this.asset) {
            this.assetService.deleteAsset(this.asset).then(() => {
                alert('Deleted!');
            });
        }
    }

    prevFrame() {
        if (this.currentFrame && this.asset) {
            const currentIndex = this.asset.frames.indexOf(this.currentFrame);
            if (currentIndex > 0) {
                this.currentFrame = this.asset.frames[currentIndex - 1];
            }
        }
    }

    nextFrame() {
        if (this.currentFrame && this.asset) {
            const currentIndex = this.asset.frames.indexOf(this.currentFrame);
            if (currentIndex < this.asset.frames.length - 1) {
                this.currentFrame = this.asset.frames[currentIndex + 1];
            }
        }
    }

    copyFrame() {
        if (this.currentFrame) {
            this.assetService.copyFrame(this.currentFrame);
        }
    }

    pasteFrame() {
        if (this.asset && this.currentFrame) {
            const frameToPaste = this.assetService.pasteFrame();
            if (frameToPaste) {
                const currentIndex = this.asset.frames.indexOf(this.currentFrame);
                this.asset.frames[currentIndex] = frameToPaste;
                this.currentFrame = this.asset.frames[currentIndex];
            }
        }
    }

    async createAsset() {
        const newAsset = await this.assetService.createAsset(this.assetType);
        this.asset = newAsset;
        this.currentFrame = this.asset && this.asset.frames && this.asset.frames[0];
        this.numFrames = this.asset && this.asset.frames && this.asset.frames.length;
    }

    selectDrawType(type: TDrawType) {
        this.drawType = type;
    }

    async selectAssetType(type: TAssetType) {
        this.assetService.currentType = type;
        let loadedAsset: IAsset | null | undefined;
        loadedAsset = await this.assetService.getCurrentAsset();
        this.assetType = type;
        if (loadedAsset) {
            this.asset = loadedAsset;
        } else {
            this.asset = {
                id: Date.now(),
                name: '',
                frames: (this.assetType === 'background' || this.assetType === 'foreground') ? [[]] : Array(4).fill(null).map(() => [])
            };
        }
        this.currentFrame = this.asset && this.asset.frames && this.asset.frames[0];
        this.numFrames = this.asset && this.asset.frames && this.asset.frames.length;
    }
}
