export type Loadable<T> = {
    isLoading: boolean
    lastFetched: null | Date
    value: T | Promise<T>
}

export const initLoadable = <T>(value: T): Loadable<T> => ({
    isLoading: false,
    lastFetched: null,
    value,
})

export const resetLoadable = <T, L extends Loadable<T>>(loadable: L) => {
    loadable.lastFetched = null
}

export const fetchLoadable = async <T>(
    loadable: Loadable<T>,
    asyncFunc: () => Promise<T>,
    forceFetch?: boolean
): Promise<T> => {
    if (
        !forceFetch
        && (
            loadable.isLoading
            || loadable.lastFetched
        )
    ) {
        return loadable.value
    }

    const promise = asyncFunc()
    loadable.isLoading = true
    if (!forceFetch) {
        loadable.value = promise
    }

    const result = await promise
    // Only store the final result if isLoading === true
    // This lets us "cancel" in-flight requests by setting isLoading = false
    if (loadable?.isLoading) {
        loadable.isLoading = false
        loadable.lastFetched = new Date()
        loadable.value = result
    }
    return result
}
