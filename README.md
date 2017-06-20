<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we will take the afternoon project of the first day of Node and modify it to use `sessions`, custom `middleware`, and also use `query parameters`. We'll build a filter middleware that will censor words before being pushed to the `messages` array. We'll also modify the `update` and `delete` endpoints to use `query parameters` instead of URL parameters. Lastly, we'll use `sessions` to keep track of messages sent by a user during a session and build out an endpoint that will display the history of messages.

<b> insert image here </b>

## Step 1

### Summary

In this step, we'll use `npm` to install `express-session`, require it in our `server/index.js`, and configure our app to use `sessions`.

### Instructions

* Run `npm install` to get all the previous packages if you need to.
* Run `npm install --save express-session`.
* Open `server/index.js` and require `express-session` in a variable called `session`.
* Configure the app to use sessions using `app.use`.
  * The first parameter should be `session` invoked with an object as its first argument.
  * In the object define the value for `secret`, `resave`, and `saveUninitialized`.

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
  saveUninitialized: false
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

