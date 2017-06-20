const notAllowed = [ 'poo', 'butt' ];

module.exports = {
  filter: ( req, res, next ) => {
    while ( notAllowed.find( word => req.body.text.includes(word) ) ) {
      const badWord = notAllowed.find( word => req.body.text.includes(word) );
      req.body.text = req.body.text.replace( badWord, '*'.repeat( badWord.length ) );
      req.session.user.warnings++;
    }

    next();
  }
};