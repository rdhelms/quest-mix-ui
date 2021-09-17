<template>
    <div class="studio">
        <div class="studio__sidebar">
            <div
                class="studio__drawer"
                :class="{
                    'studio__drawer--open': openDrawer === 'worlds',
                }"
                @click="toggleDrawer('worlds')"
            >
                Worlds
                <div
                    class="studio__drawer-arrow"
                    :class="{
                        'studio__drawer-arrow--open': openDrawer === 'worlds',
                    }"
                >
                    &#9658;
                </div>
            </div>
            <div
                ref="worldsDrawerContents"
                class="studio__drawer-contents"
                :class="{
                    'studio__drawer-contents--open': openDrawer === 'worlds',
                }"
            >
                <div class="studio__drawer-item" @click="newWorldClicked">
                    + New
                </div>
            </div>
            <div
                class="studio__drawer"
                :class="{
                    'studio__drawer--open': openDrawer === 'backgrounds',
                }"
                @click="toggleDrawer('backgrounds')"
            >
                Backgrounds
                <div
                    class="studio__drawer-arrow"
                    :class="{
                        'studio__drawer-arrow--open': openDrawer === 'backgrounds',
                    }"
                >
                    &#9658;
                </div>
            </div>
            <div
                ref="backgroundsDrawerContents"
                class="studio__drawer-contents"
                :class="{
                    'studio__drawer-contents--open': openDrawer === 'backgrounds',
                }"
            >
                <div class="studio__drawer-item" @click="newBackgroundClicked">
                    + New
                </div>
            </div>
            <div
                class="studio__drawer"
                :class="{
                    'studio__drawer--open': openDrawer === 'objects',
                }"
                @click="toggleDrawer('objects')"
            >
                Objects
                <div
                    class="studio__drawer-arrow"
                    :class="{
                        'studio__drawer-arrow--open': openDrawer === 'objects',
                    }"
                >
                    &#9658;
                </div>
            </div>
            <div
                ref="objectsDrawerContents"
                class="studio__drawer-contents"
                :class="{
                    'studio__drawer-contents--open': openDrawer === 'objects',
                }"
            >
                <div class="studio__drawer-item" @click="newObjectClicked">
                    + New
                </div>
            </div>
            <div
                class="studio__drawer"
                :class="{
                    'studio__drawer--open': openDrawer === 'entities',
                }"
                @click="toggleDrawer('entities')"
            >
                Entities
                <div
                    class="studio__drawer-arrow"
                    :class="{
                        'studio__drawer-arrow--open': openDrawer === 'entities',
                    }"
                >
                    &#9658;
                </div>
            </div>
            <div
                ref="entitiesDrawerContents"
                class="studio__drawer-contents"
                :class="{
                    'studio__drawer-contents--open': openDrawer === 'entities',
                }"
            >
                <div class="studio__drawer-item" @click="newEntityClicked">
                    + New
                </div>
            </div>
        </div>
        <div class="studio__main">
            <RouterView />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Studio extends Vue {
    openDrawer: 'worlds' | 'backgrounds' | 'objects' | 'entities' | null = null

    get drawerEls () {
        return [
            this.$refs['worldsDrawerContents'] as HTMLElement,
            this.$refs['backgroundsDrawerContents'] as HTMLElement,
            this.$refs['objectsDrawerContents'] as HTMLElement,
            this.$refs['entitiesDrawerContents'] as HTMLElement,
        ]
    }

    mounted () {
        this.toggleDrawer('worlds')
    }

    toggleDrawer (drawerName: Studio['openDrawer']) {
        if (this.openDrawer === drawerName) {
            this.openDrawer = null
        } else {
            this.openDrawer = drawerName
        }

        const openDrawerEl = this.openDrawer
            ? this.$refs[`${this.openDrawer}DrawerContents`] as HTMLElement
            : null
        this.drawerEls.forEach(el => {
            if (el === openDrawerEl) {
                el.style.height = el.scrollHeight + 'px'
            } else {
                el.style.height = '0px'
            }
        })
    }

    newWorldClicked () {
        if (this.$route.name !== 'world') {
            this.$router.push({ name: 'world' })
        }
    }

    newBackgroundClicked () {
        if (this.$route.name !== 'background') {
            this.$router.push({ name: 'background' })
        }
    }

    newObjectClicked () {
        if (this.$route.name !== 'object') {
            this.$router.push({ name: 'object' })
        }
    }

    newEntityClicked () {
        if (this.$route.name !== 'entity') {
            this.$router.push({ name: 'entity' })
        }
    }
}
</script>

<style lang="scss" scoped>
.studio {
    display: flex;
    width: 100%;
    height: calc(100% - 54px);

    &__sidebar {
        display: flex;
        flex-direction: column;
        width: 330px;
        height: 100%;
        background-color: white;
        border-right: 1px solid #475967;
    }

    &__drawer {
        display: flex;
        width: 100%;
        padding: 10px;
        text-decoration: none;
        color: black;
        border-bottom: 1px solid #475967;
        cursor: pointer;

        &:hover {
            background-color: #475967;
            color: white;
        }

        &--open {
            background-color: #475967;
            color: white;
        }
    }

    &__drawer-arrow {
        margin-left: 6px;
        transform: scale(0.8, 0.6);

        &--open {
            transform: scale(0.8, 0.6) rotate(90deg);
        }
    }

    &__drawer-contents {
        height: 0;
        background-color: #f4f5f9;
        transition: height 0.2s ease-in-out;
        overflow: hidden;
    }

    &__drawer-item {
        padding: 10px 24px;
        border-bottom: 1px solid #475967;
        cursor: pointer;

        &:hover {
            background-color: #dfe3e7;
        }
    }

    &__main {
        display: flex;
        flex: 1;
        justify-content: center;
        padding: 10px;
    }
}
</style>
