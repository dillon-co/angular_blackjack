(function(){
  "use strict";
  var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  var suits = ["C", "H", "D", "S"];

  function Game2(){
    var deck = [];
    for(var card = 0; card < cards.length; card++) {
        for (var suit = 0; suit < suits.length; suit++ ){
          var new_card = suits[suit]+cards[card];
          deck.push(new_card);
      }
    }
    this.deck = deck;
    this.cards = cards;
    this.computer = [];
    this.player = [];
    this.playerVal = { a: 0 };
    this.computerVal = { a: 0 };
    // this.winningVal;

  }

  Game2.prototype.draw = function draw(){
    var deck = this.deck;
    var index = Math.floor(Math.random() * deck.length);
    var card = deck[index];
    if (deck.length === 0){
      this.deckLength = "out of cards. Refresh to reshuffle :)";
    }else{
      deck.splice(index, 1);
      return card;
    }
  };
  Game2.prototype.fDraw = function fDraw(){
    this.computer = [this.draw(), this.draw(), this.draw(), this.draw(), this.draw()];
    this.player = [this.draw(), this.draw(), this.draw(), this.draw(), this.draw()];
  };

  Game2.prototype.cardVal = function cardVal(card){
    // var card_arr = card.substr(1);
    if(card === 'A'){
      return 14;
    }else if(card === 'K'){
      return 13;
    }else if(card === 'Q'){
      return 12;
    }else if(card === 'J'){
      return 11;
    }else{
      return parseInt(card);
    }
  };

  Game2.prototype.compare = function compare(a, b){
    var aVal = this.cardVal(a.substr(1,2));
    var bVal = this.cardVal(b.substr(1,2));
    if (aVal > bVal){
      return 1;
    } else if (aVal < bVal){
      return -1;
    } else{
      return 0;
    }
  };

  Game2.prototype.getNumbers = function getNumbers(player, results){
    player.forEach(function(card){
      results.push(g.cardVal(card.substr(1,2)));
    });
    return results;
  };

 Game2.prototype.getSuits = function getSuits(player, results){
     for (var i=0; i<player.length; i++){
       results.push(player[i].charAt(0));
     }
 };

  Game2.prototype.checkMatches = function checkMatches(arr, results){
    var sorted_arr = arr.sort(this.compare.bind(this));
    for (var i = 0; i < arr.length - 1; i++){
      if (sorted_arr[i + 1][1] === sorted_arr[i][1]) {
        results.push(sorted_arr[i]);
      }
    }
  };

  Game2.prototype.checkSuitMatches = function checkSuitMatches(arr, results){
    var sorted_arr = arr.sort();
    for (var i = 0; i < arr.length - 1; i++){
      if (sorted_arr[i + 1] === sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
  };


  Game2.prototype.matches = function matches(person, value){
    var result1 = [];
    var result2 = [];
    this.checkMatches(person, result1);
    console.log("Result1: "+result1+"\nResult2: "+result2);
    this.checkMatches(result1, result2);
    if (result1.length > 2){
        if (result2.length === 1){
          this.winner = "Hot Damn its a Full House!";
          value.a = 8;
        } else if (result2.length === 2){
          this.winner = "DAMN! THATS A 4 OF A KIND!";
          value.a = 7;
        } else if (result2.lenghth === 0){
          this.winner = "That's a three of a kind!";
          value.a = 4;
        }
    }else if (result1.length === 2){
        if (result2.length === 0){
          this.winner = "Two Pair!";
          value.a = 3;
        }
    }else if (result1.length === 1){
      this.winner = ("Pair of "+result1[0][1]+"'s");
      value.a = 2;
    }
  };


  Game2.prototype.highCard = function highCard(player1, player2, value){
      var playerResults = [];
      var playerHigh = 0;
      var computerResults = [];
      var computerHigh = 0;
      var winner;
      this.getNumbers(player1, playerResults);
      this.getNumbers(player2, computerResults);
      playerHigh = Math.max.apply(Math, playerResults);
      computerHigh = Math.max.apply(Math, computerResults);
      if (playerHigh === Math.max(playerHigh, computerHigh) ){
        winner = "You have";
      }else{
        winner = "The other player has";
      }
      this.winner = (winner+" the high card");
      value.a = 1;
  };

  Game2.prototype.straight = function straight(player, value){
    var numbered_arr = [];
    this.getNumbers(player, numbered_arr);
    var sorted_arr = numbered_arr.sort();
    var reducedVal = sorted_arr.reduce(function(total, current){
      return total + current;
    }, 0);
    var straightVal = sorted_arr[0]+(sorted_arr[0]+1)+(sorted_arr[0]+2)+(sorted_arr[0]+3)+(sorted_arr[0]+4);
    if (reducedVal === straightVal){
      this.winner = "That's a straight!";
      value.a = 5;
      return true;
    }
  };

  Game2.prototype.flush = function flush(player, value){
    var results = [];
    var matchResult = [];
    this.getSuits(player, results);
     this.checkSuitMatches(results, matchResult);
     if(matchResult.length === results.length-1){
       this.winner = "Mother of god its a flush.";
       value.a = 6;
       return true;
    }
  };

  Game2.prototype.straightFlush = function straightflush(player, value){
    if( this.straight(player, value) && this.flush(player, value) ) {
      this.winner = "Straight Flush!";
      value.a = 9;
    }
  };

  Game2.prototype.royalFlush = function royalFlush(player, value){
    var result1 = [];
    var royalty = 0;
    this.getNumbers(player, result1);
    result1.sort();
    royalty = result1.reduce(function(prev, curr){
      return prev + curr;
      }, 0);
    console.log(result1);
    if (royalty === 60 && this.flush(player, value)){
      this.winner = "$$$$$$$ HOLY MOTHER OF MAYHEM YOU JUST GOT A ROYAL FLUSH!!!! $$$$$$$";
      value.a = 10;
    }
  };

  Game2.prototype.compareHands = function compareHands(player, computer, value){
    // this.fDraw();
    // console.log(g.player);
    value.a = 0;
    this.highCard(player, computer, value);
    this.matches(player, value);
    this.straight(player, value);
    this.flush(player, value);
    console.log(value.a);
    this.straightFlush(player, value);
    this.royalFlush(player, value);
    // value = value.a;
    // console.log(this.winner);
    // console.log(value);
  };

  Game2.prototype.getWinner = function(valueA, valueB){
    if ( valueA < valueB ){
      this.winningVal = "The house has won!";
    } else if( valueB < valueA ){
      this.winningVal = "You beat the house!!";
    } else {
      this.winningVal = "It's a draw!"
    }
  };

  var g = new Game2();

  var app = angular.module("game2", []);
  app.service("Game2", function(){
    return Game2;
  });


  // console.log(computerVal.a);
  // console.log(playerVal.a);
  // g.fDraw();
  // console.log("Player: "+g.player);
  //
  // g.compareHands(g.player, g.computer, playerVal);
  //
  // console.log("\n\n\nComputer: "+g.computer);
  // g.compareHands(g.computer, g.player, computerVal);
  // g.getWinner();
  //
  // console.log("\n\n\n\n\n"+g.winningVal);
}());
