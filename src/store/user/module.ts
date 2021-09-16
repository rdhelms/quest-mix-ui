import Vue from 'vue'
import actions from '@/store/user/actions'
import state from '@/store/user/state'
import getters from '@/store/user/getters'

export const userModule = Vue.observable({
    state,
    actions,
    getters,
})
