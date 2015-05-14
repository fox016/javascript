/*
 * Initialize foxEngine
 * Called once window is ready to process changes
 */
window.onload = function()
{
	foxEngine.open("target", 800, 500);
	var background = new foxEngine.Image("images/field.jpg", 2500, foxEngine.getHeight());
	var player = buildPlayer();
	foxEngine.scrollToFollow(background, player);
	setKeyEvents(player);
	var enemies = buildEnemies();
}

/*
 * @desc Create and return a player object
 */
function buildPlayer()
{
	var player = new foxEngine.Image("images/guy_right.png", 48, 66);
	player.setHFlipImages("images/guy_right.png", "images/guy_left.png");
	player.setType("player");
	player.applyGravity(true);
	player.setZIndex(1000);
	return player;
}

/*
 * @desc Build and return a list of enemy objects
 */
function buildEnemies()
{
	var enemies = [];
	var dir = 1;
	for(var i = 0; i < 10; i++)
	{
		var enemy = new foxEngine.Image("images/pig_left.png", 60, 40);
		enemy.setHFlipImages("images/pig_right.png", "images/pig_left.png");
		enemy.setType("enemy");
		enemy.friction = 0.0;
		enemy.vel_max_x = 100;
		enemy.pushX(dir * 1000000);
		if(dir > 0)
			enemy.faceRight();
		dir *= -1;
		enemy.setPosition(i * 200 + 100, 300);
		enemy.applyGravity(true);
		enemies.push(enemy);
	}
	foxEngine.addCollisionEvent("player", "enemy", playerEnemyCollision);
	return enemies;
}

/*
 * @desc Build and return goal object
 */
function buildGoal()
{
	var goal = new foxEngine.Image("images/flag.png", 32, 32);
	goal.setPosition(2300, 350);
	goal.setType("goal");
	goal.setZIndex(900);
	foxEngine.addCollisionEvent("player", "goal", playerGoalCollision);
	return goal;
}

/*
 * @desc Build and return win message object
 */
function buildWinMessage()
{
	var winMessage = new foxEngine.Image(
		"http://ajournalofmusicalthings.com/wp-content/uploads/YouWin.png",
		200, 200);
	winMessage.setPosition(100, 100);
	winMessage.fixed = true;
	return winMessage;
}

/*
 * @desc Set key events to apply to targetObj
 */
function setKeyEvents(targetObj)
{
	// Move left and right
	var moveForce = 10000;
	foxEngine.addKeyEvent(LEFT_KEY, function() {
		targetObj.pushX(-1 * moveForce);
		targetObj.faceLeft();
	});
	foxEngine.addKeyEvent(RIGHT_KEY, function() {
		targetObj.pushX(moveForce);
		targetObj.faceRight();
	});

	// Jump
	var jumpFlag = true;
	var jumpTimer = 1000; // Wait time between jumps (in ms)
	var jumpForce = 120000;
	foxEngine.addKeyEvent(UP_KEY, function() {
		if(jumpFlag)
		{
			targetObj.pushY(-1 * jumpForce);
			jumpFlag = false;
			setTimeout(function() { jumpFlag = true; }, jumpTimer);
		}
	});
}

/*
 * @desc Called when a player and an enemy collide
 * TODO improve so that enemies die if jumped on, otherwise the player dies
 */
function playerEnemyCollision(player, enemy)
{
	enemy.remove();

	// Show flag if all enemies are gone
	if(foxEngine.typeComponentMap['enemy'].length == 0)
		buildGoal();
}

/*
 * @desc Called when a player and a goal collide
 */
function playerGoalCollision(player, goal)
{
	goal.remove();
	buildWinMessage();
}
