// To get URL hash that contains tokens info
export const getParamsFromUrl = (hash) => {
    const paramsInUrl = hash.substring(1).split("&")
    const paramsSplitUp = paramsInUrl.reduce((acc, currentVal) => {
        const [key, value] = currentVal.split("=")
        acc[key] = value
        return acc
    }, {})

    return paramsSplitUp
}