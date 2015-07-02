console.log("I am the captian of jS");

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
    this.computer = [];
    this.player = [];
  }

  Game.prototype.draw = function draw(){
    var deck = this.deck
    var index = Math.floor(Math.random() * deck.length)
    var card = deck[index];
    deck.splice(index, 1);
    return card;
  }

  Game.prototype.firstDraw = function firstDraw(){
    this.computer = [this.draw(), this.draw()];
    this.player = [this.draw(), this.draw()];
  }

  Game.prototype.cardVal = function cardVal(card){
    var card_arr = card.substr(1);
    if(card_arr == 'A'){
      return 11;
    }else if(card_arr == 'K' || card_arr == 'Q' || card_arr == 'J' ){
      return 10;
    }else{
    var to_num = parseInt(card_arr);
      return to_num;
    }
  }

  Game.prototype.handVal = function handVal(person){
    var total = 0;
    var values =  person.map(this.cardVal);
    return values.reduce(this.add)
  }

  Game.prototype.add = function add(num1, num2){
    return num1 + num2
  }

  Game.prototype.hit = function hit(person){
    person.push(this.draw())
  }

  Game.prototype.finish = function finish(){
    var playerVal = this.handVal(this.player)
    var computerVal = this.handVal(this.computer)
    if (playerVal > 21 || computerVal > playerVal && computerVal <= 21){
      console.log("House Wins!");
    }else if (computerVal > 21 || playerVal > computerVal){
      console.log("You Win!");
    } else {
      console.log("$$ Push! $$");
    }
  }

  Game.prototype.stay = function stay(){
    this.finish();
  }
  window.Game = Game;
}())
