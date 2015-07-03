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

  function cardDirective($sce) {
    return {
      scope: {
        card: '@val'
      },
      restrict: 'E',
      template: "<div class='card' ng-click='hit()'>{{card[1]}} <span ng-bind-html='symbol'></span></div>",
      link: function link(scope, element, attr){
        // debugger;
        scope.suit = scope.card[0];
        if(scope.suit === 'H'){
          element.css("color", "red");
          scope.symbol = $sce.trustAsHtml("&hearts;");
        }else if(scope.suit === "D"){
          scope.symbol = $sce.trustAsHtml("&diams;");
          element.css("color", "red");
        } else if(scope.suit === "S"){
          scope.symbol = $sce.trustAsHtml("&spades;");
        } else if(scope.suit === "C"){
          scope.symbol = $sce.trustAsHtml("&clubs;");
        }
      }
    };
  }
  cardDirective.$inject = ["$sce"];

  app.directive('card', cardDirective);

  angular.bootstrap(document.body, ["app"], {strictDi: true});
}());
