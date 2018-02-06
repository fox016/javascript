// This is the function that will be called after the entire document loads
$(document).ready(function() {
  // Put stuff in here to initialize page
  // jQuery "click" function tells browser to run this function when selector is clicked

  // selector is #goBtn (object where id='goBtn')
  // function to run is named funcSetup
  $("#goBtn").click(funcSetup);

  // selector is #clearBtn (object where id='clearBtn')
  // function to run is named clear
  $("#clearBtn").click(clear);
});

function funcSetup()
{
  var input1 = $("#input1").val();
  var input2 = $("#input2").val();
  var input3 = $("#input3").val();
  //var output = fahrToCel(parseFloat(input1));
  //var output = celToFahr(parseFloat(input1));
  //var output = addString(input1, input2);
  var output = findInString(input1, input2);
  //var output = getSubstring(input1, input2, input3);
  $("#output1").val(output);
}

function clear()
{
  $("input").val("");
}

function fahrToCel(f)
{
  var c = (f - 32) * (5/9);
  return c;
}

function celToFahr(c)
{
  var f = c * (9/5) + 32;
  return f;
}

function addString(s1, s2)
{
  return s1 + s2;
}

function findInString(search, str)
{
  return str.indexOf(search);
}

function getSubstring(str, start, end)
{
  // If start is blank or NaN (not a number) then set default to 0
  if(start == "" || isNaN(start))
    start = 0;
  // If end is blank or NaN (not a number) then set default to 1 past end of string
  if(end == "" || isNaN(end))
    end = str.length;

  return str.substring(start, end);
}
