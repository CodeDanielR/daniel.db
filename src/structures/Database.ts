import fs from "fs"
import path from "path"
import Utils from "../Utils"

export interface DatabaseOptions {
    name: string
}

export class Database {
    public options: DatabaseOptions
    public version: string

    constructor(options: DatabaseOptions) {
        this.options = options
        this.version = require("../package.json").version
        if (!options.name || typeof options.name !== "string" || options.name.length > 16) Utils.DanielDBError("Name must be a string with maximum of '16' characters!")
        this.options.name = `${this.options.name}.json`
        this.init()
    }

    /**
     * Initializes the database
     */
    init(): boolean {
        const exists = fs.existsSync(path.join() + this.options.name)
        if (!exists) {
            fs.writeFileSync(path.join() + this.options.name, JSON.stringify({}))
            return true
        } else {
            return false
        }
    }

    /**
 * Updates the database with the new data
 * @param data The new data
 */
    update(data: object): boolean {
        try {
            fs.writeFileSync(path.join() + this.options.name, JSON.stringify(data))
            return true
        } catch {
            return false
        }
    }

    /**
* Returns the database raw data
*/
    readData(): object {
        try {
            return fs.readdirSync(path.join() + this.options.name, "utf-8")
        } catch {
            return {}
        }
    }


    /**
     * Sets the value of the key on the database
     * @param key The key on the database
     * @param value The value 
     */
    set(key: string, value: any): any {
        const data = this.readData()
        if (!key) Utils.DanielDBError("No key specified")
        if (!value) Utils.DanielDBError("No value specified")
        data[key] = value
        this.update(data)
        return this.get(key)
    }

    /**
 * Returns the value of the key in the database
 * @param key The key on the database
 */
    get(key: string): any {
        const data = this.readData()
        if (!key) Utils.DanielDBError("No key specified")
        return data[key]
    }

    /**
     * Deletes the key from the database
* @param key The key on the database
*/
    delete(key: string): boolean {
        const data = this.readData()
        if (!key) Utils.DanielDBError("No key specified")
        if (!data[key]) return false
        delete data[key]
        this.update(data)
        return true
    }

    /**
    * Pushes a value to the end of the array on the database
    * @param key The key of the array on the database
    * @param value The value to push to the key
    */
    push(key: string, value: any): Array<any> {
        const data = this.readData()
        if (!key) Utils.DanielDBError("No key specified")
        if (!value) Utils.DanielDBError("No value specified")
        if (!Array.isArray(data[key] || [])) Utils.DanielDBError(`The key '${key}' in the database must be a valid array`)
        if (!data[key]) data[key] = []
        if (!data[key].includes(value)) data[key].push(value)
        this.update(data)
        return this.get(key)
    }

    /**
    * Returns if the key exists on the database
    * @param key The key on the database
    */
    has(key: string): boolean {
        const data = this.readData()
        if (!key) Utils.DanielDBError("No key specified")
        return Utils.notFound(data[key])
    }

    /**
* Deletes the database
*/
    deleteAll(): boolean {
        try {
            this.update({})
            return true
        } catch {
            return false
        }
    }



    /**
* Returns all the database in a array of objects (ID, data)
*/
    all(): Array<{ ID: string, data: any }> {
        return Object.keys(this.readData()).map(key => {
            const data = this.get(key)
            return {
                ID: key,
                data
            }
        })
    }


    add(key: string, value: number): number {
        const data = this.readData()
        if (!key) Utils.DanielDBError("No key specified")
        if (!value) Utils.DanielDBError("No value specified")
        if (isNaN(value)) Utils.DanielDBError("The value must be a valid number")
        if (isNaN(data[key]) && data[key]) Utils.DanielDBError(`The key '${key}' in the database must be a valid number`)
        if (!data[key]) data[key] = 0 + value
        else data[key] = data[key] + value
        this.update(data)
        return this.get(key)
    }

    /**
     * Decreases the value param from the current value
     * @param key The key on the database
     * @param value The number to decrease from the current value
     */
    sub(key: string, value: number): number {
        const data = this.readData()
        if (!key) Utils.DanielDBError("No key specified")
        if (!value) Utils.DanielDBError("No value specified")
        if (isNaN(value)) Utils.DanielDBError("The value must be a valid number")
        if (isNaN(data[key]) && data[key]) Utils.DanielDBError(`The key '${key}' in the database must be a valid number`)
        if (!data[key]) data[key] = 0 - value
        else data[key] = data[key] - value
        this.update(data)
        return this.get(key)
    }

    reset(key: string): number {
        const data = this.readData()
        if (!key) Utils.DanielDBError("No key specified")
        if (!data[key]) Utils.DanielDBError(`The key '${key}' was not found on the database`)
        if (isNaN(data[key])) Utils.DanielDBError(`The key '${key}' in the database must be a valid number`)
        data[key] = 0
        this.update(data)
        return this.get(key)
    }

}

export default { Database }