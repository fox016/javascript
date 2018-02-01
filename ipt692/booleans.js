var x = true;
var y = false;

if(x) {
  console.log("x is true");
}

if(y) {
  console.log("y is true");
}

if(!x) {
  console.log("x is false");
}

if(!y) {
  console.log("y is false");
}

if(x && y) {
  console.log("x and y are true");
}

if(x || y) {
  console.log("x or y is true (maybe both, at least one for sure)");
}

var name = "Robert"; // Single = is the assignment operator
var count = 0;

if(name == "Robert") // Double == is the comparison operator (evaluates to a boolean)
{
  console.log("Welcome, Bob!");
  count++;
}
else {
  console.log("Welecome, " + name);
  count--;
}

console.log(name);
console.log(count);

var x = 4;
var y = 5;
if(x >= y) {
  console.log("x is greater than or equal to y");
}
if(y >= x) {
  console.log("y is greater than or equal to x");
}

var takeUmbrella = needUmbrella();
console.log("Take umbrella? " + takeUmbrella);

function needUmbrella()
{
  var p = getPrecipitation();
  if(p < 0.05) {
    console.log("You will not need an umbrella today");
    return false;
  }
  else if(p < 0.30) {
    console.log("You will probably not need an umbrella today");
    return false;
  }
  else if(p < 0.70) {
    console.log("You might want to take an umbrella today");
    return true;
  }
  else if(p < 0.90) {
    console.log("You will probably want to take an umbrella today");
    return true;
  }
  else {
    console.log("You will definitely want to take an umbrella today");
    return true;
  }
}

// Returns a percentage between 0.0 and 1.0 representing today's chance of precipitation
function getPrecipitation()
{
    return 0.02;
}

// Returns true if a person of 'age' can get a drivers license in 'state'
// For Idaho, North Dakota, and Montana age must be >= 15
// For New Jersey age must be >= 17
// All other states must be >= 16
function canDrive(age, state)
{
  if(age >= 15 && (state == "ID" || state == "ND" || state == "MT")) {
    return true;
  }
  else if(age >= 16 && state != "NJ") {
    return true;
  }
  else if(age >= 17) {
    return true;
  }
  else {
    return false;
  }
}

console.log("can drive 15 UT: " + canDrive(15, "UT"));
console.log("can drive 16 UT: " + canDrive(16, "UT"));
console.log("can drive 15 ID: " + canDrive(15, "ID"));
console.log("can drive 14 ID: " + canDrive(14, "ID"));
console.log("can drive 16 NJ: " + canDrive(16, "NJ"));
console.log("can drive 17 NJ: " + canDrive(17, "NJ"));
console.log("can drive 17 MT: " + canDrive(17, "MT"));
console.log("can drive 17 CA: " + canDrive(17, "CA"));
console.log("can drive 16 CA: " + canDrive(16, "CA"));
console.log("can drive 15 CA: " + canDrive(15, "CA"));
