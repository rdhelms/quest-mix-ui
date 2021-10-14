export interface IUserState {
    user: null
}

export const getInitialUserState = (): IUserState => {
    return {
        user: null,
    }
}

const moduleState = getInitialUserState()

export default moduleState
