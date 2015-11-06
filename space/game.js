/** @global */
var currentLevel = null;
var enemyFireInterval = null;
var hasWeapon = true;

/*
 * @ desc Load level 1 once window is ready for it
 */
window.onload = function()
{
	reset(0);
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
	var background = new foxEngine.Image("images/space_background.jpg", 800, 500);
	var player = buildPlayer();
	hasWeapon = true;
	setKeyEvents(player);
	buildEnemies(levelObj.enemies);
}

/*
 * @desc Reset engine and game
 * @param levelKey - optional, if not defined will reset current level
 */
function reset(levelKey)
{
	if(typeof levelKey == "undefined")
		levelKey = currentLevel;
	loadLevel(levelKey);
}

/*
 * @desc Create and return a player object
 */
function buildPlayer()
{
	var player = new foxEngine.Image("images/spaceship.png", 45, 60, 100, 440);
	player.setType("player");
	player.applyGravity(false);
	player.setZIndex(1000);
	return player;
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
	});
	foxEngine.addKeyEvent(RIGHT_KEY, function() {
		targetObj.pushX(moveForce);
	});

	// Fire gun
	var weaponTimer = 300;
	var weaponFlag = true;
	foxEngine.addKeyEvent(SPACE_KEY, function() {
		if(weaponFlag && hasWeapon) {
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
 * @desc Fire component's weapon
 */
function fireWeapon(component)
{
	var startPos = component.getCenter();
	var bulletSize = 10;
	var image = "images/bullet.png";
	var dir = -1;
	var type = "bullet";

	if(component.type == "enemy")
	{
		image = "images/enemy_bullet.png";
		dir = 1;
		type = "enemy_bullet";
	}

	var bullet = new foxEngine.Image(image, bulletSize, bulletSize, startPos.x - (0.5*bulletSize), startPos.y);
	bullet.setType(type);
	bullet.friction = 0.0;
	bullet.vel_max_up = 600;
	bullet.vel_max_down = 600;
	bullet.pushY(dir * 1000000);
	bullet.setZIndex(1100);
	bullet.onHitHorizontalBorder = function() { bullet.remove(); };
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
 * @desc Player hit by bullet
 */
function playerHitByBullet(player, bullet)
{
	playerLose(player);
	bullet.remove();
}

/*
 * @desc Remove enemy, and react when all enemies are gone
 */
function removeEnemy(enemy)
{
	enemy.remove();
	if(foxEngine.typeComponentMap['enemy'].length == 0)
	{
		if(currentLevel+1 < jsonLevels.length)
			buildEndMessage("images/you_win.png", "Next Level", function() { reset(currentLevel+1); });
		else
			buildEndMessage("images/you_win.png", "Play Again", function() { reset(0); });
	}
}

/*
 * @desc Build enemy objects
 */
function buildEnemies(enemies)
{
	for(var i = 0; i < enemies.positions.length; i++) {
		var enemy = new foxEngine.Image("images/enemy_ship.png", 50, 50, enemies.positions[i].x, enemies.positions[i].y);
		enemy.setType("enemy");
		enemy.friction = 0.0;
		enemy.vel_max_left = enemies.vel_max_x;
		enemy.vel_max_right = enemies.vel_max_x;
		enemy.pushX(enemies.positions[i].dir * 1000000);
		enemy.applyGravity(false);
		enemy.setZIndex(800);
		enemy.onHitVerticalBorder = function() { this.reverseX(); };
	}

	if(enemyFireInterval !== null)
		clearInterval(enemyFireInterval);
	enemyFireInterval = setInterval(enemiesFire, enemies.weapon_timer);

	foxEngine.addCollisionEvent("enemy", "bullet", function(enemy, bullet) { enemyHitByBullet(enemy, bullet); });
	foxEngine.addCollisionEvent("player", "enemy_bullet", function(player, bullet) { playerHitByBullet(player, bullet); });
}

/*
 * @desc All enemies fire weapons
 */
function enemiesFire()
{
	var enemies = foxEngine.typeComponentMap['enemy'];
	for(var i = 0; i < enemies.length; i++)
		fireWeapon(enemies[i]);
}
