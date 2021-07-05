const fs = require("fs")
const path = require("path")
const util = require("./src/util")

util.checkForUpdates()

class Database {
    static create() {
        try{
        let content = fs.readFileSync(path.join() + "/database.json", 'utf-8')
        if(content !== "{}") fs.writeFileSync(path.join() + "/database.json", "{}");
        }catch(err) {
            fs.writeFileSync(path.join() + "/database.json", "{}");
        }finally{
            return `daniel.db => Created Database File!`
        }
    }

    static update(content) {
        fs.writeFileSync(path.join() + "/database.json", JSON.stringify(content));
    }
    
    static read() {
        let result = "{}";
        try {
            let content = fs.readFileSync(path.join() + "/database.json", 'utf-8');
            result = content;
        } catch (err) {
            Database.create();
        } finally {
            return JSON.parse(result);
        }
    }

    static get(key) {
        const data = Database.read();
        if (!key) throw new TypeError("daniel.db => No key specified");
        return !data[key] ? null : data[key];
    }

    static delete(key) {
        const data = Database.read()
       if(!key) throw new TypeError("daniel.db => No key specified")
       if(!data[key]) throw new TypeError(`daniel.db => The key '${key}' not found in the database`)
        delete data[key]
        Database.update(data)
        return true
    }
    static deleteAll() {
        const data = Database.read()
        for(let key in data) {
            this.delete(key)
        }
        return true
    }

    static reset(key) {
        const data = Database.read()
        if (!key) throw new TypeError("daniel.db => No key specified");
        if(!data[key]) throw new TypeError(`daniel.db => The key '${key}' not found in the database`)
        if (isNaN(data[key])) throw new TypeError("daniel.db => Value in the database must be a valid number");
        data[key] = 0
        Database.update(data)
        return true
    }
    
    static subtract(key, value) {
        const data = Database.read();
        if (!key) throw new TypeError("daniel.db => No key specified");
        if (!value) throw new TypeError("daniel.db => No value specified");
        if (isNaN(value)) throw new TypeError("daniel.db => Value must be a valid number");
        if (isNaN(data[key]) && data[key]) throw new TypeError("daniel.db => Value in the database must be a valid number");
        data[key] = data[key] ? data[key] - value : value;
        Database.update(data);
        return Database.get(key);
    }
    
    static push(key, value) {
        const data = Database.read()
        if(!key) throw new TypeError("daniel.db => No key specified")
        if(!value) throw new TypeError("daniel.db => No value specified")
        if(!data[key]) throw new TypeError(`daniel.db => The key '${key}' not found in the database`)
        if(!Array.isArray(data[key])) throw new TypeError(`daniel.db => The value in the database must be a array`)
        data[key].push(value)
        Database.update(data)
        return Database.get(key)
    }   

    static has(key) {       
        const data = Database.read();
        if (!key) throw new TypeError("daniel.db => No key specified")
        return !util.notFound(data[key]);
    }

    static all() {
        return Object.keys(Database.read());
    }

    static set(key, value) {
        const data = Database.read();
        if (!key) throw new TypeError("daniel.db => No key specified");
        if (!value) throw new TypeError("daniel.db => No value specified");
        data[key] = value;
        Database.update(data);
        return Database.get(key);
    }
    
    static add(key, value) {
        const data = Database.read();
        if (!key) throw new TypeError("daniel.db => No key specified");
        if (!value) throw new TypeError("daniel.db => No value specified");
        if (isNaN(value)) throw new TypeError("daniel.db => Value must be a valid number");
        if (isNaN(data[key]) && data[key]) throw new TypeError("daniel.db => Value in the database must be a valid number");
        data[key] = data[key] ? data[key] + value : value;
        Database.update(data);
        return Database.get(key);
    }
}

module.exports = Database;