console.log("Hello World");

var name = "Hello Jérémy";
var x = 12;
var result = (12 === x); //=== strictement égal compare aussi les types
var xString = "12";
var result2 = (12 == xString); //ne compare pas les types
var doub = 25.36;
var xToString = x.toString();
var nameLength = name.length;
var num = '12';
var numNumber = parseInt(num);
var position = name.indexOf("Jérémy");
var myBoolean = true;
var myBool = false;

var newName = name.replace("Hello", "Goodbye");

var resultBool = (x===5);

var fruit = ["Pomme", "Banane", "Orange"];


console.log(name);
console.log(newName);
console.log(x);
console.log(doub);
console.log("ToString : " + xToString);
console.log(nameLength);
console.log(numNumber);
console.log("position : " + position);
console.log(result);
console.log(result2);
console.log(resultBool);

function multiply(number1, number2)
{
    var resultMultiply = number1*number2; //local
    resultMultiply2 = number1*number2; //global
    return resultMultiply;
}

var object = {
    propertyName1: "Choupette",
    color: "green",
    age: 3
    };

var object2 = new Object();
object2.taille = 5;
object2.aboie = function(){console.log("Waf waf")};

object2.aboie();



function Dog(name, color, age)
{
    this.name = name;
    this.color = color;
    this.age = age;
    this.aboie = function() {
        console.log("Je suis " + this.name + ", je dis Waf");
    }
}

var caniche = new Dog("Buddy", "Blanc", 1);
var pitbull = new Dog("Rex", "Noir", 2);

console.log(caniche);
caniche.aboie();
console.log(pitbull);
pitbull.aboie();










