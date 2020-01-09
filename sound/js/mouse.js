var mouseContext = null;
var mouseOsc = null;
var mouseGain = null;
var currentNoteObj = null;

$(document).ready(function()
{
  // Mouse listeners
  $(".note").mousedown(function() { clickNote(this); });
  $(window).mouseup(unclick);
});

/*
 * React to note click
 */
function clickNote(note)
{
  if(currentNoteObj !== null)
    return;
  let frequency = translateFrequency(parseInt($("#octave").val()), parseFloat($(note).data('freq')));
  playMouse($("#waveType").val(), frequency);
  currentNoteObj = $(note);
  $(currentNoteObj).addClass('highlight');
}

/*
 * React to note unclick
 */
function unclick()
{
  stopMouse(parseFloat($("#pedalTime").val()));
  $(currentNoteObj).removeClass('highlight');
  currentNoteObj = null;
}

/*
 * Play a note (when user clicks on a piano key)
 */
function playMouse(waveType, frequency)
{
  if(typeof waveType !== "string")
    waveType = "sine";

  if(mouseContext === null)
    mouseContext = new AudioContext();
  mouseOsc = mouseContext.createOscillator();
  if(waveType === "custom")
    mouseOsc.setPeriodicWave(buildCustomWave(mouseContext));
  else
    mouseOsc.type = waveType;
  mouseOsc.frequency.value = frequency;
  mouseGain = mouseContext.createGain();
  mouseOsc.connect(mouseGain);
  mouseGain.connect(mouseContext.destination);
  mouseOsc.start(0);
}

/*
 * Stop note (when user releases mouse)
 */
function stopMouse(decreaseTime)
{
  if(mouseContext === null)
    return;

  if(typeof decreaseTime !== "number")
    decreaseTime = 0.04;

  mouseGain.gain.exponentialRampToValueAtTime(0.00001, mouseContext.currentTime + decreaseTime);
}
