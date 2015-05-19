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
	"bricks": [],
	"stars": [],
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
	"bricks": [],
	"stars": [
		{"x": 1200, "y": 240}
	],
	"goal": {"x": 160, "y": 420, "action": "buildEndMessage('images/you_win.png', 'Next Level', function(){ reset('level3');});"}
}

jsonLevels['level3'] =
{
	"background": {
		"img": "images/field.jpg",
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
	"platforms": [],
	"bricks": [
		{"x": 75, "y": 400, "width": 100, "height": 100},
		{"x": 625, "y": 400, "width": 100, "height": 100},
		{"x": 275, "y": 350, "width": 250, "height": 50},
		{"x": 275, "y": 300, "width": 50, "height": 50},
		{"x": 475, "y": 300, "width": 50, "height": 50}
	],
	"stars": [],
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
	"goal": {"x": 385, "y": 50, "action": "buildEndMessage('images/you_win.png', 'Start Over', function(){ reset('level1');});"}
}
