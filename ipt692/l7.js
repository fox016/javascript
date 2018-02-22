// This runs after the page loads
$(document).ready(function() {
  loadCarTable();
});

/*
 * This function refreshes the data in #carTable
 */
function loadCarTable()
{
/*
  var car1 = {}; // This is an object
  car1.make = "Toyota";
  car1.model = "Camry";
  car1.year = 2004;
  car1.price = "$6,500";
*/

/*
  var car1 = {make: "Toyota", model: "Camry", year: 2004, price: "$6,500"}; // This is an object with stuff already in it
*/

/*
  var cars = []; // This is an array
  cars.push({make: "Toyota", model: "Camry", year: 2004, price: "$6,500"});
  cars.push({make: "Toyota", model: "Sienna", year: 2014, price: "$16,500"});
  cars.push({make: "Dodge", model: "Ram", year: 2012, price: "$14,500"});
  cars.push({make: "Subaru", model: "Legacy", year: 2017, price: "$20,500"});
*/

  var cars = [
    {make: "Toyota", model: "Camry", year: 2004, price: "$6,500"}, // Each thing in the array is an object with stuff already in it
    {make: "Toyota", model: "Sienna", year: 2014, price: "$16,500"},
    {make: "Dodge", model: "Ram", year: 2012, price: "$14,500"},
    {make: "Subaru", model: "Legacy", year: 2017, price: "$20,500"},
  ]; // This is an array with stuff already in it

/*
  var cars = [
    {make: "Toyota", model: "Camry", year: 2004, colors:["blue", "green"], price: "$6,500"}, // This object has an array in it
    {make: "Toyota", model: "Sienna", year: 2014, colors:["red", "pink"], price: "$16,500"},
  ];
*/

  for(var i = 0; i < cars.length; i++)
  {
    var row = "<tr><td>" + cars[i].make + "</td><td>" + cars[i].model + "</td><td>" + cars[i].year + "</td><td>" + cars[i].price + "</td></tr>";
    $("#carTable tbody").append(row);
    var sqlStatement = "INSERT INTO cars (make, model, year, price) VALUES ('" + cars[i].make + "', '" + cars[i].model + "', '" + cars[i].year + "', '" + cars[i].price + "');";
    console.log(sqlStatement);
  }

/*
  var row = "<tr><td>" + car1.make + "</td><td>" + car1.model + "</td><td>" + car1.year + "</td><td>" + car1.price + "</td></tr>";
  $("#carTable tbody").append(row);
*/
}
