<?php

$terms = array(
  array("name" => "eyes", "img" => "img/eyes.png"),
  array("name" => "ears", "img" => "img/ears.png"),
  array("name" => "mouth", "img" => "img/mouth.png"),
  array("name" => "heart", "img" => "img/heart.png"),
  array("name" => "mind", "img" => "img/mind.png"),
  array("name" => "hand", "img" => "img/hand.png"),
  array("name" => "arm", "img" => "img/arm.png"),
  array("name" => "leg", "img" => "img/leg.png"),
);

$size = 5;

?>
<!DOCTYPE HTML>
<html>
<head>
</head>
<body>
  <table>
    <thead><tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr></thead>
    <tbody>
    <?php
    for($row = 0; $row < $size; $row++)
    {
    ?>
      <tr>
      <?php
      for($col = 0; $col < $size; $col++)
      {
      ?>
        <td>
          <div class='image'><img src='<?php $index = rand(0, count($terms)-1); echo $terms[$index]['img']; ?>'></div>
          <div class='name'><img src='<?php echo $terms[$index]['name'];?>'></div>
        </td>
      <?php
      }
      ?>
      </tr>
    <?php
    }
    ?>
    </tbody>
  </table>
</body>
</html>
