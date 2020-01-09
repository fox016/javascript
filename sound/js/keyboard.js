var keycodeMap = {};
var keyboardContext = null;
var oscMap = {};
var gainMap = {};

$(document).ready(function()
{
  // Build map from keycodes to piano note objects
  $(".note").each(function() {
    keycodeMap[$(this).data('keycode')] = $(this);
  });

  // Key listeners
  $(window).keydown(function(keyEvent){ pressKey(keyEvent.keyCode); });
  $(window).keyup(function(keyEvent){ releaseKey(keyEvent.keyCode); });
});

/*
 * React to pressed keyboard key
 */
function pressKey(keycode)
{
  if(!(keycode in keycodeMap))
    return;
  let note = keycodeMap[keycode];
  let frequency = translateFrequency(parseInt($("#octave").val()), parseFloat($(note).data('freq')));
  playKeyboard($("#waveType").val(), frequency, keycode);
  $(note).addClass('highlight');
}

/*
 * React to released keyboard key
 */
function releaseKey(keycode)
{
  if(!(keycode in keycodeMap))
    return;
  let note = keycodeMap[keycode];
  stopKeyboard(parseFloat($("#pedalTime").val()), keycode);
  $(note).removeClass('highlight');
}

/*
 * Play a note (when user presses corresponding keyboard key)
 */
function playKeyboard(waveType, frequency, keycode)
{
  if(typeof waveType !== "string")
    waveType = "sine";

  if(keycode in oscMap)
    return;

  if(keyboardContext === null)
    keyboardContext = new AudioContext();
  oscMap[keycode] = keyboardContext.createOscillator();
  if(waveType === "custom")
    oscMap[keycode].setPeriodicWave(buildCustomWave(keyboardContext));
  else
    oscMap[keycode].type = waveType;
  oscMap[keycode].frequency.value = frequency;
  gainMap[keycode] = keyboardContext.createGain();
  oscMap[keycode].connect(gainMap[keycode]);
  gainMap[keycode].connect(keyboardContext.destination);
  oscMap[keycode].start(0);
}

/*
 * Stop a note (when user releases corresponding keyboard key)
 */
function stopKeyboard(decreaseTime, keycode)
{
  if(keyboardContext === null)
    return;

  if(typeof decreaseTime !== "number")
    decreaseTime = 0.04;

  gainMap[keycode].gain.exponentialRampToValueAtTime(0.00001, keyboardContext.currentTime + decreaseTime);
  delete oscMap[keycode];
  delete gainMap[keycode];
}
