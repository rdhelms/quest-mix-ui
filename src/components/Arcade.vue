<template>
    <div class="arcade">
        <h3>Arcade</h3>
        <div class="arcade__games">
            <p>There are no games in the arcade, yet.</p>
            <button>Make the first one!</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Arcade extends Vue {
    
}
</script>

<style lang="scss" scoped>
.arcade {
    padding: 10px;

    &__games {
        border: 1px solid black;
        background-color: white;
        padding: 10px;
    }
}
</style>
