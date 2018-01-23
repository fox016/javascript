/*
 * Numbers
 */
var m = 7;
var x = 8;
var b = 2;
y = m * x + b; // Linear solution for given (m, b)

console.log("m = " + m);
console.log("x = " + x);
console.log("b = " + b);
console.log("y = " + y);
console.log("type of y: " + typeof(y));

var inf = Number.POSITIVE_INFINITY;
var ninf = Number.NEGATIVE_INFINITY;
var x = 10;
console.log(inf + " is infinite? " + Number.isFinite(inf));
console.log(x + " is infinite? " + Number.isFinite(x));
console.log(ninf + " is infinite? " + Number.isFinite(ninf));

// isInteger
var int = 5;
var float = 5.5;
console.log("type of int: " + typeof(int));
console.log("type of float: " + typeof(float));
console.log(int + " is an integer? " + Number.isInteger(int));
console.log(float + " is an integer? " + Number.isInteger(float));

var num = 10;
var den = 3;
var div = num / den;
console.log(num + " divided by " + den + " = " + div);
console.log(div + " is an integer? " + Number.isInteger(div));

// Math operations
var x = 10;
var y = 5;
console.log(x + " + " + y + " = " + (x+y));
console.log(x + " - " + y + " = " + (x-y));
console.log(x + " * " + y + " = " + (x*y));
console.log(x + " / " + y + " = " + (x/y));
console.log(x + " % " + y + " = " + (x%y));
var x = 11, y = 3; // Assign multiple values in single statement
console.log(x + " % " + y + " = " + (x%y));

// Quick reassignment operators
var x = 5;
console.log("x = " + x);
x += 2; // Same as x = x + 2
console.log("x = " + x);
x -= 3; // Same as x = x - 3
console.log("x = " + x);
x *= 5;
console.log("x = " + x);
x /= 2;
console.log("x = " + x);

// Math formulae
var radius = 3.5;
var area = Math.PI * Math.pow(radius, 2);
console.log("r = " + radius + ", area = " + area);

var a = 3;
var b = 4;
var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
console.log("a = " + a + ", b = " + b + ", c = " + c);

/*
 * Strings
 */
var firstName = "John"; // Use "
var middleName = 'Danger'; // Use '
var lastName= "Smith";
var fullName = firstName + " " + middleName + " " + lastName;
var sortName = lastName + ", " + firstName + " " + middleName;
console.log("Full name: " + fullName);
console.log("Sort name: " + sortName);
console.log("Preferred name: " + firstName + " " + lastName);

// Multiline
var multilineHaiku = "Flying octopus:\nEither in water or air\nIt never belongs";
console.log("Here is my multiline haiku--\n\n" + multilineHaiku);

var name = "The Grim Reaper";
var occupation = "Mortician";
var salary = "$53,000";
var phone = "(123) 456-7890";
var email = "dont_fear_the_reaper@blueoystercult.com";
// Dealing with " and ' inside of strings
var favoriteQuote = '"Seasons don\'t fear the reaper; nor do the wind, the sun, or the rain." - Blue Oyster Cult';
var favoriteQuote2 = "\"Seasons don't fear the reaper; nor do the wind, the sun, or the rain.\" - Blue Oyster Cult";
console.log(name + "\n" + occupation + "\n" + salary + "\n" + phone + "\n" + email + "\n" + favoriteQuote + "\n" + favoriteQuote2 + "\n" + favoriteQuote.length);

// Type error
var x = "1";
var y = 2;
console.log(x + " + " + y + " = " + (x+y)); // Try to avoid adding strings and numbers together
console.log("The type of " + x + " is " + typeof(x));
console.log("The type of " + y + " is " + typeof(y));
console.log("The type of " + (x+y) + " is " + typeof((x+y)));

// Convert types
var input1 = "28594"
var input2 = "92358"
console.log("For strings: " + input1 + " + " + input2 + " = " + (input1+input2));
input1 = parseFloat(input1); // Use parseFloat to convert a string to a number
input2 = parseFloat(input2);
console.log("For numbers: " + input1 + " + " + input2 + " = " + (input1+input2));

// Substrings and string indexes (0-indexed)
var foxString = "The quick red fox jumped over the lazy brown dogs."
console.log(foxString);
console.log("length: " + foxString.length);
console.log("substring 0-17: " + foxString.substring(0, 17));
console.log("substring 10-17: " + foxString.substring(10, 17));
// These three all behave the same
console.log("substring 34-50: " + foxString.substring(34, 50));
console.log("substring 34: " + foxString.substring(34));
console.log("substring 34-end: " + foxString.substring(34, foxString.length));

// Replace
var lyric = "Seasons don't fear the reaper";
var newLyric = lyric.replace("Seasons don't", "The wind doesn't");
console.log(lyric);
console.log(newLyric);

// Find
console.log(lyric);
console.log(lyric.indexOf("fear"));
console.log(lyric.indexOf("Sea"));
console.log(lyric.indexOf("reaper"));
console.log(lyric.indexOf("r"));
console.log(lyric.lastIndexOf("r"));
console.log(lyric.indexOf("z"));

/*
 * Functions
 */
