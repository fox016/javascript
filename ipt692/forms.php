<!DOCTYPE>
<html>
<head>
  <link rel='stylesheet' type='text/css' href='l4.css' />
</head>
<body>
  <!-- method can be GET or POST. GET means pass it in the URL. POST means hide it. Default is GET if you don't specify. -->
  <!-- action is a URL of a PHP page/script. Default is current PHP file if you don't specify. -->
  <form method='GET' action='display.php'>
    <input type='text' name='first_name' value='' placeholder='First Name'/> 
    <input type='text' name='last_name' value='' placeholder='Last Name'/> 
    <input type='text' name='favorite_color' value='' placeholder='Favorite Color'/> 
    <input type='submit' value='Submit This Form'/>
  </form>
</body>
</html>
