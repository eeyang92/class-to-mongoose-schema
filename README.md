## Installation

```sh
npm install --save class-to-mongoose-schema
```

or

```sh
yarn add class-to-mongoose-schema
```

## Purpose of this Package

To enable inheritance of Mongoose Schema via JavaScript Classes.

Note: Only methods, variables and static methods are converted to the schema, static variables are ignored as there is no equivalent in Mongoose.

As of 2.x, `mongoose` has become a peer dependency

## Example

Via Properties:

```javascript
// Person.js
import mongoose, { Schema } from 'mongoose'
import classToSchema from 'class-to-mongoose-schema'

export class Person {
	firstName = String
	lastName = String

	static getAll() { // Example static method
		return mongoose.model('Person').find()
	}
}

const personSchema = classToSchema(new Person())

export { personSchema }

export default mongoose.model(Person.name, personSchema) // Person.name === 'Person'
```

```javascript
// User.js
import mongoose, { Schema } from 'mongoose'
import classToSchema from 'class-to-mongoose-schema'

import { Person } from 'Person'

export class User extends Person {
	username = String
	password = String

	secure(args) { // Example method
		// ...
	}

	static getAll() { // Example static method
		return mongoose.model('User').find()
	}
}

const userSchema = classToSchema(new User())

export { userSchema }

export default mongoose.model(User.name, userSchema) // User.name === 'User'
```

Via Constructor (pass in arguments on object instantiation):

```javascript
// Person.js
import mongoose, { Schema } from 'mongoose'
import classToSchema from 'class-to-mongoose-schema'

export class Person {
	constructor(args) {
		this.firstName = String
		this.lastName = String
	}

	static getAll() { // Example static method
		return mongoose.model('Person').find()
	}
}

const personSchema = classToSchema(new Person(args))

export { personSchema }

export default mongoose.model(Person.name, personSchema) // Person.name === 'Person'
```

```javascript
// User.js
import mongoose, { Schema } from 'mongoose'
import classToSchema from 'class-to-mongoose-schema'

import { Person } from 'Person'

export class User extends Person {
	constructor(args) {
		super(args)

		this.username = String
		this.password = String
	}

	secure(args) { // Example method
		// ...
	}

	static getAll() { // Example static method
		return mongoose.model('User').find()
	}
}

const userSchema = classToSchema(new User(args))

export { userSchema }

export default mongoose.model(User.name, userSchema) // User.name === 'User'
```
