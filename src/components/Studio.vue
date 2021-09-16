<template>
    <div class="design">
        <div class="design__sidebar">
            <RouterLink
                :to="{
                    name: 'world'
                }"
            >
                World
            </RouterLink>
            <RouterLink
                :to="{
                    name: 'background'
                }"
            >
                Background
            </RouterLink>
            <RouterLink
                :to="{
                    name: 'entity'
                }"
            >
                Entity
            </RouterLink>
            <RouterLink
                :to="{
                    name: 'object'
                }"
            >
                Object
            </RouterLink>
        </div>
        <div class="design__main">
            <RouterView />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Design extends Vue {
    mounted () {
        // If we store some reference to "the last thing being worked on" then we could take the user to that
        // instead of defaulting to background
        if (this.$route.name !== 'background') {
            this.$router.push({
                name: 'background',
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.design {
    display: flex;
    width: 100%;
    height: calc(100% - 54px);

    &__sidebar {
        display: flex;
        flex-direction: column;
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
