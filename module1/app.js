(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckCtrl', LunchCheckCtrl);

LunchCheckCtrl.$inject = ['$scope'];
function LunchCheckCtrl($scope) {
  $scope.boxlist = '';
  $scope.myMsg = '';

  function calcItems(string) {
  // split returns an array of Strings
     return string.split(",").length;
  }

  function proveList() {
    if ($scope.boxlist == '') {
      return "Please enter data first";
    }
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
