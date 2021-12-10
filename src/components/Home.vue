<template>
    <div class="home">
        <div>
            <h3>Saved Games</h3>
            <div class="home__games">
                <p>You haven't started a game yet.</p>
                <button>Start new game</button>
            </div>
        </div>
        <div>
            <h3>Worlds</h3>
            <div class="home__worlds">
                <p>You haven't made any worlds yet.</p>
                <RouterLink :to="{ name: 'world' }">
                    Create a world
                </RouterLink>
            </div>
        </div>
        <div>
            <h3>Backgrounds</h3>
            <div class="home__backgrounds">
                <ul v-if="backgrounds.length">
                    <li
                        v-for="background in backgrounds"
                        :key="background.objectId"
                    >
                        {{ background.name }}
                    </li>
                </ul>
                <p v-else>You haven't made any backgrounds yet.</p>
                <RouterLink :to="{ name: 'background' }">
                    Create a background
                </RouterLink>
            </div>
        </div>
        <div>
            <h3>Objects</h3>
            <div class="home__objects">
                <p>You haven't made any objects yet.</p>
                <RouterLink :to="{ name: 'object' }">
                    Create an object
                </RouterLink>
            </div>
        </div>
        <div>
            <h3>Entities</h3>
            <div class="home__entities">
                <p>You haven't made any entities yet.</p>
                <RouterLink :to="{ name: 'entity' }">
                    Create an entity
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { backgroundsModule } from '@/store/backgrounds/module'
import { socketIOModule } from '@/store/socketio/module'
import { IBackground } from '@/store/backgrounds/state'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
    isLoading = true
    backgrounds: IBackground[] = []

    get socket () {
        return socketIOModule.state.socket
    }

    async mounted () {
        this.backgrounds = await backgroundsModule.actions.fetchBackgrounds()
        this.isLoading = false
    }
}
</script>

<style lang="scss" scoped>
.home {
    padding: 10px;

    &__games,
    &__worlds,
    &__backgrounds,
    &__objects,
    &__entities {
        padding: 10px;
        background-color: white;
        border: 1px solid black;
    }
}
</style>
