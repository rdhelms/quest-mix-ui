import Vue from 'vue'
import actions from '@/store/backgrounds/actions'
import state from '@/store/backgrounds/state'
import getters from '@/store/backgrounds/getters'

export const backgroundsModule = Vue.observable({
    state,
    actions,
    getters,
})
