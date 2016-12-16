var users = require('../controllers/users.js');
var tasks = require('../controllers/tasks.js');

module.exports = function(app){
  app.post('/user', users.create); 
  app.post('/loggedUser', users.findLogged);
  app.get('/users', users.find); 
  app.put('/task', users.updateComplete);
  app.delete('/task', users.deleteTask);

  app.post('/task', tasks.create);
}