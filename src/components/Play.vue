<template>
    <div class="play">
        <div>
            Play
        </div>
        <div class="play__game-container">
            <canvas id="gameCanvas" width="960" height="540" />
            <button
                v-if="!isGameRunning"
                class="play__start-btn"
                @click="startGame"
            >
                Start Game
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface IPlayer {
    x: number
    y: number
    width: number
    height: number
    speed: number
    action: 'stand' | 'walkRight' | 'walkLeft' | 'walkUp' | 'walkDown'
    color: string
}

@Component
export default class Play extends Vue {
    canvas: HTMLCanvasElement | null = null
    isGameRunning = false
    player: IPlayer = {
        x: 200,
        y: 200,
        width: 20,
        height: 40,
        speed: 1,
        action: 'stand',
        color: '#ffffff',
    }
    animationHandle: number | null = null

    get ctx () {
        return this.canvas?.getContext('2d') || null
    }

    mounted () {
        window.addEventListener('keyup', this.handleKeyUp)
        window.addEventListener('keydown', this.handleKeyDown)

        this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement

        this.startGame()
    }

    beforeDestroy () {
        if (this.animationHandle !== null) {
            window.cancelAnimationFrame(this.animationHandle)
        }
    }

    handleKeyUp (/* event: KeyboardEvent */) {
        const player = this.player
        player.action = 'stand'
    }

    handleKeyDown (event: KeyboardEvent) {
        const player = this.player
        if (event.key === 'ArrowRight') {
            player.action = 'walkRight'
        } else if (event.key === 'ArrowLeft') {
            player.action = 'walkLeft'
        } else if (event.key === 'ArrowUp') {
            player.action = 'walkUp'
        } else if (event.key === 'ArrowDown') {
            player.action = 'walkDown'
        }
    }

    updatePlayer () {
        const player = this.player
        if (player.action === 'walkRight') {
            player.x += player.speed
        } else if (player.action === 'walkLeft') {
            player.x -= player.speed
        } else if (player.action === 'walkUp') {
            player.y -= player.speed
        } else if (player.action === 'walkDown') {
            player.y += player.speed
        }
    }

    drawBackground () {
        if (this.canvas && this.ctx) {
            this.ctx.fillStyle = '#000000'
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    drawPlayer () {
        const ctx = this.ctx
        const player = this.player
        if (ctx) {
            ctx.fillStyle = player.color
            ctx.fillRect(player.x, player.y, player.width, player.height)
        }
    }

    startGame () {
        this.isGameRunning = true

        this.updatePlayer()

        this.drawBackground()
        this.drawPlayer()

        this.animationHandle = window.requestAnimationFrame(this.startGame)
    }
}
</script>

<style lang="scss" scoped>
.play {
    background-color: white;

    &__game-container {
        position: relative;
        width: 960px;
        height: 540px;
        overflow: hidden;
        border: 1px solid black;
    }

    #gameCanvas {
        width: 960px;
        height: 540px;
    }

    &__start-btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }
}
</style>
