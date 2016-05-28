module.exports = {
  /**
   * Install function run in we.js site install.
   *
   * @param  {Object}   we    we.js object
   * @param  {Function} done  callback
   */
  install: function install(we, done) {
    we.log.info('Starting project install...');

    we.utils.async.series([
      function registerUser1(done) {
        var user1 = {
          username: 'administrator',
          biography: 'The administrator user account!',
          email: 'contato@albertosouza.net',
          password: '123', // change after install
          displayName: 'Administrator',
          language: 'en-us',
          active: true,
          roles: ['administrator']
        };

        we.log.info('I will create the user: ', user1);

        we.db.models.user.findOrCreate({
          where: { id :1 }, defaults: user1
        }).then(function (r) {
          var user = r[0];
          we.log.info('New User with id: ', user.id);

          we.db.models.password.create({
            userId: user.id,
            password: user1.password,
            confirmPassword: user1.password
          }).then(function () {
            return done();
          }).catch(done);
        }).catch(done);
      }
    ], done);
  }
};