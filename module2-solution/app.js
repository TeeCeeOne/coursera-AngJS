(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['$scope','ShoppingListCheckOffService'];
function ToBuyController($scope,ShoppingListCheckOffService) {
  var buyCtrl = this;

  buyCtrl.items = ShoppingListCheckOffService.get2BuyItems();
  buyCtrl.bought = function(buyItem,itemIdex) {
    ShoppingListCheckOffService.addToBoughtList(buyItem);
    ShoppingListCheckOffService.removeFromToBuyList(itemIdex);
  }
  if (ShoppingListCheckOffService.get2BuyItems.length === 0)  {
    // buyCtrl.emptyMessage = "Everything is bought!";
  }
}

AlreadyBoughtController.$inject = ['$scope','ShoppingListCheckOffService'];
function AlreadyBoughtController($scope,ShoppingListCheckOffService) {
  var boughtCtrl = this;

  boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
  var service = this;
  var buyingList = [
    {
      name: "Teabag",
      quantity: "20"
    },
    {
      name: "Cereal",
      quantity: "1"
    },
    {
      name: "Banana",
      quantity: "5"
    },
    {
      name: "Chocolate",
      quantity: "2"
    },
    {
      name: "Nut",
      quantity: "200"
    }
  ];

  var boughtList = [];
  // var emptyMessage = "";

  service.get2BuyItems = function() {
     return buyingList;
  };

  service.getBoughtItems = function() {
     return boughtList;
  };

  service.getEmptyMessage = function() {
    return emptyMessage;
  }

  service.addToBoughtList = function (buyItem) {
      var newItem = {
        name: buyItem.name,
        quantity: buyItem.quantity
      };
      boughtList.push(newItem);
  }

  // service.checkBuyList = function() {
  //   if ((buyingList === undefined) || (buyingList.length = 0)) {
  //     emptyMessage = "Everything is bought!"
  //   }
  // }

  service.removeFromToBuyList = function (itemIdex) {
    buyingList.splice(itemIdex, 1);
  };

}

})();
