var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var Promise = require('bluebird');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
	logging: false
});

var Product = require('../../../server/db/models/product');
var Category = require('../../../server/db/models/category');
var fakeCategory = { name: 'test category' };

describe('Category model', function () {

	beforeEach('Sync DB', function () {
		return db.sync({ force: true });
	});


	it('has a name', function (done) {
		Category.create(fakeCategory)
			.then(function (category) {
				expect(category.name).to.equal('test category');
				done();
			}).catch(done);
	});

	it('name is required', function (done) {
		Category.create()
			.catch(function (result) {
				expect(result).to.be.an('object');
				expect(result.message).to.contain('notNull Violation: name cannot be null');
				done();
			}).catch(done);
	});

	it('belongs to a product', function (done) {
		var product;
		var productId;

		Promise.all([
				Product.create({
					title: 'Extendable Ears',
					description: 'Listen in on any conversation',
					price: 9.99,
					quantity: 20,
				}),
				Category.create({
					name: 'Toys'
				})
			])
			.spread(function (product, category) {
				productId = product.dataValues.id;
				return product.addCategory(category);
			})
			.then(function(product){
				return Product.findOne({
					where: {id: productId},
					include: {model: Category}
				});
			})
			.then(function (product) {
				expect(product.categories).to.exist;
				expect(product.categories.length).to.equal(1);
				done();
			})
			.catch(done);
	});


});
