<template>
    <div id="app" class="app">
        <div class="app__header">
            <div class="app__title">
                Quest Mix
            </div>
            <RouterLink
                class="app__nav-link"
                active-class="app__nav-link--active"
                :to="{ name: 'create' }"
            >
                Create
            </RouterLink>
            <RouterLink
                class="app__nav-link"
                active-class="app__nav-link--active"
                :to="{ name: 'play' }"
            >
                Play
            </RouterLink>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss" scoped>
.app {
    &__header {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 54px;
        background-color: #043580;
        color: white;
        margin-bottom: 10px;
    }

    &__title {
        position: absolute;
        left: 0;
        padding: 0 10px;
        font-size: 1.5rem;
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
