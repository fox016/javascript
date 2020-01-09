var contextCount = 0;

$(document).ready(function()
{
  // Show/hide custom wave values
  $("#waveType").change(function()
  {
    if($(this).val() == "custom")
      $(".customWave").show();
    else
      $(".customWave").hide();
  });

  // Arrow keys change octaves
  $(window).keydown(function(keyEvent)
  {
    if(keyEvent.keyCode == 38)
      $("#octave").val(Math.min(parseInt($("#octave").val())+1, 8));
    else if(keyEvent.keyCode == 40)
      $("#octave").val(Math.max(parseInt($("#octave").val())-1, 0));
  });
});

/*
 * Adjust frequency to match given octave
 * @param octave - integer 0 to 8
 * @param frequency - float
 */
function translateFrequency(octave, frequency)
{
  switch(octave)
  {
    case 0:
      return frequency/16;
    case 1:
      return frequency/8;
    case 2:
      return frequency/4;
    case 3:
      return frequency/2;
    case 4:
      return frequency;
    case 5:
      return frequency*2;
    case 6:
      return frequency*4;
    case 7:
      return frequency*8;
    case 8:
      return frequency*16;
    default:
      console.log("Error: Invalid octave (" + octave + ")");
      return frequency;
  }
}

/*
 * Build a custom wave for the given audioContext, using user-defined parameters
 */
function buildCustomWave(audioContext)
{
  let error = "";
  let real = $("#sineValues").val().split(",");
  let imag = $("#cosineValues").val().split(",");
  if(real.length != imag.length)
    error += "Please provide an equal amount of sine and cosine values. ";
  if(real.length < 2)
    error += "Please define at least 2 sine and cosine values (separated by commas without spaces). ";
  let normalize = $("#normalize").prop("checked");
  if(error !== "")
  {
    $("#sineValues").val("0,1");
    $("#cosineValues").val("0,0");
    real = $("#sineValues").val().split(",");
    imag = $("#cosineValues").val().split(",");
    console.log(error);
    alert(error);
  }
  return audioContext.createPeriodicWave(real, imag, {disableNormalization: !normalize});
}

/*
 * Draw the wave using the results of calcCustomWave
 */
function viewCustomWave()
{
  let table = calcCustomWave();
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let multWidth = canvas.width/3;
  let multHeight = (canvas.height / (2 * getGreatestAbsoluteValue(table))) - 10;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  for(let key in table)
  {
    if(key == 0)
    {
      ctx.moveTo(key * multWidth, canvas.height/2 - (table[key] * multHeight));
    }
    else
    {
      ctx.lineTo(key * multWidth, canvas.height/2 - (table[key] * multHeight));
      ctx.stroke();
    }
  }
  ctx.beginPath();
  ctx.strokeStyle = 'gray';
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.stroke();

  $("#graphDialog").dialog({
    modal: false,
    title: "View Custom Wave",
    width: canvas.width,
    height: canvas.height + 50,
    resizable: false,
  });
}

/*
 * Build an input-output table of what the custom wave would look like
 */
function calcCustomWave()
{
  let error = "";
  let real = $("#sineValues").val().split(",");
  let imag = $("#cosineValues").val().split(",");
  if(real.length != imag.length)
    error += "Please provide an equal amount of sine and cosine values. ";
  if(real.length < 2)
    error += "Please define at least 2 sine and cosine values (separated by commas without spaces). ";
  if(error !== "")
  {
    console.log(error);
    alert(error);
    return;
  }

  let table = {};
  for(let t = 0; t <= 3; t += 0.01)
  {
    let sum = 0.0;
    for (let k = 1; k < real.length; k++)
      sum += (parseFloat(real[k]) * Math.cos(2 * Math.PI * k * t)) + (parseFloat(imag[k]) * Math.sin(2 * Math.PI * k * t));
    table[t] = sum;
  }
  return table;
}

/*
 * Return the value in the key-value map that has the greatest absolute value
 */
function getGreatestAbsoluteValue(map)
{
  let greatest = 0;
  for (let key in map)
    if (Math.abs(map[key]) > greatest)
      greatest = Math.abs(map[key]);
  return greatest;
}
