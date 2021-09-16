import { IBackground } from '@/store/backgrounds/state'
import { runCloudFunction } from '@/store/parseUtils'

const saveBackground = async (background: IBackground) => {
    const result = await runCloudFunction('saveBackground', {
        background,
    })
    console.log(result)
    return result
}

export default {
    saveBackground,
}
