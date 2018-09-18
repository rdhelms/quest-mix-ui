import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { TFrame } from '../../types/editor.types';
import { IAsset } from '../../types/asset.types';

@Component({
    selector: 'app-asset-preview',
    templateUrl: './asset-preview.component.html',
    styleUrls: ['./asset-preview.component.css']
})
export class AssetPreviewComponent implements OnChanges, AfterViewInit, OnDestroy {

    @Input() canvasSize!: number;
    @Input() asset?: IAsset;

    @ViewChild('assetPreviewCanvas') previewRef?: ElementRef;

    preview?: HTMLCanvasElement;
    previewRequest?: number;
    currentPreviewFrame?: TFrame;
    animationCounter = 0;

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.asset) {
            if (this.previewRequest) {
                window.cancelAnimationFrame(this.previewRequest);
            }
            this.currentPreviewFrame = this.asset.frames[0];
            this.previewRequest = window.requestAnimationFrame(() => {
                this.drawPreview();
            });
        }
    }

    ngAfterViewInit() {
        this.preview = this.previewRef && this.previewRef.nativeElement;
    }

    ngOnDestroy() {
        if (this.previewRequest) {
            window.cancelAnimationFrame(this.previewRequest);
        }
    }

    drawPreview() {
        const preview = this.preview;
        if (preview) {
            const ctx = preview.getContext('2d');
            if (ctx && this.currentPreviewFrame instanceof Array && this.asset) {
                ctx.clearRect(0, 0, preview.width, preview.height);
                this.currentPreviewFrame.forEach((pixelRow) => {
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
                if (this.animationCounter > 10) {
                    this.animationCounter = 0;
                    const currentPreviewFrameIndex = this.asset.frames.indexOf(this.currentPreviewFrame);
                    if (currentPreviewFrameIndex < this.asset.frames.length - 1) {
                        this.currentPreviewFrame = this.asset.frames[currentPreviewFrameIndex + 1];
                    } else {
                        this.currentPreviewFrame = this.asset.frames[0];
                    }
                }
                this.animationCounter++;
                this.previewRequest = window.requestAnimationFrame(() => {
                    this.drawPreview();
                });
            }
        }
    }

}
