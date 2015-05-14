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

}

/*
 * @desc Create and return a player object
 */
function buildPlayer()
{
	var player = new foxEngine.Image("images/guy_right.png", 48, 66);
	player.setHFlipImages("images/guy_right.png", "images/guy_left.png");
	player.type = "player";
	player.applyGravity(true);
	return player;
}

/*
 * @desc Set key events to apply to targetObj
 */
function setKeyEvents(targetObj)
{
	// Move left and right
	var moveForce = 10000;
	foxEngine.keyDown(LEFT_KEY, function() {
		targetObj.pushX(-1 * moveForce);
		targetObj.faceLeft();
	});
	foxEngine.keyDown(RIGHT_KEY, function() {
		targetObj.pushX(moveForce);
		targetObj.faceRight();
	});

	// Jump
	var jumpFlag = true;
	var jumpTimer = 1000; // Wait time between jumps (in ms)
	var jumpForce = 120000;
	foxEngine.keyDown(UP_KEY, function() {
		if(jumpFlag)
		{
			targetObj.pushY(-1 * jumpForce);
			jumpFlag = false;
			setTimeout(function() { jumpFlag = true; }, jumpTimer);
		}
	});
}
