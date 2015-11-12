/** @global */
var currentLevel = null;
var enemyFireInterval = null;

var weapons = {
	"default": {timer: 300, forward: true, left: false, right: false},
	"split": {timer: 300, forward: true, left: true, right: true},
	"rapid": {timer: 100, forward: true, left: false, right: false},
	"combo": {timer: 100, forward: true, left: true, right: true},
}
var currentWeapon = "default";

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
	player.weapon = weapons[currentWeapon];
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
	foxEngine.addCollisionEvent("player", "item", function(player, item) { playerGetsItem(player, item); });
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

	// Fire weapon
	var weaponFlag = true;
	foxEngine.addKeyEvent(SPACE_KEY, function() {
		if(weaponFlag && targetObj.weapon) {
			fireWeapon(targetObj);
			weaponFlag = false;
			setTimeout(function() { weaponFlag = true; }, targetObj.weapon.timer);
		}
	});
}

/*
 * @desc Call this when the player loses
 */
function playerLose(player)
{
	player.remove();
	player.weapon = null;
	currentWeapon = "default";
	buildEndMessage("images/you_lose.jpg", "Try Again", function(){ reset(currentLevel); });
}

/*
 * @desc Fire component's weapon
 */
function fireWeapon(component)
{
	var startPos = component.getCenter();
	var speed = 600;
	var size = 10;

	var dir = -1;
	var type = "bullet";
	var image = "images/bullet.png";

	if(component.type == "enemy")
	{
		image = "images/enemy_bullet.png";
		dir = 1;
		type = "enemy_bullet";
	}

	if(component.weapon.forward)
		buildBullet(startPos, {y:dir, x:0}, speed, type, image, size);
	if(component.weapon.left)
		buildBullet(startPos, {y:dir, x:dir}, speed, type, image, size);
	if(component.weapon.right)
		buildBullet(startPos, {y:dir, x:-1*dir}, speed, type, image, size);
}

/*
 * Build a bullet
 */
function buildBullet(startPos, dir, speed, type, image, size)
{
	var bullet = new foxEngine.Image(image, size, size, startPos.x - (0.5*size), startPos.y);
	bullet.setType(type);
	bullet.friction = 0.0;
	bullet.vel_max_up = speed;
	bullet.vel_max_down = speed;
	bullet.vel_max_left = speed;
	bullet.vel_max_right = speed;
	bullet.pushY(dir.y * 1000000);
	bullet.pushX(dir.x * 1000000);
	bullet.setZIndex(1100);
	bullet.onHitHorizontalBorder = function() { bullet.remove(); };
	bullet.onHitVerticalBorder = function() { bullet.remove(); };
	return bullet;
}

/*
 * @desc Build item
 */
function buildItem(itemType, startPos)
{
	var item = new foxEngine.Image("images/star.png", 20, 20, startPos.x, startPos.y);
	item.setType("item");
	item.itemType = itemType;
	item.applyGravity(false);
	item.friction = 0.0;
	item.vel_max_down = 300;
	item.pushY(10000000);
	item.setZIndex(1200);
	item.onHitHorizontalBorder = function() { item.remove(); };
	return item;
}

/*
 * @desc Enemy react to bullet hit
 */
function enemyHitByBullet(enemy, bullet)
{
	if(typeof enemy.item !== "undefined")
		buildItem(enemy.item, enemy.getCenter());
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
 * @desc Player hit by item
 */
function playerGetsItem(player, item)
{
	if(currentWeapon == "split" && item.itemType == "rapid")
		currentWeapon = "combo";
	else if(currentWeapon == "rapid" && item.itemType == "split")
		currentWeapon = "combo";
	else if(currentWeapon == "combo")
		currentWeapon = "combo";
	else
		currentWeapon = item.itemType;
	player.weapon = weapons[currentWeapon];
	item.stopY();
	item.setSize(40,40);
	setTimeout(function() { item.remove() }, 1000);
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
		enemy.weapon = (typeof enemies.weapon_type === "undefined") ? weapons['default'] : weapons[enemies.weapon_type];
		enemy.item = enemies.positions[i].item;
	}

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
