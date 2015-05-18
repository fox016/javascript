/** @global */
var hasWeapon = false;

/*
 * @ desc Load everything once window is ready for it
 */
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
	var stars = buildStars();
	setBorderCollisions();
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
	player.faceRight();
	player.setType("player");
	player.applyGravity(true);
	player.setZIndex(1000);
	return player;
}

/*
 * @desc Build and return goal object
 */
function buildGoal(xPos, yPos)
{
	var goal = new foxEngine.Image("images/flag.png", 32, 32, xPos, yPos);
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
	var jumpFlag = true;
	var jumpTimer = 200; // Wait time between jumps (in ms)
	var jumpForce = -120000;
	foxEngine.addKeyEvent(UP_KEY, function() {
		if(targetObj.acc_y == 0 && jumpFlag)
		{
			targetObj.pushY(jumpForce);
			jumpFlag = false;
			setTimeout(function() { jumpFlag = true; }, jumpTimer);
		}
	});

	// Fire gun
	var weaponFlag = true;
	var weaponTimer = 500;
	foxEngine.addKeyEvent(SPACE_KEY, function(){
		if(weaponFlag && hasWeapon)
		{
			fireWeapon(targetObj);
			weaponFlag = false;
			setTimeout(function() { weaponFlag = true; }, weaponTimer);
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
		removeEnemy(enemy);
		player.stopY();
		player.pushY(-1 * 40000);
	}

	else
	{
		player.remove();
		hasWeapon = false;
		buildEndMessage("images/you_lose.jpg");
	}
}

/*
 * @desc Called when certain components and platforms collide
 */
function platformCollision(component, platform)
{
	if(component.isDirectlyAbove(platform) && component.vel_y >= 0) {
		component.stopDown();
		component.placeAbove(platform);
	}
}

/*
 * @desc Define components' actions upon border collision
 */
function setBorderCollisions()
{
	foxEngine.addCollisionEvent("player", "borderBottom", function(player, border) {
		player.stopDown();
	});
}

/*
 * @desc Fire component's weapon
 */
function fireWeapon(component)
{
	var startPos = component.getCenter();
	var bullet = new foxEngine.Image("images/bullet.png", 20, 20, startPos.x, startPos.y);
	bullet.setType("bullet");
	bullet.friction = 0.0;
	bullet.vel_max_x = component.vel_max_x + 100;
	bullet.pushX((component.getDirection() == LEFT ? -1 : 1) * 1000000);
	bullet.setZIndex(1100);
	bullet.boundInView = true;
	bullet.onHitVerticalBorder = function() {
		bullet.remove();
	};
	foxEngine.addCollisionEvent("enemy", "bullet", function(enemy, bullet) {
		enemyHitByBullet(enemy, bullet);
	});;
}

/*
 * @desc Enemy react to bullet hit
 */
function enemyHitByBullet(enemy, bullet)
{
	removeEnemy(enemy);
	bullet.remove();
}

/*
 * @desc Remove enemy, and react when all enemies are gone
 */
function removeEnemy(enemy)
{
	enemy.remove();

	if(foxEngine.typeComponentMap['enemy'].length == 0)
		allEnemiesGone();
}
