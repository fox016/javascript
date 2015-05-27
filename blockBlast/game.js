/** @global */
var winAction = null;
var currentLevel = null;
var levelStats = {};
var playerY = 450;
var mouseX = 0;
var mouseInterval = null;

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
	var player = buildPlayer();
	setMouseEvents(player);

	buildBlocks(levelObj.blocks);
	// TODO create a type of invincible block
	buildBall(levelObj.ball, player);
	winAction = levelObj.action;
}

/*
 * @desc Reset engine and game
 */
function reset(levelKey)
{
	if(typeof levelKey == "undefined")
		levelKey = currentLevel;
	if(mouseInterval != null)
	{
		window.clearInterval(mouseInterval);
		mouseInterval = null;
	}
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
	var player = new foxEngine.Image("images/platform.png", 100, 20);
	player.setType("player");
	player.vel_max_x = 5000;
	player.friction = 0;
	player.setZIndex(1000);
	player.setPosition(350, playerY);
	return player;
}

/*
 * @desc Build blocks
 */
function buildBlocks(blocks)
{
	for(var i = 0; i < blocks.length; i++)
	{
		var block = new foxEngine.Text("", blocks[i].width, blocks[i].height, blocks[i].x, blocks[i].y, true);
		block.setStyle("backgroundColor", blocks[i].color);
		block.setType("block");
	}
	foxEngine.addCollisionEvent("ball", "block", ballBlockCollision);
}

/*
 * @desc Build ball
 */
function buildBall(ball, player)
{
	var ballObj = new foxEngine.Image("images/ball.png", 30, 30, ball.x, ball.y);
	ballObj.setType("ball");
	ballObj.friction = 0;
	ballObj.vel_x = ball.vel_x;
	ballObj.vel_y = ball.vel_y;
	ballObj.vel_max_left = ball.vel_max;
	ballObj.vel_max_right = ball.vel_max;
	ballObj.vel_max_up = ball.vel_max;
	ballObj.vel_max_down = ball.vel_max;
	ballObj.setZIndex(950);

	ballObj.onHitHorizontalBorder = function()
	{
		if(this.vel_y <= 0)
			this.reverseY();
		else
			playerLose(player);
	}

	ballObj.onHitVerticalBorder = function()
	{
		this.reverseX();
	}

	foxEngine.addCollisionEvent("ball", "player", ballPlayerCollision);
}

/*
 * @desc Build and return win message object
 */
function buildEndMessage(imgSrc, buttonText, buttonFunction)
{
	foxEngine.pause();
	//document.getElementById("target").style.cursor = "auto";

	var width = 200; var height = 200;
	var xPos = foxEngine.getWidth() / 2 - width / 2;
	var yPos = foxEngine.getHeight() / 2 - height / 2;
	var endMessage = new foxEngine.Image(imgSrc, width, height, xPos, yPos);
	endMessage.fixed = true;

	var resetBtn = new foxEngine.Button(buttonText,
			function(e){ buttonFunction(); }, width, 30, xPos, yPos+height, true);
	resetBtn.fixed = true;

	return endMessage;
}

/*
 * @desc Set mouse events to apply to player
 */
function setMouseEvents(player)
{
	// Move left and right
	//document.getElementById("target").style.cursor = "none";
	foxEngine.addMouseMoveEvent("target", function(mouseMoveEvent) {
		mouseX = mouseMoveEvent.pageX - document.getElementById("target").offsetLeft;
		if(mouseInterval == null)
			mouseInterval = setInterval(function() { goTowardsMouse(player); }, foxEngine.delta_t);
	});
}

/*
 * @desc Drag the player towards the last recorded mouse position
 */
function goTowardsMouse(player)
{
	var playerX = player.x + player.getWidth()/2;
	var distance = mouseX - playerX;
	player.vel_x = 30 * distance;
	if(distance >= -15 && distance <= 15)
	{
		window.clearInterval(mouseInterval);
		mouseInterval = null;
		player.vel_x = 0;
	}
}

/*
 * @desc Call this when the player loses
 */
function playerLose(player)
{
	buildEndMessage("images/you_lose.jpg", "Try Again", function(){ reset(currentLevel); });
}

/*
 * @desc Define what happens when a ball and a block collide
 */
function ballBlockCollision(ball, block)
{
	// TODO create objects within some blocks

	var distAbove = Number.POSITIVE_INFINITY;
	var distBelow = Number.POSITIVE_INFINITY;
	var distLeft = Number.POSITIVE_INFINITY;
	var distRight = Number.POSITIVE_INFINITY;

	if(ball.vel_y >= 0)
		distAbove = ball.isDirectlyAbove(block)[1];
	else
		distBelow = ball.isDirectlyBelow(block)[1];
	if(ball.vel_x > 0)
		distLeft = ball.isDirectlyLeftOf(block)[1];
	else if(ball.vel_x < 0)
		distRight = ball.isDirectlyRightOf(block)[1];

	if(distAbove <= distLeft && distAbove <= distRight) {
		ball.reverseY();
	}
	else if(distLeft <= distAbove && distLeft <= distBelow) {
		ball.reverseX();
	}
	else if(distRight <= distAbove && distRight <= distBelow) {
		ball.reverseX();
	}
	else if(distBelow <= distLeft && distBelow <= distRight) {
		ball.reverseY();
	}

	removeBlock(block);
}

/*
 * @desc Define what happens when a ball collides with the player
 */
function ballPlayerCollision(ball, player)
{
	if(ball.vel_y >=0 && ball.isDirectlyAbove(player)[0])
	{
		ball.reverseY();
		ball.vel_x += foxEngine.getBoundedValue(player.vel_x, -1 * player.vel_max_x, player.vel_max_x);
	}
}

/*
 * @desc Remove block, and react when all blocks are gone
 */
function removeBlock(block)
{
	block.remove();

	if(foxEngine.typeComponentMap['block'].length == 0)
	{
		levelStats[currentLevel].endTime = (new Date()).getTime();
		showLevelStats(currentLevel, 10, 10);
		eval(winAction);
	}
}

/*
 * @desc Show stats for a specific level at a specific position
 * @param {string} levelName - key into levelStats object
 * @param {int} xPos
 * @param {int} yPos
 */
function showLevelStats(levelName, xPos, yPos)
{
	var title = "Level: " + levelName + "<br/>";
	var time = "Time: " + ((levelStats[levelName].endTime - levelStats[levelName].startTime)/1000.0) + " seconds<br/>";
	var lives = "Tries: " + levelStats[levelName].lives + "<br/>";

	var textObj = new foxEngine.Text(title+time+lives, 760, 60, xPos, yPos, true);
	textObj.setStyle("color", "#326699");
	textObj.setStyle("backgroundColor", "#FDFADE");
	textObj.setStyle("padding", "10px");
}

/*
 * @desc Clear everything and show all stats stored in global levelStats
 */
function showAllLevelStats()
{
	foxEngine.destroy();
	foxEngine.open("target", 800, 80 * Object.keys(levelStats).length + 20);
	var yPos = 10;
	for(level in levelStats)
	{
		showLevelStats(level, 10, yPos);
		yPos += 80;
	}
}
