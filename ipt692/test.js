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

var x = 10;
var y = 5;
console.log(x + " + " + y + " = " + (x+y));
console.log(x + " - " + y + " = " + (x-y));
console.log(x + " * " + y + " = " + (x*y));
console.log(x + " / " + y + " = " + (x/y));
console.log(x + " % " + y + " = " + (x%y));
var x = 11, y = 3;
console.log(x + " % " + y + " = " + (x%y));

var x = 5;
console.log("x = " + x);
x += 2;
console.log("x = " + x);
x -= 3;
console.log("x = " + x);
x *= 5;
console.log("x = " + x);
x /= 2;
console.log("x = " + x);

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


/*
 * Functions
 */
