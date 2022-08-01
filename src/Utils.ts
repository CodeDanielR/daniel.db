function notFound(val) {
    const modes = [null, undefined]
    return modes.includes(val)

}
function DanielDBError(text) {
    return new TypeError(`daniel.db => ${text}`)
}

export default {
    notFound,
    DanielDBError
}