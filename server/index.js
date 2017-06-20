const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mc = require( `${__dirname}/controllers/messages_controller`);
const fc = require( `${__dirname}/controllers/filter_controller` );

const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../public/build` ) );
app.use( session({
  secret: '@nyth!ng y0u w@nt',
  resave: false,
  saveUninitialized: false
}));

app.use( ( req, res, next ) => {
  const { session, method } = req;
  if ( !session.user ) {
    session.user = {
      messages: []
    };
  }

  if ( method === "POST" ) {
    fc.filter( req, res, next );
  } else {
    next();
  }
} );

const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );
app.get( `${messagesBaseUrl}/history`, mc.history );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );