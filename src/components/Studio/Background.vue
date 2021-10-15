<template>
    <div class="background">
        <h3>Background Editor</h3>
        <div class="background__name-container">
            <input
                type="text"
                v-model="name"
                placeholder="Name"
                class="background__name-input"
            >
        </div>
        <div class="background__canvas-container">
            <canvas
                id="backgroundCanvas"
                width="960"
                height="540"
                @mouseenter="mouseEnter"
                @mouseleave="mouseLeave"
                @mousemove="mouseMove"
                @mousedown="mouseDown"
                @mouseup="mouseUp"
            />
        </div>
        <div class="background__toolbar">
            <div>
                <label>Brush Size</label>
                <input
                    v-model="brushSize"
                    type="range"
                    min="1"
                    max="40"
                >
                <span>{{ brushSize }}</span>
            </div>
            <div>
                <label>Draw Color</label>
                <input
                    v-model="drawColor"
                    class="background__color-picker"
                    type="color"
                >
            </div>
            <button @mousedown="undoClicked" @mouseup="isUndoPressed = false">Undo</button>
            <button @mousedown="redoClicked" @mouseup="isRedoPressed = false">Redo</button>
            <button @click="createBackground">Save</button>
        </div>
    </div>
</template>

<script lang="ts">
import { backgroundsModule } from '@/store/backgrounds/module'
import { Component, Vue } from 'vue-property-decorator'
import { IBackground, IPixel } from '@/store/backgrounds/state'

@Component
export default class Background extends Vue {
    readonly pixelWidth = 4
    readonly pixelHeight = 2
    canvas: HTMLCanvasElement | null = null
    animationHandle: number | null = null
    showCursor = false
    showGrid = false
    cursorPos = {
        x: 0,
        y: 0,
    }
    drawColor = '#0000ff'
    brushSize = 10
    isPainting = false
    name = ''
    imageData: IPixel[][] = []
    history: { old: IPixel; new: IPixel }[] = []
    undoStack: { old: IPixel; new: IPixel }[] = []
    isUndoPressed = false
    isRedoPressed = false

    get ctx () {
        return this.canvas?.getContext('2d') || null
    }

    get gridSize () {
        if (!this.canvas) {
            return {
                x: 0,
                y: 0,
            }
        } else {
            return {
                x: Math.min(this.canvas.width / this.pixelWidth),
                y: Math.min(this.canvas.height / this.pixelHeight),
            }
        }
    }

    get brush () {
        const start = {
            x: Math.max(this.cursorPos.x - (this.brushSize - 1), 0),
            y: Math.max(this.cursorPos.y - (this.brushSize - 1), 0),
        }
        const end = {
            x: Math.min(this.cursorPos.x + (this.brushSize - 1), this.gridSize.x - 1),
            y: Math.min(this.cursorPos.y + (this.brushSize - 1), this.gridSize.y - 1),
        }
        return {
            start,
            end,
        }
    }

    mounted () {
        this.canvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement

        for (let x = 0; x < this.gridSize.x; x++) {
            const column = []
            for (let y = 0; y < this.gridSize.y; y++) {
                column.push({
                    x,
                    y,
                    color: '#ffffff',
                })
            }
            this.imageData.push(column)
        }


        this.renderBackground()
    }

    beforeDestroy () {
        if (this.animationHandle !== null) {
            window.cancelAnimationFrame(this.animationHandle)
        }
    }

    mouseEnter () {
        this.showCursor = true
        // this.showGrid = true
    }

    mouseLeave () {
        this.showCursor = false
        // this.showGrid = false
    }

    mouseDown () {
        this.isPainting = true
        this.paintCurrentPixel()
    }

    mouseUp () {
        this.isPainting = false
    }

    mouseMove (e: MouseEvent) {
        const x = Math.floor(e.offsetX / this.pixelWidth)
        const y = Math.floor(e.offsetY / this.pixelHeight)
        if (x !== this.cursorPos.x || y !== this.cursorPos.y) {
            this.cursorPos.x = x
            this.cursorPos.y = y
    
            this.paintCurrentPixel()
        }
    }

    undoClicked () {
        this.isUndoPressed = true
    }

    undo () {
        const pixelChange = this.history.pop()
        if (pixelChange) {
            this.undoStack.push(pixelChange)
            const newPixel = pixelChange.old
            this.imageData[newPixel.x][newPixel.y] = newPixel
        }
    }

    redoClicked () {
        this.isRedoPressed = true
    }

    redo () {
        const pixelChange = this.undoStack.pop()
        if (pixelChange) {
            const newPixel = pixelChange.new
            this.imageData[newPixel.x][newPixel.y] = newPixel
            this.history.push(pixelChange)
        }
    }

    paintCurrentPixel () {
        for (let x = this.brush.start.x; x <= this.brush.end.x; x++) {
            for (let y = this.brush.start.y; y <= this.brush.end.y; y++) {
                if (this.isPainting) {
                    const oldPixel = this.imageData[x][y]
                    const newPixel = { x, y, color: this.drawColor }
                    this.imageData[x][y] = newPixel
                    this.history.push({
                        old: oldPixel,
                        new: newPixel,
                    })
                }
            }
        }
    }

    clearCanvas () {
        if (this.canvas && this.ctx) {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    drawPixels () {
        const ctx = this.ctx
        if (ctx) {
            this.imageData.forEach(column => {
                column.forEach(pixel => {
                    ctx.fillStyle = pixel.color
                    ctx.fillRect(
                        pixel.x * this.pixelWidth,
                        pixel.y * this.pixelHeight,
                        this.pixelWidth,
                        this.pixelHeight
                    )
                })
            })
        }
    }

    drawGrid () {
        const ctx = this.ctx
        if (this.canvas && ctx && this.showGrid) {
            const width = this.canvas.width
            const height = this.canvas.height
            const gridColor = '#ddd'
            ctx.strokeStyle = gridColor
            ctx.lineWidth = 1
            // Draw horizontal lines
            for (let y = 0; y < height; y += this.pixelHeight) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
                ctx.stroke()
            }
            // Draw vertical lines
            for (let x = 0; x < width; x += this.pixelWidth) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, height)
                ctx.stroke()
            }
        }
    }

    drawCursor () {
        const ctx = this.ctx
        if (ctx && this.showCursor) {
            ctx.fillStyle = this.drawColor
            for (let x = this.brush.start.x; x <= this.brush.end.x; x++) {
                for (let y = this.brush.start.y; y <= this.brush.end.y; y++) {
                    ctx.fillRect(
                        x * this.pixelWidth,
                        y * this.pixelHeight,
                        this.pixelWidth,
                        this.pixelHeight
                    )
                }
            }
        }
    }

    renderBackground () {
        if (this.isUndoPressed) {
            for (let i = 0; i < (this.brushSize * 2 - 1) * (this.brushSize * 2 - 1); i++) {
                this.undo()
            }
        }
        if (this.isRedoPressed) {
            for (let i = 0; i < (this.brushSize * 2 - 1) * (this.brushSize * 2 - 1); i++) {
                this.redo()
            }
        }

        this.clearCanvas()
        this.drawPixels()
        this.drawGrid()
        this.drawCursor()

        this.animationHandle = window.requestAnimationFrame(this.renderBackground)
    }

    async createBackground () {
        if (!this.name) {
            alert('Enter a Name for the background')
            return
        }
        const background: Omit<IBackground, 'objectId'> = {
            name: this.name,
            imageData: this.imageData,
        }
        console.log('createBackground', background)
        await backgroundsModule.actions.createBackground(background)
    }
}
</script>

<style lang="scss" scoped>
.background {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &__name-container {
        margin-bottom: 10px;
    }

    &__name-input {
        padding: 6px;
        font-size: 18px;
    }

    &__canvas-container {
        background-color: white;
        position: relative;
        width: 960px;
        height: 540px;
        overflow: hidden;
        border: 1px solid black;
    }

    #backgroundCanvas {
        width: 960px;
        height: 540px;
    }

    &__toolbar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    &__color-picker {
        margin: 10px;
    }
}
</style>
