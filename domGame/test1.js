/*
 * Initialize foxEngine
 * Called once window is ready to process changes
 */
window.onload = function()
{
	// Init engine
	foxEngine.open("target", 800, 500);
	
	// Background
	var background = new foxEngine.Image("images/field.jpg", 2500, foxEngine.getHeight());

	// Player
	var player = buildPlayer();

	// Scroll background to follow player
	foxEngine.scrollToFollow(background, player);

	// Key events to control player
	setKeyEvents(player);

	// Enemies
	var enemies = buildEnemies();

	// Goal
	var goal = buildGoal();
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
	for(var i = 0; i < 10; i++)
	{
		var enemy = new foxEngine.Image("images/pig_left.png", 60, 40);
		enemy.setHFlipImages("images/pig_right.png", "images/pig_left.png");
		enemy.setType("enemy");
		enemy.friction = 0.0;
		enemy.vel_max_x = 100;
		enemy.pushX(-10000);
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
	return goal;
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
 * TODO improve
 */
function playerEnemyCollision(player, enemy)
{
	enemy.remove();
}
