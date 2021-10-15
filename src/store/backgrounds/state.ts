export interface IPixel {
    x: number
    y: number
    color: string
}

export interface IBackground {
    objectId: string
    name: string
    imageData: IPixel[][]
}

export interface IBackgroundsState {
    currentBackground: IBackground | null
}

export const getInitialBackgroundsState = (): IBackgroundsState => {
    return {
        currentBackground: null,
    }
}

const moduleState = getInitialBackgroundsState()

export default moduleState
