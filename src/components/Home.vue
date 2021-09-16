<template>
    <div class="home">
        <div>
            <h3>Saved Game</h3>
            <div>
                <p>You haven't started a game yet.</p>
                <button>Start new game</button>
            </div>
        </div>
        <div>
            <h3>Worlds</h3>
            <div>
                <p>You haven't made any worlds yet.</p>
                <button>Create a world</button>
            </div>
        </div>
        <div>
            <h3>Backgrounds</h3>
            <div>
                <p>You haven't made any backgrounds yet.</p>
                <button>Create a background</button>
            </div>
        </div>
        <div>
            <h3>Entities</h3>
            <div>
                <p>You haven't made any entities yet.</p>
                <button>Create an entity</button>
            </div>
        </div>
        <div>
            <h3>Objects</h3>
            <div>
                <p>You haven't made any objects yet.</p>
                <button>Create an object</button>
            </div>
        </div>
        <div>
            <h3>Stream</h3>
            <div>
                <p>Test downloading/reading chunks from a stream.</p>
                <button @click="download">Download</button>
                <div v-if="streamedData.length">
                    Downloaded {{ streamedData.length }} chunks
                    <div v-for="chunk in streamedData" :key="chunk">
                        {{ chunk.substr(0, 100) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
    streamedData: string[] = []

    async download () {
        const reader = (await fetch('http://localhost:5000/stream')).body?.getReader()

        const pump = async (
            // eslint-disable-next-line no-undef
            reader: ReadableStreamDefaultReader<Uint8Array>, 
            // eslint-disable-next-line no-undef
            controller: ReadableStreamController<unknown>
        ): Promise<void> => {
            const { done, value } = await reader.read()
            this.streamedData.push(new TextDecoder().decode(value))
            if (done) {
                controller.close()
            } else {
                controller.enqueue(value)
                return pump(reader, controller)
            }
        }

        // eslint-disable-next-line no-undef
        const stream = (reader: ReadableStreamDefaultReader<Uint8Array>) => new ReadableStream({
            start(controller) {
                return pump(reader, controller)
            },
        })

        reader && stream(reader)
    }
}
</script>

<style lang="scss" scoped>
.home {
    padding: 10px;
}
</style>
