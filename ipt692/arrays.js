// After page loads, execute this to initialize
$(document).ready(function()
{
  var myList = ["eggs", "milk", "cheese", "apples"];
  //myList[0] is “eggs”
  //myList[3] is “apples”
  //myList.length is 4
  //myList[myList.length] is undefined - past the end of the array
  console.log(myList);
  console.log(myList[0]);
  console.log(myList[myList.length]);
  console.log(myList[myList.length-1]);

  // Use push function to append to arrays
  myList.push("yogurt");
  console.log(myList);

  // Use FOR loops to iterate through arrays
  // Then use myList[i] inside the loop to access the list element for the current iteration
  for(var i=0; i < myList.length; i++)
  {
    $("#shoppingList").append("<li>" + myList[i] + "</li>");
  }

  //Parallel arrays
  var names = ["Bob", "Alice", "Eve", "Jim"];
  var ages = [21, 24, 27, 23];
  var gpas = [2.89, 3.71, 3.56, 3.36];

  for(var i = 0; i < names.length; i++)
  {
    $("#peopleTable tbody").append("<tr><td>" + names[i] + "</td><td>" + ages[i] + "</td><td>" + gpas[i] + "</td></tr>");
    $("#people").append("<div>" + names[i] + " is " + ages[i] + " years old and has a GPA of " + gpas[i] + "</div>");
  }

  // Sort
  myList.sort(); // Sort A-Z
  console.log(myList);
  myList.reverse(); // Sort Z-A
  console.log(myList);
});
