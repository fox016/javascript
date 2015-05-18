/*
 * @desc Build and return a list of enemy objects
 */
function buildEnemies()
{
	var enemies = [];
	var dir = 1;
	var positions = [];
	for(var i = 0; i < 20; i++)
		positions.push({x: i*100+100, y:300});
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
		enemy.onHitVerticalBorder = function() {
			this.reverseX();
			this.hFlip();
		};
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
		var platform = new foxEngine.Image("images/platform.png", 150, 20, i*150+100, y);
		y -= 20;
		platform.setType("platform");
		platforms.push(platform);
	}
	foxEngine.addCollisionEvent("player", "platform", platformCollision);
	foxEngine.addCollisionEvent("enemy", "platform", platformCollision);
	return platforms;
}

/*
 * @desc Build stars that the player can get
 */
function buildStars()
{
	var star = new foxEngine.Image("images/star.png", 30, 30, 760, 240);
	star.setType("star");
	foxEngine.addCollisionEvent("player", "star", function(player, star) {
		if(!hasWeapon)
		{
			hasWeapon = true;
			star.pushY(-100000);
			setTimeout(function(){star.remove()}, 500);
		}
	});
	return [star];
}

/*
 * @desc Called when all enemies are gone
 */
function allEnemiesGone()
{
	buildGoal(160, 420);
}

/*
 * @desc Called when a player and a goal collide
 */
function playerGoalCollision(player, goal)
{
	goal.remove();
	buildEndMessage("images/you_win.png");
}
