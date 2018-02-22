<!DOCTYPE>
<html>
<style>
body,input,button { 
  font-size:1.5em;
}
input[type=submit] {
  font-size:1.5em;
}
</style>
<body>
  <form method='POST'>
    <input type='text' name='name' placeholder='Enter your name' />
    <button type='submit'>Go</button>
  </form>
  <div>
  <?php
    if(isset($_POST['name']) && $_POST['name'] != "")
    {
      echo "Your name is " . $_POST['name'];
    }
    else if(!isset($_POST['name']))
    {
      echo "Enter your name";
    }
    else
    {
      echo "You didn't enter your name, silly";
    }
  ?>
  </div>
</body>
</html>
