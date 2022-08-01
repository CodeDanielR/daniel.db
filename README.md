A simple JSON database.

# How to install:
```bat
npm install daniel.db
```


# Methods:

*create()*

```js
const DanielDB = require("daniel.db")
const db = new DanielDB.Database({ name: "main" })
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
const db = require("daniel.db")
// Returns an array of objects (ID, data)
db.all()

```

*push()*

```js
const db = require("daniel.db")
// Pushes a value to the array
db.push(`name`, 'hello')
```

*reset()*

```js
const db = require("daniel.db")
// Resets a key (Number)
db.reset(`joins`)
// Done! you can use 'get' method to get '0'!
```

Need help? Contact me!
Discord: [**Support Server**](https://discord.gg/ay)