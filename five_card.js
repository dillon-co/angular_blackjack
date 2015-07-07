(function(){
  "use strict";
  var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  var suits = ["C", "H", "D", "S"];

  function Game(){
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
  }

  Game.prototype.draw = function draw(){
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

  Game.prototype.cardVal = function cardVal(card){
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

  Game.prototype.getNumbers = function getNumbers(player, results){
    player.forEach(function(card){
      results.push(g.cardVal(card.substr(1,2)));
    });
  };

 Game.prototype.getSuits = function getSuits(player, results){
     for (var i=0; i<player.length; i++){
       results.push(player[i].charAt(0));
     }
 };

  Game.prototype.checkMatches = function checkMatches(arr, results){
    var sorted_arr = arr.sort();
    for (var i = 0; i < arr.length - 1; i++){
      if (sorted_arr[i + 1] === sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
  };

  Game.prototype.firstDraw = function firstDraw(){
    this.computer = ["HA", "HK", "HQ", "HJ", "H10"];
    this.player = [this.draw(), this.draw(), this.draw(), this.draw(), this.draw()];
  };

  Game.prototype.matches = function matches(person){
    var result1 = [];
    var result2 = [];
    this.checkMatches(person, result1);
    console.log(result1);
    this.checkMatches(result1, result2);
    console.log(result2);
    if (result1.length > 2){
        if (result2.length === 1){
          console.log("Hot Damn its a Full House!");
        } else if (result2.length === 2){
          console.log("DAMN! THATS A 4 OF A KIND!");
        } else if (result2.lenghth === 0){
          console.log("That's a three of a kind!");
        }
    } else if (result1.length === 2) {
        if (result2.length === 1){
          console.log("3 of a kind!");
        } else if (result2.length === 0){
          console.log("Two Pair!");
        }
    } else if (result1.length === 1){
      console.log("Pair of "+result1[0]+"'s");
    }
  };


  Game.prototype.highCard = function highCard(player1, player2){
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
        winner = "The computer has";
      }
      console.log(winner+" the high card");
  };

  Game.prototype.straight = function straight(player){
    var numbered_arr = [];
    var sequenced_arr = [];
    this.getNumbers(player, numbered_arr);
    var sorted_arr = numbered_arr.sort();
    for (var i = 0; i < player.length; i++){
      if(i === 0 && sorted_arr[i] === sorted_arr[i+1]-1){
          sequenced_arr.push(sorted_arr[i]);
      } else if (sorted_arr[i] === sorted_arr[i+1]-1 && sorted_arr[i] === sorted_arr[i-1]+1){
        sequenced_arr.push(sorted_arr[i]);
      } else if (i === sorted_arr.length-1 && sorted_arr[i] === sorted_arr[i-1]+1){
        sequenced_arr.push(sorted_arr[i]);
      }
    }
    if (sequenced_arr.length === sorted_arr.length){
      console.log("That's a straight!");
      return true;
    }
  };

  Game.prototype.flush = function flush(player){
    var results = [];
    var matchResult = [];
    this.getSuits(player, results);
     this.checkMatches(results, matchResult);
     if(matchResult.length === results.length-1){
       console.log("Mother of god its a flush.");
       return true;
    }
  };

  Game.prototype.straightFlush = function straightflush(player){
    if( this.straight(player) && this.flush(player) ) {
      console.log("Straight Flush!");
    }
  };

  Game.prototype.royalFlush = function royalFlush(player){
    var result1 = [];
    var royalty = 0;
    this.getNumbers(player, result1);
    result1.sort();
    royalty = result1.reduce(function(prev, curr){ return prev + curr }, 0);
    console.log(result1);
    if (royalty === 60 && this.flush(player)){
      console.log("$$$$$$$$ HOLY MOTHER OF MAYHEM YOU JUST GOT A ROYAL FLUSH!!!! $$$$$$$");
    }
  };

  var g = new Game();
  // console.log(Game.deck)
  g.firstDraw();
  // g.matches(g.computer);
  // g.matches(g.player);
  // g.highCard(g.player, g.computer);
  // g.straight(g.computer);
  // g.flush(g.computer);
  g.straightFlush(g.computer);
  g.royalFlush(g.computer)
}());
