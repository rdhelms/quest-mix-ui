<template>
    <div class="designs">
        <div class="designs__sidebar">
            <RouterLink
                :to="{
                    name: 'backgrounds'
                }"
            >
                Backgrounds
            </RouterLink>
        </div>
        <div class="designs__main">
            <RouterView />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Designs extends Vue {
    
}
</script>

<style lang="scss" scoped>
.designs {
    display: flex;
    width: 100%;
    height: calc(100% - 54px);

    &__sidebar {
        width: 330px;
        height: 100%;
        background-color: white;
        padding: 10px;
    }

    &__main {
        display: flex;
        flex: 1;
        justify-content: center;
        padding: 10px;
    }
}
</style>
