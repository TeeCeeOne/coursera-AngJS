(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', MatchedItems)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


// directive definition
function MatchedItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundList: '=foundItems',
      title: '@title'
    }
  };

  return ddo;
}



NarrowItDownController .$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nidCtrl = this;
  nidCtrl.searchTerm = "";

  nidCtrl.narrowItDown = function(searchStr) {

    nidCtrl.searchedItems = [];

    console.log("searchStr",searchStr);
    var promise = MenuSearchService.getMatchedMenuItems(searchStr);
    promise.then(function (result) {
      nidCtrl.searchedItems = MenuSearchService.getMatchedItems();
      // this would ALWAYS end up with all items of the http-Service - why?
      // nidCtrl.myItems = result;
      console.log("nidCtrl.searchedItems",nidCtrl.searchedItems);
      console.log("itemsback#:",result.data.length);
      });
      // .catch(function (error) {
      //   console.log("Something went terribly wrong.");
      // };
    };

    nidCtrl.removeItem = function(itemIndex) {
      MenuSearchService.removeItem(itemIndex);
      nidCtrl.searchedItems = MenuSearchService.getMatchedItems();
    };

};


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var matchedItems = [];

  service.getMatchedMenuItems = function (searchTerm) {
    matchedItems = [];
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .success(
      function(data) {
        var allItems = data.menu_items;
        for (var i = 0; i < allItems.length; i++) {
          var desc = allItems[i].description;

          if (desc.toLowerCase().indexOf(searchTerm) !== -1) {
            var newItem = {
              name: allItems[i].name,
              shortName: allItems[i].short_name,
              desc: allItems[i].description
            }
            // service.matchedItems.push(newItem);
            matchedItems.push(newItem);
          }
        }

        console.log("found number:",matchedItems.length);
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

  service.removeItem = function (itemIndex) {
    matchedItems.splice(itemIndex, 1);
  };

  service.getMatchedItems = function () {
      return matchedItems;
  };

}


})();
