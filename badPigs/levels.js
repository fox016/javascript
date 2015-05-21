var jsonLevels = {};

jsonLevels['level1'] =
{
	"background": {
		"img": "images/field.jpg",
		"width": 1750,
		"height": 500
	},
	"enemies": {
		"vel_max_x": 100,
		"positions": [
			{"x": 100, "y": 300, "dir": 1},
			{"x": 250, "y": 300, "dir": -1},
			{"x": 400, "y": 300, "dir": 1},
			{"x": 550, "y": 300, "dir": -1},
			{"x": 700, "y": 300, "dir": 1},
			{"x": 850, "y": 300, "dir": -1},
			{"x": 1000, "y": 300, "dir": 1},
			{"x": 1150, "y": 300, "dir": -1},
			{"x": 1300, "y": 300, "dir": 1},
			{"x": 1450, "y": 300, "dir": -1},
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
	"goal": {"x": 1550, "y": 34, "action": "buildEndMessage('images/you_win.png', 'Next Level', function(){ reset('level2');});"}
}

jsonLevels['level2'] =
{
	"background": {
		"img": "images/field.jpg",
		"width": 2500,
		"height": 500
	},
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
	"stars": [
		{"x": 1200, "y": 240}
	],
	"goal": {"x": 160, "y": 420, "action": "buildEndMessage('images/you_win.png', 'Next Level', function(){ reset('level3');});"}
}

jsonLevels['level3'] =
{
	"background": {
		"img": "images/night.jpg",
		"width": 800,
		"height": 500
	},
	"enemies": {
		"vel_max_x": 100,
		"positions": [
			{"x": 475, "y": 400, "dir": 1},
			{"x": 475, "y": 400, "dir": -1},
			{"x": 375, "y": 280, "dir": -1},
		]
	},
	"bricks": [
		{"x": 75, "y": 400, "width": 100, "height": 100},
		{"x": 625, "y": 400, "width": 100, "height": 100},
		{"x": 275, "y": 350, "width": 250, "height": 50},
		{"x": 275, "y": 300, "width": 50, "height": 50},
		{"x": 475, "y": 300, "width": 50, "height": 50}
	],
	"goal": {"x": 409, "y": 500, "action": "buildEndMessage('images/you_win.png', 'Next Level', function(){ reset('level4');});"}
}

jsonLevels['level4'] =
{
	"background": {
		"img": "images/field.jpg",
		"width": 800,
		"height": 900
	},
	"enemies": {
		"vel_max_x": 150,
		"positions": [
			{"x": 180, "y": 780, "dir": 1},
			{"x": 350, "y": 680, "dir": 1},
			{"x": 520, "y": 580, "dir": 1},
			{"x": 180, "y": 380, "dir": 1},
			{"x": 350, "y": 280, "dir": 1},
			{"x": 520, "y": 180, "dir": 1}
		]
	},
	"platforms": [
		{"x": 350, "y": 800, "width": 100, "height": 30},
		{"x": 350, "y": 700, "width": 100, "height": 30},
		{"x": 350, "y": 600, "width": 100, "height": 30},
		{"x": 350, "y": 500, "width": 100, "height": 30},
		{"x": 350, "y": 400, "width": 100, "height": 30},
		{"x": 350, "y": 300, "width": 100, "height": 30},
		{"x": 350, "y": 200, "width": 100, "height": 30},
		{"x": 350, "y": 100, "width": 100, "height": 30}
	],
	"bricks": [
		{"x": 150, "y": 100, "width": 30, "height": 730},
		{"x": 620, "y": 100, "width": 30, "height": 730},
		{"x": 180, "y": 800, "width": 170, "height": 30},
		{"x": 180, "y": 700, "width": 170, "height": 30},
		{"x": 180, "y": 600, "width": 170, "height": 30},
		{"x": 180, "y": 500, "width": 170, "height": 30},
		{"x": 180, "y": 400, "width": 170, "height": 30},
		{"x": 180, "y": 300, "width": 170, "height": 30},
		{"x": 180, "y": 200, "width": 170, "height": 30},
		{"x": 180, "y": 100, "width": 170, "height": 30},
		{"x": 450, "y": 800, "width": 170, "height": 30},
		{"x": 450, "y": 700, "width": 170, "height": 30},
		{"x": 450, "y": 600, "width": 170, "height": 30},
		{"x": 450, "y": 500, "width": 170, "height": 30},
		{"x": 450, "y": 400, "width": 170, "height": 30},
		{"x": 450, "y": 300, "width": 170, "height": 30},
		{"x": 450, "y": 200, "width": 170, "height": 30},
		{"x": 450, "y": 100, "width": 170, "height": 30}
	],
	"stars": [{"x": 385, "y": 50}],
	"goal": {"x": 385, "y": 50, "action": "buildEndMessage('images/you_win.png', 'Next Level', function(){ reset('level5');});"}
}

jsonLevels['level5'] =
{
	"background": {
		"img": "images/night.jpg",
		"width": 1400,
		"height": 500
	},
	"enemies": {
		"vel_max_x": 150,
		"positions": [
			{"x": 200, "y": 200, "dir": 1},
			{"x": 250, "y": 200, "dir": 1},
			{"x": 300, "y": 200, "dir": 1},
			{"x": 350, "y": 200, "dir": 1},
			{"x": 400, "y": 200, "dir": 1},
			{"x": 450, "y": 200, "dir": 1},
			{"x": 500, "y": 200, "dir": 1},
			{"x": 550, "y": 200, "dir": 1},
			{"x": 600, "y": 200, "dir": 1},
			{"x": 650, "y": 200, "dir": 1},
			{"x": 700, "y": 200, "dir": 1},
			{"x": 750, "y": 200, "dir": 1},
			{"x": 800, "y": 200, "dir": 1},
			{"x": 850, "y": 200, "dir": 1},
			{"x": 900, "y": 200, "dir": 1},
			{"x": 950, "y": 200, "dir": 1},
			{"x": 1000, "y": 200, "dir": 1}
		]
	},
	"platforms": [
		{"x": 200, "y": 490, "width": 1000, "height": 15},
		{"x": 250, "y": 480, "width": 900, "height": 15},
		{"x": 300, "y": 470, "width": 800, "height": 15},
		{"x": 350, "y": 460, "width": 700, "height": 15},
		{"x": 400, "y": 450, "width": 600, "height": 15},
		{"x": 450, "y": 440, "width": 500, "height": 15},
		{"x": 500, "y": 430, "width": 400, "height": 15},
		{"x": 550, "y": 420, "width": 300, "height": 15},
		{"x": 600, "y": 410, "width": 200, "height": 15},
		{"x": 650, "y": 400, "width": 100, "height": 15},
		{"x": 650, "y": 300, "width": 100, "height": 15},
		{"x": 650, "y": 200, "width": 100, "height": 15},
		{"x": 650, "y": 100, "width": 100, "height": 15}
	],
	"bricks": [
		{"x": 100, "y": 400, "width": 100, "height": 100},
		{"x": 1200, "y": 400, "width": 100, "height": 100}
	],
	"goal": {"x": 400, "y": 125, "action": "buildEndMessage('images/you_win.png', 'Next Level', function(){ reset('level6');});"}
}

jsonLevels['level6'] =
{
	"background": {
		"img": "images/field.jpg",
		"width": 3700,
		"height": 500
	},
	"enemies": {
		"vel_max_x": 150,
		"positions": [
			{"x": 25, "y": 270, "dir": 1},
			{"x": 75, "y": 270, "dir": 1},
			{"x": 425, "y": 270, "dir": 1},
			{"x": 475, "y": 270, "dir": 1},
			{"x": 825, "y": 270, "dir": 1},
			{"x": 875, "y": 270, "dir": 1},
			{"x": 1225, "y": 270, "dir": 1},
			{"x": 1275, "y": 270, "dir": 1},
			{"x": 1625, "y": 270, "dir": 1},
			{"x": 1675, "y": 270, "dir": 1},
			{"x": 2025, "y": 270, "dir": 1},
			{"x": 2075, "y": 270, "dir": 1},
			{"x": 2425, "y": 270, "dir": 1},
			{"x": 2475, "y": 270, "dir": 1},
			{"x": 2825, "y": 270, "dir": 1},
			{"x": 2875, "y": 270, "dir": 1},
			{"x": 3225, "y": 270, "dir": 1},
			{"x": 3275, "y": 270, "dir": 1}
		]
	},
	"platforms": [
		{"x": 0, "y": 100, "width": 50, "height": 20}
	],
	"bricks": [
		{"x": 0, "y": 300, "width": 200, "height": 100},
		{"x": 400, "y": 300, "width": 200, "height": 100},
		{"x": 800, "y": 300, "width": 200, "height": 100},
		{"x": 1200, "y": 300, "width": 200, "height": 100},
		{"x": 1600, "y": 300, "width": 200, "height": 100},
		{"x": 2000, "y": 300, "width": 200, "height": 100},
		{"x": 2400, "y": 300, "width": 200, "height": 100},
		{"x": 2800, "y": 300, "width": 200, "height": 100},
		{"x": 3200, "y": 300, "width": 200, "height": 100},
		{"x": 0, "y": 280, "width": 20, "height": 20},
		{"x": 400, "y": 280, "width": 20, "height": 20},
		{"x": 800, "y": 280, "width": 20, "height": 20},
		{"x": 1200, "y": 280, "width": 20, "height": 20},
		{"x": 1600, "y": 280, "width": 20, "height": 20},
		{"x": 2000, "y": 280, "width": 20, "height": 20},
		{"x": 2400, "y": 280, "width": 20, "height": 20},
		{"x": 2800, "y": 280, "width": 20, "height": 20},
		{"x": 3200, "y": 280, "width": 20, "height": 20},
		{"x": 180, "y": 280, "width": 20, "height": 20},
		{"x": 580, "y": 280, "width": 20, "height": 20},
		{"x": 980, "y": 280, "width": 20, "height": 20},
		{"x": 1380, "y": 280, "width": 20, "height": 20},
		{"x": 1780, "y": 280, "width": 20, "height": 20},
		{"x": 2180, "y": 280, "width": 20, "height": 20},
		{"x": 2580, "y": 280, "width": 20, "height": 20},
		{"x": 2980, "y": 280, "width": 20, "height": 20},
		{"x": 3380, "y": 280, "width": 20, "height": 20}
	],
	"lava": [
		{"x": 0, "y": 400, "width": 3700, "height": 100}
	],
	"goal": {"x": 2885, "y": 250, "action": "buildEndMessage('images/you_win.png', 'Next Level', function(){ reset('level7');});"}
}

jsonLevels['level7'] =
{
	"background": {
		"img": "images/night.jpg",
		"width": 2000,
		"height": 750
	},
	"enemies": {
		"vel_max_x": 300,
		"positions": [
			{"x": 295, "y": 370, "dir": 1},
			{"x": 295, "y": 370, "dir": -1},
			{"x": 695, "y": 370, "dir": 1},
			{"x": 695, "y": 370, "dir": -1},
			{"x": 1095, "y": 370, "dir": 1},
			{"x": 1095, "y": 370, "dir": -1},
			{"x": 1495, "y": 370, "dir": 1},
			{"x": 1495, "y": 370, "dir": -1},
			{"x": 230, "y": 150, "dir": 1},
			{"x": 290, "y": 150, "dir": 1},
			{"x": 350, "y": 150, "dir": 1},
			{"x": 410, "y": 150, "dir": 1},
			{"x": 470, "y": 150, "dir": 1},
			{"x": 530, "y": 150, "dir": 1},
			{"x": 590, "y": 150, "dir": 1},
			{"x": 650, "y": 150, "dir": 1},
			{"x": 710, "y": 150, "dir": 1},
			{"x": 770, "y": 150, "dir": 1},
			{"x": 830, "y": 150, "dir": 1},
			{"x": 890, "y": 150, "dir": 1},
			{"x": 950, "y": 150, "dir": 1},
			{"x": 1010, "y": 150, "dir": 1},
			{"x": 1070, "y": 150, "dir": 1},
			{"x": 1130, "y": 150, "dir": 1},
			{"x": 1190, "y": 150, "dir": 1},
			{"x": 1250, "y": 150, "dir": 1},
			{"x": 1310, "y": 150, "dir": 1},
			{"x": 1370, "y": 150, "dir": 1},
			{"x": 1430, "y": 150, "dir": 1},
			{"x": 1490, "y": 150, "dir": 1},
			{"x": 1550, "y": 150, "dir": 1},
			{"x": 1610, "y": 150, "dir": 1},
			{"x": 1670, "y": 150, "dir": 1},
			{"x": 1730, "y": 150, "dir": 1},
			{"x": 1790, "y": 150, "dir": 1},
			{"x": 1850, "y": 150, "dir": 1},
			{"x": 1910, "y": 150, "dir": 1},
		]
	},
	"platforms": [
		{"x": 0, "y": 100, "width": 100, "height": 30},
		{"x": 0, "y": 200, "width": 100, "height": 30},
		{"x": 0, "y": 300, "width": 100, "height": 30},
		{"x": 0, "y": 400, "width": 100, "height": 30},
		{"x": 0, "y": 500, "width": 100, "height": 30},
		{"x": 0, "y": 600, "width": 100, "height": 30},
		{"x": 1900, "y": 100, "width": 100, "height": 30},
		{"x": 1900, "y": 200, "width": 100, "height": 30},
		{"x": 1900, "y": 300, "width": 100, "height": 30},
	],
	"bricks": [
		{"x": 130, "y": 400, "width": 1770, "height": 30},
		{"x": 100, "y": 100, "width": 30, "height": 500},
		{"x": 230, "y": 500, "width": 1800, "height": 30},
		{"x": 100, "y": 600, "width": 1800, "height": 30},
		{"x": 0, "y": 700, "width": 2000, "height": 30},
		{"x": 200, "y": 370, "width": 30, "height": 30},
		{"x": 400, "y": 370, "width": 30, "height": 30},
		{"x": 600, "y": 370, "width": 30, "height": 30},
		{"x": 800, "y": 370, "width": 30, "height": 30},
		{"x": 1000, "y": 370, "width": 30, "height": 30},
		{"x": 1200, "y": 370, "width": 30, "height": 30},
		{"x": 1400, "y": 370, "width": 30, "height": 30},
		{"x": 1600, "y": 370, "width": 30, "height": 30},
		{"x": 1800, "y": 370, "width": 30, "height": 30},
		{"x": 200, "y": 200, "width": 1700, "height": 30},
		{"x": 200, "y": 130, "width": 30, "height": 70},
		{"x": 200, "y": 100, "width": 1700, "height": 30},
	],
	"stars": [
		{"x": 35, "y": 170},
	],
	"lava": [
		{"x": 430, "y": 370, "width": 170, "height": 30},
		{"x": 830, "y": 370, "width": 170, "height": 30},
		{"x": 1230, "y": 370, "width": 170, "height": 30},
		{"x": 1630, "y": 370, "width": 170, "height": 30},
	],
	"goal": {"x": 34, "y": 68, "action": "buildEndMessage('images/you_win.png', 'See Stats', function(){ showLevelStats(); });"}
}
