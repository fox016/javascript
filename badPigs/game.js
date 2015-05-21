/** @global */
var hasWeapon = false;
var goalPos = null;
var goalAction = null;
var currentLevel = null;
var levelStats = {};

/*
 * @ desc Load level 1 once window is ready for it
 */
window.onload = function()
{
	reset("level1");
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
	var background = new foxEngine.Image(levelObj.background.img, levelObj.background.width, levelObj.background.height);
	var player = buildPlayer();
	setKeyEvents(player);
	setBorderCollisions();
	foxEngine.scrollToFollow(background, player);

	buildEnemies(levelObj.enemies);
	buildPlatforms(levelObj.platforms);
	buildBricks(levelObj.bricks);
	buildLava(levelObj.lava);
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
	if(levelKey in levelStats)
	{
		levelStats[levelKey].lives++;
	}
	else
	{
		levelStats[levelKey] = {};
		levelStats[levelKey].startTime = (new Date()).getTime();
		levelStats[levelKey].lives = 1;
	}
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
function buildEndMessage(imgSrc, buttonText, buttonFunction)
{
	var width = 200; var height = 200;
	var xPos = foxEngine.getWidth() / 2 - width / 2;
	var yPos = foxEngine.getHeight() / 2 - height / 2;
	var endMessage = new foxEngine.Image(imgSrc, width, height, xPos, yPos);
	endMessage.fixed = true;

	var resetBtn = new foxEngine.Button(buttonText, function(e){ buttonFunction(); }, width, 30, xPos, yPos+height, true);
	resetBtn.fixed = true;

	foxEngine.deleteKeyEvent(ENTER_KEY);
	foxEngine.addKeyEvent(ENTER_KEY, function() { buttonFunction(); });

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
 * @desc Call this when the player loses
 */
function playerLose(player)
{
	player.remove();
	hasWeapon = false;
	buildEndMessage("images/you_lose.jpg", "Try Again", function(){ reset(currentLevel); });
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
		playerLose(player);
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
	if(typeof platforms == "undefined")
		return;
	if(platforms.length == 0)
		return;
	for(var i = 0; i < platforms.length; i++)
	{
		var platform = new foxEngine.Image("images/platform.png", platforms[i].width,
				platforms[i].height, platforms[i].x, platforms[i].y);
		platform.setType("platform");
	}
	foxEngine.addCollisionEvent("player", "platform", platformCollision);
	foxEngine.addCollisionEvent("enemy", "platform", platformCollision);
}

/*
 * @desc Build brick objects
 */
function buildBricks(bricks)
{
	if(typeof bricks == "undefined")
		return;
	if(bricks.length == 0)
		return;
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

/*
 * @desc Build lava objects
 */
function buildLava(lava)
{
	if(typeof lava == "undefined")
		return;
	if(lava.length == 0)
		return;
	for(var i = 0; i < lava.length; i++)
	{
		var lavaObj = new foxEngine.Image("images/lava.jpg", lava[i].width,
				lava[i].height, lava[i].x, lava[i].y);
		lavaObj.setType("lava");
	}
	foxEngine.addCollisionEvent("player", "lava", function(player, lavaObj){ playerLose(player); });
}

/*
 * @desc Build stars that the player can get
 */
function buildStars(stars)
{
	if(typeof stars == "undefined")
		return;
	if(stars.length == 0)
		return;
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

/*
 * @desc Called when a player and a goal collide
 */
function playerGoalCollision(player, goal)
{
	goal.remove();
	levelStats[currentLevel].endTime = (new Date()).getTime();
	eval(goalAction);
}

/*
 * @desc Show any stats stored in global levelStats
 */
function showLevelStats()
{
	foxEngine.destroy();
	foxEngine.open("target", 800, 80 * Object.keys(levelStats).length + 20);
	var yPos = 10;
	for(level in levelStats)
	{
		var title = "Level: " + level + "<br/>";
		var time = "Time: " + ((levelStats[level].endTime - levelStats[level].startTime)/1000.0) + " seconds<br/>";
		var lives = "Tries: " + levelStats[level].lives + "<br/>";

		var textObj = new foxEngine.Text(title+time+lives, 760, 60, 10, yPos, true);
		textObj.setStyle("color", "#326699");
		textObj.setStyle("backgroundColor", "#FDFADE");
		textObj.setStyle("padding", "10px");
		yPos += 80;
	}
}
