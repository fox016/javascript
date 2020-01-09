<?php
$waveTypes = array("sine", "square", "triangle", "sawtooth", "custom");
$notes = array(
  array("name" => "C", "frequency" => 261.6, "keycode" => 65),
  array("name" => "C#", "frequency" => 277.2, "keycode" => 87),
  array("name" => "D", "frequency" => 293.7, "keycode" => 83),
  array("name" => "D#", "frequency" => 311.1, "keycode" => 69),
  array("name" => "E", "frequency" => 329.6, "keycode" => 68),
  array("name" => "F", "frequency" => 349.2, "keycode" => 70),
  array("name" => "F#", "frequency" => 370.0, "keycode" => 84),
  array("name" => "G", "frequency" => 392.0, "keycode" => 71),
  array("name" => "G#", "frequency" => 415.3, "keycode" => 89),
  array("name" => "A", "frequency" => 440.0, "keycode" => 72),
  array("name" => "A#", "frequency" => 466.2, "keycode" => 85),
  array("name" => "B", "frequency" => 493.9, "keycode" => 74),
  array("name" => "C", "frequency" => 523.3, "keycode" => 75),
  array("name" => "C#", "frequency" => 554.4, "keycode" => 79),
  array("name" => "D", "frequency" => 587.3, "keycode" => 76),
  array("name" => "D#", "frequency" => 622.3, "keycode" => 80),
  array("name" => "E", "frequency" => 659.3, "keycode" => 186),
  array("name" => "F", "frequency" => 698.5, "keycode" => 222),
  array("name" => "F#", "frequency" => 740.0, "keycode" => 221),
  array("name" => "G", "frequency" => 784.0, "keycode" => 13),
);
$pos = 0;
$width = 60;
$prev = true;
$initWaveType = getVal($_GET, 'waveType', "sine");
$initOctave = getVal($_GET, 'octave', "4");
$initPedalTime = getVal($_GET, 'pedalTime', "1");
function getVal($array, $index, $default=null)
{
  if(isset($array[$index]))
    return $array[$index];
  return $default;
}
?>
<!DOCTYPE html>
<html>
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:300,400,500,700|Roboto+Condensed:300,400,500,700" rel="stylesheet" />

  <script type='text/javascript' src='js/common.js'></script>
  <script type='text/javascript' src='js/mouse.js'></script>
  <script type='text/javascript' src='js/keyboard.js'></script>
  <script type='text/javascript' src='js/playSong.js'></script>
  <link rel='stylesheet' type='text/css' href='piano.css' />
  <style>
  .note.white {
    width: <?php echo $width;?>px;
    height: <?php echo $width*5;?>px;
  }
  .note.black {
    width: <?php echo $width/2;?>px;
    height: <?php echo $width*3;?>px;
  }
  body {
    margin: 20px <?php echo $width;?>px;
  }
  </style>
</head>
<body>
  <div class='section'>
    <table class='key-val-table'>
      <tbody>
        <tr>
          <th>Wave Type</th>
          <td>
            <select id='waveType'>
              <?php foreach($waveTypes as $type) { ?>
                <option value='<?php echo $type;?>' <?php if($type==$initWaveType) echo "SELECTED";?>><?php echo ucfirst($type);?></option>
              <?php } ?>
            </select>
          </td>
          <th class='customWave'>Sine Values</th>
          <td class='customWave'>
            <input type='text' id='sineValues' value='0,1'>
          </td>
        </tr>
        <tr>
          <th>Octave</th>
          <td>
            <select id='octave'>
            <?php for($i = 0; $i <= 8; $i++) { ?>
              <option value='<?php echo $i;?>' <?php if($i==$initOctave) echo "SELECTED";?>><?php echo $i;?></option>
            <?php } ?>
            </select>
          </td>
          <th class='customWave'>Cosine Values</th>
          <td class='customWave'>
            <input type='text' id='cosineValues' value='0,0'>
            <button type='button' class='songBtn' onclick='viewCustomWave()'>View Wave</button>
          </td>
        </tr>
        <tr>
          <th>Pedal Time</th>
          <td>
            <input type='number' step='0.01' id='pedalTime' value='<?php echo $initPedalTime;?>' />
          </td>
          <th class='customWave'>Normalize</th>
          <td class='customWave'>
            <input type='checkbox' id='normalize' CHECKED>
          </td>
        </tr>
      </tbody>
    </table>
    <div id='songBtnDiv'>
      <button type='button' class='songBtn' onclick='playFurElise()'>Für Elise</button>
      <button type='button' class='songBtn' onclick='playLeadKindlyLight()'>Lead Kindly Light</button>
      <button type='button' class='songBtn' onclick='playPraiseToTheManSimple()'>Praise to the Man</button>
      <button type='button' class='songBtn' onclick='playPraiseToTheManComplex()'>Praise to the Man (SA)</button>
    </div>
    <div id='piano'>
      <?php foreach($notes as $i => $note) {
        $white = strlen($note['name']) == 1;
        if($prev && $white) // White to white
          $pos += $width;
        else if($prev && !$white) // White to black
          $pos += $width * (3/4);
        else // Black to white
          $pos += $width * (1/4);
        $prev = $white;
        ?>
        <div class='note <?php echo $white ? "white" : "black";?>' data-name="<?php echo $note['name'];?>" data-freq="<?php echo $note['frequency'];?>" data-keycode="<?php echo $note['keycode'];?>" style='left:<?php echo $pos;?>px'></div>
      <?php } ?>
    </div>
  </div>
  <!-- START GRAPH DIALOG -->
  <div id='graphDialog'>
    <canvas id='myCanvas' width='700' height='500'></canvas>
  </div>
  <!-- END GRAPH DIALOG -->
</body>
</html>
