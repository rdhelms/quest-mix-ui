import { io, Socket } from 'socket.io-client'

export interface ISocketIOState {
    socket: Socket
}

export const getInitialSocketIOState = (): ISocketIOState => {
    const socket = io(process.env.VUE_APP_SERVER_URL)

    socket.on('connect', () => {
        console.log(`Connected: ${socket.id}`)
    })

    return {
        socket,
    }
}

const moduleState = getInitialSocketIOState()

export default moduleState
