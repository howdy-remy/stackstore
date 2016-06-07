'use strict';

var expect = require('chai').expect;
var db = require('../../../server/db/_db.js');
var Promise = require('bluebird');

var Index = require('../../../server/db');
var Product = require('../../../server/db/models/product.js');
var User = require('../../../server/db/models/user.js'); 
var Review = require('../../../server/db/models/review.js'); 

describe('Review', function(){
	before(function(){
		return db.sync({force: true});
	});

	var text = 'This item has wolves on it which makes it intrinsically sweet and worth 5 stars by itself, but once I tried it on, that’s when the magic happened. After checking to ensure that the shirt would properly cover my girth, I walked from my trailer to Wal-mart with the shirt on and was immediately approached by women. The women knew from the wolves on my shirt that I, like a wolf, am a mysterious loner who knows how to ‘howl at the moon’ from time to time (if you catch my drift!). The women that approached me wanted to know if I would be their boyfriend and/or give them money for something they called mehth. I told them no, because they didn’t have enough teeth, and frankly a man with a wolf-shirt shouldn’t settle for the first thing that comes to him.'

//should we combine belongs to user and belongs to product into one test spec? Approach would be to do a promise.all for user, product, and review. 
	it('belongs to a user', function() {
	    var user;
	    return User.create({ email: 'harrypotter@hogwarts.com'})
	      .then(function(u) {
	        user = u;
	        return Review.create({
	          text: text
	        });
	      })
	      .then(function(review) {
	        return review.setUser(user);
	      })
	      .then(function() {
	        return Review.findOne({ 
	          where: { text: text },
	          include: { model: User}
	        });
	      })
	      .then(function(review){
	        expect(review.userId).to.exist;
	        expect(review.user.email).to.equal('harrypotter@hogwarts.com');
	      });
	});

	it('belongs to a product', function() {
	    var product;
	    var reviewId;

		    return Product.create({ 
		    	title: 'Extendable Ears', 
		    	description: 'Listen in on any conversation', 
		    	price: 9.99, 
		    	quantity: 20, 
		    	category: ['Toys']
		    })
	      .then(function(p) {
	        product = p;
	        return Review.create({
	          text: text
	        });
	      })
	      .then(function(review) {
	      	reviewId = review.dataValues.id;
	        return review.setProduct(product);
	      })
	      .then(function() {
	        return Review.findOne({ 
	          where: { id: reviewId },
	          include: { model: Product }
	        });
	      })
	      .then(function(review){
	        expect(review.productId).to.exist;
	        expect(review.product.title).to.equal('Extendable Ears');
	      });

	});

	it('has text of type text', function(){
		return Review.create({
			text: text
		}).then(function(savedReview){
			expect(savedReview.text).to.equal(text);
		});
	});

}); //end of describe
