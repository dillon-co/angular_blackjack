(function() {
  'use strict';
  var app = angular.module("app", ["game", "game2"]);


  function blackjackController($scope, Game){
    var g = new Game();
    $scope.deck = g.deck;
    $scope.draw = function(){
      g.firstDraw();
    };
    $scope.hit = function(){
      g.hit(g.player);
    };
    $scope.stay = function(){
      g.stay(g.computer);
      g.computer.forEach(function(card){
        $scope.deck.push(card);
      });
      g.player.forEach(function(card){
        $scope.deck.push(card);
      });
    };
    $scope.game = g;
  }
  blackjackController.$inject = ["$scope", "Game"];
  app.controller("blackjack", blackjackController);

  function fivecardController($scope, Game2){
    var g = new Game2();
    $scope.deck = g.deck;
    $scope.draw = function(){
      g.fDraw();
    };
    $scope.playerfinish = function(){
      g.compareHands(g.player, g.computer, g.playerVal);
    };
    $scope.computerfinish = function(){
      g.compareHands(g.computer, g.player, g.computerVal);
    };
    $scope.getWinner = function(){
      g.compareHands(g.player, g.computer, g.playerVal);
      g.compareHands(g.computer, g.player, g.computerVal);
      g.getWinner(g.playerVal.a, g.computerVal.a)
    }
    $scope.winningVal = g.winningVal
    $scope.game = g;

  }

  fivecardController.$inject = ["$scope", "Game2"];
  app.controller("fivecard", fivecardController);

  function cardDirective($sce) {
    return {
      scope: {
        card: '@val'
      },
      restrict: 'E',
      template: "<div class='card' ng-click='hit()'>{{card[1]}}{{card[2]}} <span ng-bind-html='symbol'> </span></div>",
      link: function link(scope, element){
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
