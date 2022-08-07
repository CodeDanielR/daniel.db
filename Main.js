const fs = require("fs")
const path = require("path")
const Utils = require("./Utils")
const DanielDBError = require("./DanielDBError")

class Database {
    
    /**
     * 
     * @param { { name: string } } options 
     */
    constructor(options) {
        this.options = options
        this.version = require("./package.json").version
        if (!options.name || typeof options.name !== "string" || options.name.length > 16) throw new DanielDBError("Name must be a string with maximum of '16' characters!")
        this.options.name = `/${this.options.name}.json`
        this.init()
    }

    /**
    * Initializes the database
    * @returns boolean
    */
    init() {
        const exists = fs.existsSync(path.join() + this.options.name)
        if (!exists) {
            fs.writeFileSync(path.join() + this.options.name, JSON.stringify({}))
            return true
        } else {
            return false
        }
    }

    /**
    * Deletes the database file
    * @returns boolean 
    */
    close() {
        try {
            fs.unlinkSync(path.join() + this.options.name)
            return true
        } catch {
            return false
        }
    }

    /**
    * Updates the database with the new data
    * @param { object } data The new data
    * @returns boolean
    */
    update(data) {
        try {
            fs.writeFileSync(path.join() + this.options.name, JSON.stringify(data))
            return true
        } catch {
            return false
        }
    }

    /**
    * Returns the database raw data
    @returns object
    */
    readData() {
        try {
            return JSON.parse(fs.readFileSync(path.join() + this.options.name, "utf-8"))
        } catch {
            return {}
        }
    }


    /**
    * Sets the value of the key on the database
    * @param { string } key The key on the database
    * @param value The value 
    * @returns value
    */
    set(key, value) {
        const data = this.readData()
        if (!key) throw new DanielDBError("No key specified")
        if (!value) throw new DanielDBError("No value specified")
        data[key] = value
        this.update(data)
        return this.get(key)
    }

    /**
    * Returns the value of the key in the database
    * @param { string } key The key on the database
    * @returns any
    */
    get(key) {
        const data = this.readData()
        if (!key) throw new DanielDBError("No key specified")
        return data[key]
    }

    /**
    * Deletes the key from the database
    * @param { string } key The key on the database
    * @returns boolean
    */
    delete(key) {
        const data = this.readData()
        if (!key) throw new DanielDBError("No key specified")
        if (!data[key]) return false
        delete data[key]
        this.update(data)
        return true
    }

    /**
    * Pushes a value to the end of the array on the database
    * @param { string } key The key of the array on the database
    * @param value The value to push to the key
    * @returns Array
    */
    push(key, value) {
        const data = this.readData()
        console.log(value)
        if (!key) throw new DanielDBError("No key specified")
        if (!value) throw new DanielDBError("No value specified")
        if (!Array.isArray(data[key] || [])) throw new DanielDBError(`The key '${key}' in the database must be a valid array`)
        if (!data[key]) data[key] = []
        if (!data[key].includes(value)) data[key].push(value)
        this.update(data)
        return this.get(key)
    }

    /**
    * Returns if the key exists on the database
    * @param { string } key The key on the database
    * @returns boolean
    */
    has(key) {
        const data = this.readData()
        if (!key) throw new DanielDBError("No key specified")
        return Utils.notFound(data[key])
    }

    /**
    * Deletes the database
    * @returns boolean
    */
    deleteAll() {
        try {
            this.update({})
            return true
        } catch {
            return false
        }
    }



    /**
    * Returns all the database in a array of objects (ID, data)
    * @returns Array<{ ID: string, data: any }>
    */
    all() {
        return Object.keys(this.readData()).map(key => {
            const data = this.get(key)
            return {
                ID: key,
                data
            }
        })
    }

    /**
    * Increases the value from the current value on the database
    * @param { string } key The key on the database
    * @param { number } value The number to increase from the current value
    * @returns number
    */
    add(key, value) {
        const data = this.readData()
        if (!key) throw new DanielDBError("No key specified")
        if (!value) throw new DanielDBError("No value specified")
        if (isNaN(value)) throw new DanielDBError("The value must be a valid number")
        if (isNaN(data[key]) && data[key]) throw new DanielDBError(`The key '${key}' in the database must be a valid number`)
        if (!data[key]) data[key] = 0 + value
        else data[key] = data[key] + value
        this.update(data)
        return this.get(key)
    }

    /**
    * Decreases the value from the current value on the database
    * @param { string } key The key on the database
    * @param { number } value The number to decrease from the current value
    */
    sub(key, value) {
        const data = this.readData()
        if (!key) throw new DanielDBError("No key specified")
        if (!value) throw new DanielDBError("No value specified")
        if (isNaN(value)) throw new DanielDBError("The value must be a valid number")
        if (isNaN(data[key]) && data[key]) throw new DanielDBError(`The key '${key}' in the database must be a valid number`)
        if (!data[key]) data[key] = 0 - value
        else data[key] = data[key] - value
        this.update(data)
        return this.get(key)
    }

    /**
    * Resets the current value to 0
    * @param { string } key The key on the database
    * @returns number
    */
    reset(key) {
        const data = this.readData()
        if (!key) throw new DanielDBError("No key specified")
        if (!data[key]) throw new DanielDBError(`The key '${key}' was not found on the database`)
        if (isNaN(data[key])) throw new DanielDBError(`The key '${key}' in the database must be a valid number`)
        data[key] = 0
        this.update(data)
        return this.get(key)
    }
}

module.exports = Database