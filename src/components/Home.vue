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
                <button>Create a world</button>
            </div>
        </div>
        <div>
            <h3>Backgrounds</h3>
            <div class="home__backgrounds">
                <p>You haven't made any backgrounds yet.</p>
                <button>Create a background</button>
            </div>
        </div>
        <div>
            <h3>Objects</h3>
            <div class="home__objects">
                <p>You haven't made any objects yet.</p>
                <button>Create an object</button>
            </div>
        </div>
        <div>
            <h3>Entities</h3>
            <div class="home__entities">
                <p>You haven't made any entities yet.</p>
                <button>Create an entity</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {}
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
