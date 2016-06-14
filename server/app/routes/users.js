var router = require('express').Router();
// var Review = require('../../db/models/review.js');
var User = require('../../db/models/user.js');
module.exports = router;

// get all users
router.get('/', function (req, res, next) {
	User.findAll()
	.then(function(users){
		res.send(users);
	})
	.catch(next);
});

router.param('userId', function (req, res, next, id) {
  User.findById(id)
  .then(user => {
    if (!user) throw new Error('not found!');
    req.user = user;
    next();
    return null; 
  })
  .catch(next);
});

router.get('/:userId', function (req, res) {
  res.json(req.user);
});

router.get('/:userId/orders', function (req, res, next) {
  req.user.getOrders() // instance method in the model
  .then(orders => res.json(orders))
  .catch(next);
});

//delete user
router.delete('/:id', function(req, res, next){
  //only admins should be able to do this!

  User.findById(req.params.id)
    .then(function (foundUser) {
      if (!foundUser) {
        var error = new Error();
        error.status = 404;
        throw error;
      }
      return foundUser.destroy();
    })
    .then(function () {
      res.sendStatus(204);
    })
    .catch(next);
});
