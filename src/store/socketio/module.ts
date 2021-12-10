import Vue from 'vue'
import actions from '@/store/socketio/actions'
import state from '@/store/socketio/state'
import getters from '@/store/socketio/getters'

export const socketIOModule = Vue.observable({
    state,
    actions,
    getters,
})
