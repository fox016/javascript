// After page loads, execute this to initialize
$(document).ready(function()
{
  // Append list of numbers to HTML body
  var num = 1;
  while(num <= 100)
  {
    $("#counting").append("<div class='number'>#" + num + "</div>");
    num++;
  }

  // Build dropdowns
  buildMonthDropdown();
  buildDayDropdown();
  buildYearDropdown(100);

  // Click listeners
  $("#goBtn").click(processDate);
  $("#clearBtn").click(clear);
});

// Append options 1-12 to #month dropdown
function buildMonthDropdown()
{
  var month = 1;
  while(month <= 12)
  {
    $("#month").append("<option>" + month + "</option>");
    month+=1; // month++ or month=month+1
  }

  /*
  for(var month=1; month <=12; month++)
  {
    $("#month").append("<option>" + month + "</option>");
  }
  */
}

// Append options 1-31 to #day dropdown
function buildDayDropdown()
{
  var day = 1;
  while(day <= 31)
  {
    $("#day").append("<option>" + day + "</option>");
    day+=1; // day++ or day=day+1
  }

  /*
  for(var day=1; day <=31; day++)
  {
    $("#day").append("<option>" + day + "</option>");
  }
  */
}

// Append options to #year dropdown
// Start at current year and go back yearCount # of years
// @param yearCount - # of years to go back from current year
function buildYearDropdown(yearCount)
{
  var date = new Date();
  var startYear = parseInt(date.getFullYear());
  for(var year = startYear; year > (startYear-yearCount); year--)
  {
    $("#year").append("<option>" + year + "</option>");
  }
}

// Get user input and build output regarding the input date
function processDate()
{
  var day = parseInt($("#day").val());
  var month = parseInt($("#month").val());
  var year = parseInt($("#year").val());
  var date = new Date(year + "-" + month + "-" + day);
  var dayOfWeek = date.getDay();
  if(dayOfWeek == 0)
    $("#dayOfWeek").val("Sunday");
  else if(dayOfWeek == 1)
    $("#dayOfWeek").val("Monday");
  else if(dayOfWeek == 2)
    $("#dayOfWeek").val("Tuesday");
  else if(dayOfWeek == 3)
    $("#dayOfWeek").val("Wednesday");
  else if(dayOfWeek == 4)
    $("#dayOfWeek").val("Thursday");
  else if(dayOfWeek == 5)
    $("#dayOfWeek").val("Friday");
  else if(dayOfWeek == 6)
    $("#dayOfWeek").val("Saturday");
  else
    $("#dayOfWeek").val("Error");
}

// Clear form
function clear()
{
  $("input").val("");
  $("select").val("");
}
