'use strict';

app.directive('productsItem', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/products/directives/products.item.directive.html',
    scope: {
      product: '=model'
    }

    // scope: {
    //   user: '=model',
    //   glyphicon: '@',
    //   iconClick: '&',
    //   afterRemove: '&'
    // },
    // link: function (scope, elem, attrs) {
    //   if (attrs.hasOwnProperty('isForm')) scope.isForm = true;
    //   if (attrs.hasOwnProperty('iconClick')) scope.hasIconClick = true;
    //   if (!scope.isForm) {
    //     var hasInitialized = false;
    //     scope.$watch('user', function () {
    //       if (!hasInitialized) hasInitialized = true;
    //       else scope.user.save();
    //     }, true);
    //   }
    //   scope.removeUser = function () {
    //     scope.user.destroy()
    //     .then(function () {
    //       scope.afterRemove();
    //     });
    //   };
    // }
  }
});
