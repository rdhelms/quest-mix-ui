<template>
    <div id="app">
        <div>
            Quest Mix
            <RouterLink :to="{ name: 'play' }">Play</RouterLink>
        </div>
        <router-view/>
    </div>
</template>
