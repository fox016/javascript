/** @global */
var hasWeapon = false;
var goalPos = null;
var goalAction = null;
var currentLevel = null;

/*
 * @ desc Load level 1 once window is ready for it
 */
window.onload = function()
{
	loadLevel("level1");
}

/*
 * @desc Load level with input from JSON file
 */
function loadLevel(levelKey)
{
	currentLevel = levelKey;
	loadEngine(jsonLevels[levelKey]);
}

/*
 * @desc Initialize foxEngine and build game
 */
function loadEngine(levelObj)
{
	foxEngine.destroy();
	foxEngine.open("target", 800, 500);
	var background = new foxEngine.Image("images/field.jpg", 2500, foxEngine.getHeight());
	var player = buildPlayer();
	setKeyEvents(player);
	setBorderCollisions();
	foxEngine.scrollToFollow(background, player);

	buildEnemies(levelObj.enemies);
	buildPlatforms(levelObj.platforms);
	buildBricks(levelObj.bricks);
	buildStars(levelObj.stars);
	goalPos = levelObj.goal;
	goalAction = levelObj.goal.action;
}

/*
 * @desc Reset engine and game
 */
function reset(levelKey)
{
	if(typeof levelKey == "undefined")
		levelKey = currentLevel;
	hasWeapon = false;
	loadLevel(levelKey);
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
function buildGoal()
{
	var goal = new foxEngine.Image("images/flag.png", 32, 32, goalPos.x, goalPos.y);
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

	var resetBtn = new foxEngine.Button("Play Again", function(e){ reset(currentLevel); }, width, 30, xPos, yPos+height, true);
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
	if(player.isDirectlyAbove(enemy)[0])
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
	if(component.isDirectlyAbove(platform)[0] && component.vel_y >= 0) {
		component.stopDown();
		component.placeAbove(platform);
	}
}

/*
 * @desc Called when certain components and bricks collide
 */
function brickCollision(component, brick)
{
	if(component.type == "bullet")
	{
		component.remove();
	}
	else
	{
		var distAbove = Number.POSITIVE_INFINITY;
		var distBelow = Number.POSITIVE_INFINITY;
		var distLeft = Number.POSITIVE_INFINITY;
		var distRight = Number.POSITIVE_INFINITY;

		if(component.vel_y >= 0)
			distAbove = component.isDirectlyAbove(brick)[1];
		else
			distBelow = component.isDirectlyBelow(brick)[1];
		if(component.vel_x > 0)
			distLeft = component.isDirectlyLeftOf(brick)[1];
		else if(component.vel_x < 0)
			distRight = component.isDirectlyRightOf(brick)[1];

		if(distAbove < distLeft && distAbove < distRight) {
			component.stopDown();
			component.placeAbove(brick);
		}
		else if(distLeft < distAbove && distLeft < distBelow) {
			component.onHitVerticalBorder();
			component.placeLeftOf(brick);
		}
		else if(distRight < distAbove && distRight < distBelow) {
			component.onHitVerticalBorder();
			component.placeRightOf(brick);
		}
		else if(distBelow < distLeft && distBelow < distRight) {
			component.stopUp();
			component.placeBelow(brick);
		}
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
		buildGoal();
}

/*
 * @desc Build enemy objects
 */
function buildEnemies(enemies)
{
	for(var i = 0; i < enemies.positions.length; i++) {
		var enemy = new foxEngine.Image("images/pig_left.png", 60, 40, enemies.positions[i].x, enemies.positions[i].y);
		enemy.setHFlipImages("images/pig_right.png", "images/pig_left.png");
		enemy.setType("enemy");
		enemy.friction = 0.0;
		enemy.vel_max_x = enemies.vel_max_x;
		enemy.pushX(enemies.positions[i].dir * 1000000);
		if(enemies.positions[i].dir > 0)
			enemy.faceRight();
		enemy.applyGravity(true);
		enemy.setZIndex(800);
		enemy.onHitVerticalBorder = function() {
			this.reverseX();
			this.hFlip();
		};
	}
	foxEngine.addCollisionEvent("player", "enemy", playerEnemyCollision);
}

/*
 * @desc Build platform objects
 */
function buildPlatforms(platforms)
{
	if(platforms.length > 0)
	{
		for(var i = 0; i < platforms.length; i++)
		{
			var platform = new foxEngine.Image("images/platform.png", platforms[i].width,
					platforms[i].height, platforms[i].x, platforms[i].y);
			platform.setType("platform");
		}
		foxEngine.addCollisionEvent("player", "platform", platformCollision);
		foxEngine.addCollisionEvent("enemy", "platform", platformCollision);
	}
}

/*
 * @desc Build brick objects
 */
function buildBricks(bricks)
{
	if(bricks.length > 0)
	{
		for(var i = 0; i < bricks.length; i++)
		{
			var brick = new foxEngine.Image("images/brick.jpg", bricks[i].width,
					bricks[i].height, bricks[i].x, bricks[i].y);
			brick.setType("brick");
		}
		foxEngine.addCollisionEvent("player", "brick", brickCollision);
		foxEngine.addCollisionEvent("enemy", "brick", brickCollision);
		foxEngine.addCollisionEvent("bullet", "brick", brickCollision);
	}
}

/*
 * @desc Build stars that the player can get
 */
function buildStars(stars)
{
	if(stars.length > 0)
	{
		for(var i = 0; i < stars.length; i++)
		{
			var star = new foxEngine.Image("images/star.png", 30, 30, stars[i].x, stars[i].y);
			star.setType("star");
		}

		foxEngine.addCollisionEvent("player", "star", function(player, star) {
			if(!hasWeapon)
			{
				hasWeapon = true;
				foxEngine.addCollisionEvent("enemy", "bullet", function(enemy, bullet) {
					enemyHitByBullet(enemy, bullet);
				});;
				star.pushY(-100000);
				setTimeout(function(){star.remove()}, 500);
			}
		});
	}
}

/*
 * @desc Called when a player and a goal collide
 */
function playerGoalCollision(player, goal)
{
	goal.remove();
	eval(goalAction);
}




/*********************************
 * JSON LEVELS
 * ******************************/
var jsonLevels = {};

jsonLevels['level1'] =
{
	"enemies": {
		"vel_max_x": 100,
		"positions": [
			{"x": 100, "y": 300, "dir": 1},
			{"x": 300, "y": 300, "dir": -1},
			{"x": 500, "y": 300, "dir": 1},
			{"x": 700, "y": 300, "dir": -1},
			{"x": 900, "y": 300, "dir": 1},
			{"x": 1100, "y": 300, "dir": -1},
			{"x": 1300, "y": 300, "dir": 1},
			{"x": 1500, "y": 300, "dir": -1},
			{"x": 1700, "y": 300, "dir": 1},
			{"x": 1900, "y": 300, "dir": -1},
			{"x": 1550, "y": 34, "dir": 1},
			{"x": 1550, "y": 34, "dir": -1}
		]
	},
	"platforms": [
		{"x": 100, "y": 450, "width": 150, "height": 20},
		{"x": 300, "y": 400, "width": 150, "height": 20},
		{"x": 500, "y": 350, "width": 150, "height": 20},
		{"x": 700, "y": 300, "width": 150, "height": 20},
		{"x": 900, "y": 250, "width": 150, "height": 20},
		{"x": 1100, "y": 200, "width": 150, "height": 20},
		{"x": 1300, "y": 150, "width": 150, "height": 20},
		{"x": 1500, "y": 100, "width": 150, "height": 20}
	],
	"bricks": [],
	"stars": [],
	"goal": {"x": 1550, "y": 34, "action": "reset('level2');"}
}

jsonLevels['level2'] =
{
	"enemies": {
		"vel_max_x": 100,
		"positions": [
			{"x": 100, "y": 200, "dir": 1},
			{"x": 200, "y": 200, "dir": -1},
			{"x": 300, "y": 200, "dir": 1},
			{"x": 400, "y": 200, "dir": -1},
			{"x": 500, "y": 200, "dir": 1},
			{"x": 600, "y": 200, "dir": -1},
			{"x": 700, "y": 200, "dir": 1},
			{"x": 800, "y": 200, "dir": -1},
			{"x": 900, "y": 200, "dir": 1},
			{"x": 1000, "y": 200, "dir": -1},
			{"x": 1100, "y": 200, "dir": 1},
			{"x": 1200, "y": 200, "dir": -1},
			{"x": 1300, "y": 200, "dir": 1},
			{"x": 1400, "y": 200, "dir": -1},
			{"x": 1500, "y": 200, "dir": 1},
			{"x": 1600, "y": 200, "dir": -1},
			{"x": 1700, "y": 200, "dir": 1},
			{"x": 1800, "y": 200, "dir": -1},
			{"x": 1900, "y": 200, "dir": 1},
			{"x": 2000, "y": 200, "dir": -1}
		]
	},
	"platforms": [
		{"x": 100, "y": 450, "width": 150, "height": 30},
		{"x": 250, "y": 430, "width": 150, "height": 30},
		{"x": 400, "y": 410, "width": 150, "height": 30},
		{"x": 550, "y": 390, "width": 150, "height": 30},
		{"x": 700, "y": 370, "width": 150, "height": 30},
		{"x": 850, "y": 350, "width": 150, "height": 30},
		{"x": 1000, "y": 330, "width": 150, "height": 30},
		{"x": 1150, "y": 310, "width": 150, "height": 30},
		{"x": 1300, "y": 330, "width": 150, "height": 30},
		{"x": 1450, "y": 350, "width": 150, "height": 30},
		{"x": 1600, "y": 370, "width": 150, "height": 30},
		{"x": 1750, "y": 390, "width": 150, "height": 30},
		{"x": 1900, "y": 410, "width": 150, "height": 30},
		{"x": 2050, "y": 430, "width": 150, "height": 30},
		{"x": 2200, "y": 450, "width": 150, "height": 30}
	],
	"bricks": [],
	"stars": [
		{"x": 1200, "y": 240}
	],
	"goal": {"x": 160, "y": 420, "action": "reset('level3');"}
}

jsonLevels['level3'] =
{
	"enemies": {
		"vel_max_x": 100,
		"positions": [
			{"x": 500, "y": 400, "dir": 1},
			{"x": 500, "y": 400, "dir": -1},
			{"x": 400, "y": 280, "dir": -1},
		]
	},
	"platforms": [],
	"bricks": [
		{"x": 100, "y": 400, "width": 100, "height": 100},
		{"x": 650, "y": 400, "width": 100, "height": 100},
		{"x": 300, "y": 350, "width": 250, "height": 50},
		{"x": 300, "y": 300, "width": 50, "height": 50},
		{"x": 500, "y": 300, "width": 50, "height": 50}
	],
	"stars": [],
	"goal": {"x": 409, "y": 500, "action": "buildEndMessage('images/you_win.png');"}
}
