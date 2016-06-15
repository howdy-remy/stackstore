'use strict';
var router = require('express').Router();
module.exports = router;
var Order = require('../../db/models/order.js');
var User = require('../../db/models/user.js');
var Products = require('../../db/models/product.js');

var stripe = require('stripe')('sk_test_6LvVfVvp7tjUWeEDvN5NOt5D');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://wwwgh1604%40gmail.com:gracehopper@smtp.gmail.com');

var Promise = require('bluebird');

router.post('/checkout', function(req, res, next) {
    Promise.all([
            User.findOrCreate({ where: { email: req.body.email } }), //1) find or create user (find if existing user, create if anon user)
            Order.create(req.body) //2) create order in Orders model with shipping info
        ])
        .spread(function(user, order) {
            return order.setUser(user[0]); //associate the order and user
        })
        .then(function(order) {
            Promise.map(req.session.trolley, function(item) { //2) update Products model to reduce the stock quantities by the number of items ordered
                return Products.findOne({ where: { id: item.id } })
                    .then(function(originalProduct) {
                        return originalProduct.update({ quantity: originalProduct.quantity - item.amount }, { where: { id: item.id } });
                    })
                    .then(function(updatedProduct) { //3) update the price and amount fields in the OrderProducts model
                        return order.addProduct(updatedProduct, { price: item.price, amount: item.amount });
                    });
                }) //end of promise.map
                .then(function() {
                    // set up nodemailer transport
                    // console.log("the order is", order)
                    // console.log("the trolley is", req.session.trolley)
                    var address = order.dataValues.firstName + " " + order.dataValues.lastName
                                + "\n" + order.dataValues.street + " \n"
                                + order.dataValues.city + ", " + order.dataValues.state + " " + order.dataValues.zip;
                    var orderSum = "";
                    req.session.trolley.forEach(function(tItem){
                      orderSum+= "Item: " + tItem.title + "\nQuantity: " + tItem.amount + "@" + tItem.price + " each.\n";
                    });
                    var mailOptions = {
                      from: '"Weasleys Wizard Wheezes 🎩" <wwwgh1604@gmail.com>', // sender address
                      to: req.body.email, // list of receivers
                      subject: 'Your order has been placed!', // Subject line
                      text: 'Hi ' + order.dataValues.firstName + ', your order has been placed and the details are below. Thanks for shopping with us! You will receive another email when your order has shipped.\n\nAddress:\n\n' + address + "\n\nOrder Summary:\n\n" + orderSum // plaintext body
                  };

                  // send mail with defined transport object
                  transporter.sendMail(mailOptions, function(error, info){
                      if(error){
                          return console.log(error);
                      }
                      console.log('Message sent: ' + info.response);
                  });

                    return order;
                })
                .then(function() {
                    req.session.trolley = []; //4) clear the trolley on the session
                    res.send(order);
                })
                .catch(next);
        });
});

router.post('/chargecard', function(req, res, next){
	var stripeToken = req.body.stripe.id;
	var orderId = req.body.order.id;

	Order.findOne({where:{id: orderId}})
	.then(function(order){
		return order.getOrderTotal();
	}).then(function(total){
		var charge = stripe.charges.create({
		  amount: total*100, // amount in cents, again
		  currency: "usd",
		  source: stripeToken,
		  description: "Example charge"
		}, function(err, charge) {
		  if (err && err.type === 'StripeCardError') {
		    console.log('the card has been declined');
		  }
		});
	});
});

//get all orders
router.get('/', function (req, res, next) {

  //for query string requesting orders from a specific user
  var whereObj = Object.keys(req.query).length ? req.query : {};

  Order.findAll({ where: whereObj })
    .then(function (orders) {
      res.send(orders);
    })
    .catch(next);

});

//add a new order
router.post('/', function (req, res, next) {

  Order.create(req.body)
    .then(function (createdOrder) {
      res.status(201).send(createdOrder);
    })
    .catch(next);

});

//get a single order
router.get('/:id', function (req, res, next) {

  Order.findOne({ 
    where: { 
      id: req.params.id 
    }, 
    include: [Products]
   })
    .then(function (foundOrder) {
      if (!foundOrder) {
        var error = new Error();
        error.status = 404;
        throw error;
      }
      res.send(foundOrder);
    })
    .catch(next)

});

//update an order
//only admins should be able do this!
router.put('/:id', function (req, res, next) {
// created, processing, completed, cancelled
// processing = your order has been shipped
// completed = your order has been delivered
  Order.findById(req.params.id)
    .then(function (foundOrder) {
      if (!foundOrder) {
        var error = new Error();
        error.status = 404;
        throw error;
      }
      return foundOrder.update(req.body);
    })
    .then(function(updatedOrder) {
      User.findById(updatedOrder.userId)
      .then(function(user){
        var output = "";
        var subject = "";
        switch (req.body.status) {
          case 'processing':
            subject = "Your order is on its way!";
            output = "We've sent out your order and you should get it soon!";
            break;
          case 'completed':
            subject = "Your order is completed!";
            output = "Your items have been delivered and that completes your order. Thanks again for shopping with us!";
            break;
          case 'cancelled':
            subject = "Your order has been cancelled.";
            output = "Just letting you know that we've cancelled your order. Hope you shop again with us soon!";
            break;
          default:
            //
        }
        
        var mailOptions = {
            from: '"Weasleys Wizard Wheezes 🎩" <wwwgh1604@gmail.com>', // sender address
            to: user.dataValues.email, // list of receivers
            subject: subject, // Subject line
            text: output // plaintext body
            // html: '<b>Hello world 🐴</b>' // html body
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
        res.send(updatedOrder);
      });
    })
    .catch(next);

});

//delete an order
//only admins should be able to do this!
router.delete('/:id', function (req, res, next) {

  Order.findById(req.params.id)
    .then(function (foundOrder) {
      if (!foundOrder) {
        var error = new Error();
        error.status = 404;
        throw error;
      }
      return foundOrder.destroy();
    })
    .then(function () {
      res.sendStatus(204);
    })
    .catch(next);
});
