<template>
    <div id="app" class="app">
        <div class="app__header">
            <RouterLink
                class="app__title"
                :to="{ name: 'home' }"
            >
                Quest Mix
            </RouterLink>
            <RouterLink
                class="app__nav-link"
                active-class="app__nav-link--active"
                :to="{ name: 'arcade' }"
            >
                Arcade
            </RouterLink>
            <RouterLink
                class="app__nav-link"
                active-class="app__nav-link--active"
                :to="{ name: 'studio' }"
            >
                Studio
            </RouterLink>
        </div>
        <RouterView />
    </div>
</template>

<style lang="scss" scoped>
.app {
    height: 100%;

    &__header {
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 54px;
        background-color: #043580;
        color: white;
    }

    &__title {
        position: absolute;
        left: 0;
        padding: 0 10px;
        font-size: 1.5rem;
        cursor: pointer;
        color: white;
        text-decoration: none;
    }

    &__nav-link {
        text-decoration: none;
        color: white;
        border-radius: 3px;
        padding: 10px;
        margin: 0 10px;

        &--active {
            background-color: white;
            color: black;
        }
    }
}
</style>
