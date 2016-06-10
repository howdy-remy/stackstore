var router = require('express').Router();
var Review = require('../../db/models/review.js');
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

// get user by userid
router.get('/:userId', function (req, res, next) {
	User.findById(req.params.userId)
	.then(function(user){
		res.send(user);
	})
	.catch(next);
});
