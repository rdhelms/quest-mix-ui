import { IBackground } from '@/store/backgrounds/state'
import { runServerFunction } from '@/store/serverUtils'

const saveBackground = async (background: IBackground) => {
    const result = await runServerFunction('saveBackground', {
        background,
    })
    console.log(result)
    return result
}

export default {
    saveBackground,
}
