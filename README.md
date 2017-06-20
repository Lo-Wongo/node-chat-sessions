<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we will take the afternoon project of the first day of Node and modify it to use `sessions`, custom `middleware`, and also use `query parameters`. We'll build a filter middleware that will censor words before being pushed to the `messages` array. We'll also modify the `update` and `delete` endpoints to use `query parameters` instead of URL parameters. Lastly, we'll use `sessions` to keep track of messages sent by a user during a session and build out an endpoint that will display the history of messages.

<b> insert image here </b>

## Setup

* Fork and clone this repository.
* `cd` into the project.
* Run `npm install`.

## Step 1

### Summary

In this step, we'll use `npm` to install `express-session`, require it in our `server/index.js`, and configure our app to use `sessions`.

### Instructions

* Run `npm install --save express-session`.
* Open `server/index.js` and require `express-session` in a variable called `session`.
* Configure the app to use sessions using `app.use`.
  * The first parameter should be `session` invoked with an object as its first argument.
  * In the object define the value for `secret`, `resave`, `saveUninitialized`, and `cookie.maxAge`.

### Solution

<details>

<summary> <code> server/index.js </code> </summary>

```js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mc = require( `${__dirname}/controllers/messages_controller` );

const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../public/build` ) );
app.use( session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10000 }
}));

const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
```

</details>

## Step 2

### Summary

In this step, we'll create custom middleware that will check to see if the session has a `user` object. If it doesn't, we'll add a user object that has a `messages` array on it.

### Instructions

* Open `server/index.js`.
* Create middleware that is a function that has a `req`, `res`, and `next` parameter.
* Inside the function check if `req.session` has a user property, if it doesn't add a user property that equals an object with a `messages` array on it.
* After the if statement, call `next`.

### Solution

<details>

<summary> <code> server/index.js </code> </summary>

```js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mc = require( `${__dirname}/controllers/messages_controller` );

const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../public/build` ) );
app.use( session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10000 }
}));

app.use( ( req, res, next ) => {
  const { session } = req;
  if ( !session.user ) {
    session.user = {
      messages: []
    };
  }
} );

const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
```

</details>

## Step 3

### Summary

In this step, we will create a filter middleware file that will handle filtering messages with profanity.

### Instructions

* Create a folder called `middleware` in `server/`.
* Create a file called `filter.js` in `server/middleware/`.
* Open `server/middleware/filter.js`.
* At the very top of the file create an array of words that should be censored.
* Use `module.exports` to export a function that has a `req`, `res`, and `next` parameter.
* Copy in the following filter code:
  * <details>
    
    <summary> <code> filter logic </code> </summary>
    
    ```js
    while ( notAllowed.find( word => req.body.text.includes(word) ) ) {
      const badWord = notAllowed.find( word => req.body.text.includes(word) );
      req.body.text = req.body.text.replace( badWord, '*'.repeat( badWord.length ) );
    }
    ```
    
    </details>
* Call `next` after the `while` loop.

### Solution



