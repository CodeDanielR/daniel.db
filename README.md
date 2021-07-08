A simple JSON database.

**How to install:**
```bat
npm install daniel.db
```


**Methods:**

*create*

```js
const db = require("daniel.db")
// Creating the database file 
db.create()
// Done!
```

*add*

```js
const db = require("daniel.db")

// Addding a value to the current value
db.add('joins', 1)
// If the current value is 1, so the value will be 2.
```

*set*

```js
const db = require("daniel.db")
// Setting an value to a key
db.set(`name`, 'daniel')
// Now, the key 'name' will give the value 'daniel'
```

*get*

```js
const db = require("daniel.db")
// Get a value from a key
db.get(`name`)
// Will return 'daniel', because we made a setting with the key 'name' and the value 'daniel'
```

*has*

```js
const db = require("daniel.db")
// Checks if we have key in the database that named 'name'
db.has(`name`)
// If yes, This will return 'true', If no, it will return 'false'.
```

*delete*

```js
const db = require("daniel.db")
// Deletes a key from the database
db.delete(`name`)
// Done!
```

*deleteAll*

```js
const db = require("daniel.db")
// Deletes all the keys in the database
db.deleteAll()
// Done!
```

*all*

```js
const db = require("daniel.db")
// Get all the data in a array
db.all().filter(x => x.ID.startsWith(`name`))
/* Returns: 
{ ID: 'name', value: ['hello] }
*/
```

*push*

```js
const db = require("daniel.db")
// Pushing a value to array
db.push(`name`, 'hello') // Will return ['hello'] with 'get' method
// Done! you can use 'get' method to get the array!
```

*reset*

```js
const db = require("daniel.db")
// Resets a key (Number)
db.reset(`joins`)
// Done! you can use 'get' method to get '0'!
```

Need help? Contact me!
Discord: [**Support Server**](https://discord.gg/aymsQd6VzV)
<br>




