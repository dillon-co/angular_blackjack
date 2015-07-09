var person = {
  name: "foo",
  sayhi: function(){
    console.log("My name is "+this.name);
  }
};

var car = {
  name: "Heidi",
};

setTimeout(person.sayhi.bind(car), 1000);

person.sayhi();
