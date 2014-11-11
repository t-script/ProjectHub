/**
 * LoginController
 *
 * @description :: Used to login or logout user
 */

module.exports = {

  loadBoard: function (req, res) {
    res.locals.layout = '../views/layoutApp';
    return res.view('application/kanban');
  }
};

