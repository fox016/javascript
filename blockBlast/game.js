/** @global */
var winAction = null;
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
	var player = buildPlayer();
	setMouseEvents(player);

	buildBlocks(levelObj.blocks);
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
	player.setZIndex(1000);
	player.setPosition(350, 450);
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
 * @desc Set mouse events to apply to targetObj
 */
function setMouseEvents(targetObj)
{
	// Move left and right
	foxEngine.addMouseMoveEvent("target", function(mouseMoveEvent) {
		// TODO change acceleration of targetObj instead of position, make acceleration proportional to distance from mouse to center of target
		targetObj.setPosition(mouseMoveEvent.pageX - 
			document.getElementById("target").offsetLeft - targetObj.getWidth()/2, targetObj.y);
	});
}

/*
 * @desc Call this when the player loses
 */
function playerLose(player)
{
	// TODO incorporate fixed number of lives
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

function ballPlayerCollision(ball, player)
{
	if(ball.vel_y >=0 && ball.isDirectlyAbove(player)[0])
		ball.reverseY();
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
