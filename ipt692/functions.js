// Process
function doTheThing()
{
  console.log("I did the thing just like you said");
}

doTheThing();
doTheThing();
doTheThing();
doTheThing();
doTheThing();

// One input
function showName(firstName)
{
    console.log("Hello, my name is " + firstName);
}

showName("Sally");
showName("Bob");
showName("Rachel");
showName("Jim");
showName("Becca");
showName("Sam");

// Two (or more) inputs
function showFullName(firstName, lastName)
{
    console.log("Hello, my name is " + firstName + " " + lastName);
}

showFullName("Sally", "Smith");
showFullName("Bob", "Barker");
showFullName("Rachel", "Ray");
showFullName("Jim", "Jenson");
showFullName("Becca", "Bradford");
showFullName("Sam", "Sorenson");

// Return a value
function getFullName(firstName, lastName)
{
  var fullName = firstName + " " + lastName;
  return fullName;
}

var name1 = getFullName("Sally", "Smith");
var name2 = getFullName("Bob", "Barker");
console.log("Our names are " + name1 + " and " + name2);

// Scope
// Note that x is changed within the function, but the number passed in as x doesn't change
function add1(x)
{
  x++;
}
var x = 10;
console.log("x = " + x);
add1(x);
console.log("x = " + x);

// Note that x is changed within the function, but the number passed in as x doesn't change
function addOne(x)
{
  x++;
  return x;
}
var x = 10;
console.log("x = " + x);
addOne(x);
console.log("x = " + x);
x = addOne(x);
console.log("x = " + x);

var n = 10;
console.log("n = " + n);
n = addOne(n);
console.log("n = " + n);

// Note that string1 is changed within the function, but the string passed in as string1 doesn't change
function addTwoStrings(string1, string2)
{
  string1 = string1 + " " + string2;
  return string1;
}

var firstName = "John";
var lastName = "Smith";
addTwoStrings(firstName, lastName);
console.log(firstName);
console.log(lastName);
var fullName = addTwoStrings(firstName, lastName);
console.log(fullName);

// Guess what the output will look like
var x = 10;
var n = 5;
function add10(x)
{
    x += 10;
    return x;
}
console.log("x = " + x);
console.log("n = " + n);
x = add10(n);
console.log("x = " + x);
console.log("n = " + n);

// Cannot access vars created inside of a function
function makeVar()
{
  var thisVar = 7.5; // Local, only exists inside of function
}
makeVar();
//console.log(thisVar);

var thatVar = 10;
function changeVar()
{
  thatVar += 15; // This will update the global variable
}
console.log(thatVar);
changeVar();
console.log(thatVar);
changeVar();
console.log(thatVar);
