/**
 * Main project controller
 */

module.exports = {
  index: function index(req, res) {
    // account project dont have an home page
    if (req.isAuthenticated()) {
      res.goTo('/user/'+req.user.id);
    } else {
      res.goTo('/login');
    }
  }
};