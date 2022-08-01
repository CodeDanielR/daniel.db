A simple JSON database.

# How to install:
```bat
npm install daniel.db
```


# Methods:

*create()*

```js
const DanielDB = require("daniel.db")
const db = new DanielDB({ name: "main" })
```

*add()*

```js
// Increases the current value to the key
db.add('joins', 1)
```

*set()*

```js
// Sets the key to value
db.set(`name`, 'daniel')
```

*get()*

```js
// Get a value from the key
db.get(`name`)
```

*has()*

```js
// Returns if the database has the provided key
db.has(`name`)
```

*delete()*

```js
// Deletes a key from the database
db.delete(`name`)
```

*deleteAll()*

```js
// Deletes all the keys in the database
db.deleteAll()
// Done!
```

*all()*

```js
// Returns an array of objects (ID, data)
db.all()

```

*push()*

```js
// Pushes a value to the array
db.push(`name`, 'hello')
```

*reset()*

```js
// Resets the key in the database to 0
db.reset(`joins`)
```

**WARNING: ⚠**

If you're using [`nodemon`](httpps://nodemon.io), please use the `--ignore` file to ignore all the json files.

*Example:*
```bat
nodemon fileName.js --ignore *.json
```
If do you want to run your main file, dont write the `[fileName]` in the command.

Need help? Contact me via [Discord](https://discord.com/users/737232727459495977)!