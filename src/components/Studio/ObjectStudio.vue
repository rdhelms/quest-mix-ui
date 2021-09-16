<template>
    <div class="object-studio">
        <h3>Object Editor</h3>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ObjectStudio extends Vue { // ObjectStudio instead of Object to avoid conflict with Object class
    
}
</script>

<style lang="scss" scoped>
.object-studio {
    // noop
}
</style>
