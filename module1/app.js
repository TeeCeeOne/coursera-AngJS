(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckCtrl', LunchCheckCtrl);

LunchCheckCtrl.$inject = ['$scope'];
function LunchCheckCtrl($scope) {
  $scope.boxlist = 'dd';
  $scope.myMsg = proveList();

  function calcItems(string) {
  // split returns an array of Strings
     return string.split(",").length;
  }

  function proveList() {
    if (calcItems($scope.boxlist) <= 3) {
      return "Enjoy!";
    } else {
      return "Too much!";
    }
  }

  $scope.displayMsg = function() {
    var userMsg = proveList();
    $scope.myMsg = userMsg;
  }
}
})();
