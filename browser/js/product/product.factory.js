'use strict';

app.factory('ProductFactory', function ($http, $q) {

  var ProductFactory = {};

  function getData (res) { return res.data; }

  ProductFactory.fetchAll = function () {
    return $http.get('/api/products')
    .then(getData)
    .then(function (products) { 
      return products; 
    });
  };

  // ProductFactory.fetchById = function (id) {
  //   var url = '/api/products/' + id;    
  //   return $q.all([$http.get(url), $http.get(url + '/reviews')])
  //   .then( function (responses) { return responses.map(getData); })
  //   .then( function (results) {
  //     var product = results[0];
  //     var reviews = results[1];
  //     product.reviews = reviews;
  //     return product;
  //   });
  // };

  ProductFactory.fetchById = function (id) {
    return $http.get('/api/products/' + id)
    .then(getData)
    .then(function (product) {
      return product;
    });
  };  

  ProductFactory.fetchCategories = function () {
    var allCategories = [];
    var cats = []; 

    return $http.get('/api/products')
    .then(getData)
    .then(function (products) {
      for (var i = 0; i < products.length; i++) {
        for (var j = 0; j < products[i].category.length; j++) {
          if (cats.indexOf(products[i].category[j]) < 0) {
            cats.push(products[i].category[j]);
          } 
        }
      }
      cats.map(function(c) {
        allCategories.push({name: c, checked: false});
      })
      return allCategories;
    })
  };

  ProductFactory.createReview = function(data){
    console.log(data, "data")
    return $http.post('/api/reviews', data)
    .then(function (response) {
      var review = response.data;
      return review;
    });    
  }

  ProductFactory.fetchReviews = function(productId){
    return $http.get('/api/reviews/' + productId)
    .then(getData)
    .then(function (reviews) { 
      return reviews;
    });
  }

  return ProductFactory;

});
