import { userModule } from '@/store/user/module'
import { getInitialUserState } from '@/store/user/state'

export const resetState = () => {
    userModule.state = getInitialUserState()
}
