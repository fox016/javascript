window.onload = function()
{
	loadEngine();
}

/*
 * @desc Initialize foxEngine and build game
 */
function loadEngine()
{
	foxEngine.open("target", 800, 500);
	var background = new foxEngine.Image("images/field.jpg", 2500, foxEngine.getHeight());
	var player = buildPlayer();
	foxEngine.scrollToFollow(background, player);
	setKeyEvents(player);
	var enemies = buildEnemies();
	var platforms = buildPlatforms();
}

/*
 * @desc Reset engine and game
 */
function reset()
{
	foxEngine.destroy();
	loadEngine();
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
	// TODO make pigs bounce off background boundaries
	var enemies = [];
	var dir = 1;
	var positions = [];
	for(var i = 0; i < 10; i++)
		positions.push({x: i*200+100, y:300});
	positions.push({x: 1550, y:34});
	positions.push({x: 1550, y:34});
	for(var i = 0; i < positions.length; i++) {
		var enemy = new foxEngine.Image("images/pig_left.png", 60, 40, positions[i].x, positions[i].y);
		enemy.setHFlipImages("images/pig_right.png", "images/pig_left.png");
		enemy.setType("enemy");
		enemy.friction = 0.0;
		enemy.vel_max_x = 100;
		enemy.pushX(dir * 1000000);
		if(dir > 0)
			enemy.faceRight();
		dir *= -1;
		enemy.applyGravity(true);
		enemy.setZIndex(800);
		enemies.push(enemy);
	}
	foxEngine.addCollisionEvent("player", "enemy", playerEnemyCollision);
	return enemies;
}

/*
 * @desc Build and return a list of platform objects
 */
function buildPlatforms()
{
	var platforms = [];
	var y = 450;
	for(var i = 0; i < 8; i++)
	{
		var platform = new foxEngine.Image("images/platform.png", 150, 20, i*200+100, y);
		y -= 50;
		platform.setType("platform");
		platforms.push(platform);
	}
	foxEngine.addCollisionEvent("player", "platform", platformCollision);
	foxEngine.addCollisionEvent("enemy", "platform", platformCollision);
	return platforms;
}

/*
 * @desc Build and return goal object
 */
function buildGoal()
{
	var goal = new foxEngine.Image("images/flag.png", 32, 32, 1550, 34);
	goal.setType("goal");
	goal.setZIndex(900);
	foxEngine.addCollisionEvent("player", "goal", playerGoalCollision);
	return goal;
}

/*
 * @desc Build and return win message object
 */
function buildEndMessage(imgSrc)
{
	var width = 200; var height = 200;
	var xPos = foxEngine.getWidth() / 2 - width / 2;
	var yPos = foxEngine.getHeight() / 2 - height / 2;
	var endMessage = new foxEngine.Image(imgSrc, width, height, xPos, yPos);
	endMessage.fixed = true;

	var resetBtn = new foxEngine.Button("Play Again", reset, width, 30, xPos, yPos+height, true);
	resetBtn.fixed = true;

	return endMessage;
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
	// TODO instead of jump timer, allow player to jump whenever standing on an object
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
 */
function playerEnemyCollision(player, enemy)
{
	if(player.isDirectlyAbove(enemy))
	{
		enemy.remove();
		player.stopY();
		player.pushY(-1 * 40000);

		// Show flag if all enemies are gone
		if(foxEngine.typeComponentMap['enemy'].length == 0)
			buildGoal();
	}

	else
	{
		player.remove();
		buildEndMessage("images/you_lose.jpg");
	}
}

/*
 * @desc Called when a player and a goal collide
 */
function playerGoalCollision(player, goal)
{
	goal.remove();
	buildEndMessage("images/you_win.png");
}

/*
 * @desc Called when certain components and platforms collide
 */
function platformCollision(component, platform)
{
	if(component.isDirectlyAbove(platform))
	{
		component.stopDown();
		component.placeAbove(platform);
	}
}
