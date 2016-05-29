var query = require('querystring');

module.exports.passport = {
  strategies: {
    // session
    local: {
      successCallback: function successCallback(req, res) {
       var backUrl = req.query.backUrl ? req.query.backUrl : '/';
        delete(req.query.backUrl);
        backUrl += backUrl.indexOf('?') > -1 ? '&' : '?';
        backUrl += query.stringify(req.query);

        console.log('>>vai para:',req.query.redirect_uri, backUrl);

        console.log('query\n', req.query);

        if (req.we.config.consumers[req.query.client_id]) {
          var consumer = req.we.config.consumers[req.query.client_id];

          if (consumer.redirect_uri[req.query.redirect_uri]) {
            console.log('consumer válido');
          }
        }

            // // redirect if are a html response
            // if (req.accepts('html')) {
            //   return res.goTo(res.locals.redirectTo || '/');
            // }

            // res.ok({ user: req.user});

        res.goTo(backUrl);
      }
    }
  }
}