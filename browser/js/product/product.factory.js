'use strict';

app.factory('ProductFactory', function ($http) {

  var ProductFactory = {};

  function getData(res) {
    return res.data; }

  ProductFactory.fetchAll = function () {
    return $http.get('/api/products')
      .then(getData);
  };

  ProductFactory.fetchById = function (id) {
    return $http.get('/api/products/' + id)
      .then(getData);
  };

  ProductFactory.fetchCategories = function () {
    return $http.get('/api/products/categories')
      .then(getData);
  };

  ProductFactory.createReview = function (data) {
    return $http.post('/api/reviews', data)
      .then(getData);
  };

  ProductFactory.fetchReviews = function (productId) {
    return $http.get('/api/reviews/' + productId)
      .then(getData);
  };

  return ProductFactory;

});
