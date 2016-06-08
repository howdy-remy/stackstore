'use strict';

app.factory('ProductFactory', function ($http) {

  var ProductFactory = {};

  ProductFactory.fetchAll = function () {
    return $http.get('/api/products')
    .then(function (response) { 
      return response.data; 
    })
    .then(function (products) { 
      return products; 
    });
  };

  ProductFactory.fetchById = function (id) {
    return $http.get('/api/products/' + id)
    .then(function (response) { return response.data; })
    .then(function (product) {
      return product;
    });
  };

  return ProductFactory;

});
