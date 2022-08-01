class DanielDBError extends Error {
    constructor(message) {
        super(message)
        this.name = "DanielDBError"
    }
}

module.exports = DanielDBError