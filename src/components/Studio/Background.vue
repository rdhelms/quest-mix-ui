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
                @mouseenter="showCursor = true"
                @mouseleave="showCursor = false"
                @mousemove="mouseMove"
                @mousedown="mouseDown"
                @mouseup="mouseUp"
            />
        </div>
        <div>
            <label>Draw Color</label>
            <input
                v-model="drawColor"
                class="background__color-picker"
                type="color"
            >
        </div>
        <button @click="saveBackground">Save</button>
    </div>
</template>

<script lang="ts">
import { backgroundsModule } from '@/store/backgrounds/module'
import { Component, Vue } from 'vue-property-decorator'
import { IBackground, IPixel } from '@/store/backgrounds/state'

@Component
export default class Background extends Vue {
    readonly pixelWidth = 16
    readonly pixelHeight = 9
    canvas: HTMLCanvasElement | null = null
    animationHandle: number | null = null
    showCursor = false
    cursorPos = {
        x: 0,
        y: 0,
    }
    drawColor = '#0000ff'
    isPainting = false
    name = ''
    imageData: IPixel[] = []

    get ctx () {
        return this.canvas?.getContext('2d') || null
    }

    mounted () {
        this.canvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement

        this.renderBackground()
    }

    beforeDestroy () {
        if (this.animationHandle !== null) {
            window.cancelAnimationFrame(this.animationHandle)
        }
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

    paintCurrentPixel () {
        const x = this.cursorPos.x
        const y = this.cursorPos.y

        if (this.isPainting) {
            const existingPixel = this.imageData.find(pixel => pixel.x === x && pixel.y === y)
            if (existingPixel) {
                existingPixel.color = this.drawColor
            } else {
                this.imageData.push({ x, y, color: this.drawColor })
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
            this.imageData.forEach(pixel => {
                ctx.fillStyle = pixel.color
                ctx.fillRect(pixel.x * this.pixelWidth, pixel.y * this.pixelHeight, this.pixelWidth, this.pixelHeight)
            })
        }
    }

    drawGrid () {
        const ctx = this.ctx
        if (this.canvas && ctx) {
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
            ctx.fillRect(
                this.cursorPos.x * this.pixelWidth,
                this.cursorPos.y * this.pixelHeight,
                this.pixelWidth,
                this.pixelHeight
            )
        }
    }

    renderBackground () {
        this.clearCanvas()
        this.drawPixels()
        this.drawGrid()
        this.drawCursor()

        this.animationHandle = window.requestAnimationFrame(this.renderBackground)
    }

    async saveBackground () {
        const background: IBackground = {
            name: this.name,
            imageData: this.imageData,
        }
        console.log('saveBackground', background)
        await backgroundsModule.actions.saveBackground(background)
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

    &__color-picker {
        margin: 10px;
    }
}
</style>
