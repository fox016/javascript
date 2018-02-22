<?php

$terms = array(
  array("name" => "Eyes", "img" => "http://icons.iconarchive.com/icons/custom-icon-design/mono-general-4/128/eye-icon.png"),
  array("name" => "Ears", "img" => "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgZmlsbD0iIzAwMDAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDY1IDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjUgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzAwMDAwMCIgZD0iTTcuMDMzLDE3LjgzM0MxMS4xMTcsOS4wOSwxOS4wOS0wLjQzLDM0LjQ5NiwwLjAxNSAgYzMyLjM1NCwwLjkzNSwzNC41OTksMzMuNDU4LDI2LjYxOSw0OC45MUM1NC4zNjEsNjIuMDAzLDM3LjE3Niw3My41OTgsMzUuNjUsNzkuMzFjLTEuMjMyLDQuNjE1LTMuMTA1LDIwLjY3Mi0xNy40MzYsMjAuNjkgIEM2LjA2OCwxMDAuMDE1LTAuODUyLDkwLjY2OSwwLjA4Myw4MC4yMDFjMC42OS03LjcyMSw1Ljk2Mi0xNC4xOTksOS05Ljk2NWMzLjUzMSw0LjkxOC03LjUxNiw4Ljg2MS0yLjA4LDE3LjQ0MSAgYzIuNTI1LDMuOTg2LDUuOTg0LDYuNTQzLDExLjIyMSw2LjU0M2MxMC41MTIsMCwxMC43OC0xMy4xMzksMTIuOTA1LTE3LjAxYzMuNzM2LTYuODA2LDI1LjQxNy0yNC4zMTYsMjYuMzctNDIuNzQxICBjMC43NDgtMTQuNDU1LTcuNDY4LTI3LjcyMi0yNS42ODQtMjYuNjY3QzE0LjYwOSw4LjgsMTAuNzQ0LDIyLjgxOCwxMC4xMjEsMzAuMTY3Yy0wLjUxOCw2LjEwNywxLjQ4NCwxMi45MDUtMi4wODcsMTIuNzc3ICBDNC41NzIsNDIuODE4LDIuNjQsMjcuMjQyLDcuMDMzLDE3LjgzM3oiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzAwMDAwMCIgZD0iTTQwLjE2OCw0Ny40M2MyLjQ2MSwxLjEwNiw2LjY0MS01LjQ2OCw3Ljc5NC0xMS41MjggIGMxLjQzMy03LjUzOSwwLjMxMy0xNC4yNjgtNS45MjMtMTguODc4Yy0xMS40OC04LjQ5MS0yNS41Ni0xLjc0NC0yNy43MTIsMTEuMjYyYy0yLjI4MSwxMy43ODUsMTAuNjMzLDEyLjU1MSw2Ljc0LDIxLjkzNSAgYy0xLjE4OSwyLjg2OS01LjA0Miw2LjI1OS02LjUyMSw4LjczMmMtMi4xNzQsMy42MzMtMS4zMSw4LjUzOSwxLjg1NSwxMC40MzljNy41NjMsNC41NDMsMTYuMjQ0LTUuODczLDE3LjEwNy0xOC4xMzUgIGMwLjczNS0xMC40MjktMTMuMTA4LTE0LjU5LTEyLjI3LTIyLjQ1M2MwLjcyNi02Ljc5NSw2LjcxOC0xMS4wNzgsMTMuNjMtOS4zNTFjNi45MTMsMS43MjgsMTEuMDM0LDExLjU4OSw3LjQxOSwxOS43NTIgIEM0MC42MzEsNDIuOTQ4LDM3LjY3NSw0Ni4zMDksNDAuMTY4LDQ3LjQzeiI+PC9wYXRoPjwvc3ZnPg=="),
  array("name" => "Mouth", "img" => "https://d30y9cdsu7xlg0.cloudfront.net/png/273608-200.png"),
  array("name" => "Heart", "img" => "https://png.icons8.com/metro/1600/hearts.png"),
  array("name" => "Mind", "img" => "https://cdn2.iconfinder.com/data/icons/psychology/500/Psychology_14-256.png"),
  array("name" => "Hand", "img" => "http://icons.iconarchive.com/icons/icons8/ios7/256/Hands-Hand-icon.png"),
  array("name" => "Arm", "img" => "https://d30y9cdsu7xlg0.cloudfront.net/png/29606-200.png"),
  array("name" => "Leg", "img" => "https://png.icons8.com/metro/1600/leg.png"),
);

$size = 5;

$list = array();
$countMap = array();
for($i = 0; $i < ($size*$size); $i++)
{
  $index = rand(0, count($terms)-1);
  while(isset($countMap[$terms[$index]['name']]) && $countMap[$terms[$index]['name']] > ($size*$size / count($terms)))
      $index = rand(0, count($terms)-1);
  if(isset($countMap[$terms[$index]['name']]))
    $countMap[$terms[$index]['name']]++;
  else
    $countMap[$terms[$index]['name']]=1;
  $list[] = $terms[$index];
}

?>
<!DOCTYPE HTML>
<html>
<head>
  <style>
    table {
      border-collapse:collapse;
    }
    td {
      text-align:center;
      border:1px solid black;
    }
    .image img {
      margin:3px;
      width:30px;
      height:30px;
    }
    .name {
      margin:3px 10px;
    }
    #counts {
      display:none;
    }
  </style>
</head>
<body>
  <table>
    <thead><tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr></thead>
    <tbody>
    <?php for($row = 0; $row < $size; $row++) { ?>
      <tr>
      <?php for($col = 0; $col < $size; $col++) { ?>
        <td>
          <div class='image'><img src='<?php echo $list[$row+($col*$size)]['img']; ?>'></div>
          <div class='name'><?php echo $list[$row+($col*$size)]['name'];?></div>
        </td>
      <?php } ?>
      </tr>
    <?php } ?>
    </tbody>
  </table>
  <div id='counts'>
    <?php foreach($countMap as $name => $count) { ?>
      <div><?php echo "$name, $count";?></div>
    <?php } ?>
  </div>
</body>
</html>
