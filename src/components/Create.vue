<template>
    <div class="create">
        <div>
            Create
        </div>
        <div class="create__canvas-container">
            <canvas
                id="createCanvas"
                width="960"
                height="540"
                @mouseenter="showCursor = true"
                @mouseleave="showCursor = false"
                @mousemove="mouseMove"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Create extends Vue {
    readonly pixelWidth = 16
    readonly pixelHeight = 9
    canvas: HTMLCanvasElement | null = null
    animationHandle: number | null = null
    showCursor = false
    cursorPos = {
        x: 0,
        y: 0,
    }
    drawColor = '#ff00ff'

    get ctx () {
        return this.canvas?.getContext('2d') || null
    }

    mounted () {
        this.canvas = document.getElementById('createCanvas') as HTMLCanvasElement

        this.renderDrawing()
    }

    beforeDestroy () {
        if (this.animationHandle !== null) {
            window.cancelAnimationFrame(this.animationHandle)
        }
    }

    mouseMove (e: MouseEvent) {
        this.cursorPos.x = Math.floor(e.offsetX / this.pixelWidth)
        this.cursorPos.y = Math.floor(e.offsetY / this.pixelHeight)
    }

    clearCanvas () {
        if (this.canvas && this.ctx) {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
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

    renderDrawing () {
        this.clearCanvas()
        this.drawGrid()
        this.drawCursor()

        this.animationHandle = window.requestAnimationFrame(this.renderDrawing)
    }
}
</script>

<style lang="scss" scoped>
.create {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &__canvas-container {
        background-color: white;
        position: relative;
        width: 960px;
        height: 540px;
        overflow: hidden;
        border: 1px solid black;
    }

    #createCanvas {
        width: 960px;
        height: 540px;
    }
}
</style>
