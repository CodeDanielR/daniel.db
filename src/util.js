function notFound(val) {
    let mode
    if(val === null || val === undefined) {
        mode = true
    }
    else {
        mode = false
    }
    return mode

}
function error(text) {
    return new TypeError(`daniel.db => ${text}`)
}

module.exports = { notFound, error }