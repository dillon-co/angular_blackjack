(function() {
  'use strict';
  var app = angular.module("app", ["game"]);


  function blackjackController($scope, Game){
    var g = new Game();
    $scope.draw = function(){
      g.firstDraw();
    };
    $scope.hit = function(){
      g.hit(g.player);
    };
    $scope.stay = function(){
      g.stay();
    };
    $scope.game = g;
  }

  blackjackController.$inject = ["$scope", "Game"];

  app.controller("blackjack", blackjackController);

  angular.bootstrap(document.body, ["app"], {strictDi: true});
}());
