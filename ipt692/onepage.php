<?php

$output = "";

if(isset($_POST['number'])) // If they hit go
{
  $num = $_POST['number']; // Create $num variable
  $num = intval($num); // intval is PHP's parseFloat (takes a string number and returns it as a number type)
  if(is_int($num) && $num !== "") // If this is a number
  {
    for($startNum = $num; $startNum >= 1; $startNum = $startNum-1) // Same as JavaScript
    {
      $verse = getVerse($startNum);
      $output = $output . $verse; // . is how to + 2 strings together in PHP
    }
  }
  else // If this is not a number
  {
    $output = "This is not a number";
  }
}
else // Initial load
{
}

function getVerse($number) // Functions same as JavaScript
{
  $nextNum = $number-1;
  if($number == 1) // If-else-if blocks are same as JavaScript
    return "<div class='verse'>$number bottle of milk on the wall, $number bottles of milk. Take one down, pass it around, $nextNum bottles of milk on the wall.</div>";
  else if($nextNum == 1)
    return "<div class='verse'>$number bottles of milk on the wall, $number bottle of milk. Take one down, pass it around, $nextNum bottle of milk on the wall.</div>";
  else
    return "<div class='verse'>$number bottles of milk on the wall, $number bottles of milk. Take one down, pass it around, $nextNum bottles of milk on the wall.</div>";
}

?>
<!DOCTYPE>
<html>
<style>
body,input,button { 
  font-size:1.5em;
}
input[type=submit] {
  font-size:1.5em;
}
.verse {
  display:block;
  margin:10px 0;
}
</style>
<body>
  <form method='POST'>
    <input type='number' name='number' placeholder='Enter a number' />
    <button type='submit'>Go</button>
  </form>
  <div id='lyrics-holder'>
  <?php echo $output; ?>
  </div>
</body>
</html>
