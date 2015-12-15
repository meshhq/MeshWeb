'use strict';

angular.module('merc')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/nav-bar/nav-bar.html'
    };
  });
