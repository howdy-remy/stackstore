'use strict';

app.factory('ProductFactory', function ($http) {

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

  ProductFactory.fetchCategories = function () {
    var ProductFactory = {};
    var allCategories = [];
    return $http.get('/api/products')
    .then(function (response) { 
      return response.data; 
    })
    .then(function (products) {
    var cats = []; 
      for (var i = 0; i < products.length; i++) {
        for (var j = 0; j < products[i].category.length; j++) {
          if (cats.indexOf(products[i].category[j]) < 0) {
            cats.push(products[i].category[j]);
          } 
        }
      }
      cats.map(function(c) {
        allCategories.push({name: c, checked: false})
      })
      
      return allCategories;
    })

  };


  return ProductFactory;

});
