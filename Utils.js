function notFound(val) {
    const modes = [null, undefined]
    return modes.includes(val)

}

/**
* 
* @param { string } text 
* @returns TypeError
*/
function DanielDBError(text) {
    return new TypeError(`daniel.db => ${text}`)
}

module.exports = {
    notFound,
    DanielDBError
}