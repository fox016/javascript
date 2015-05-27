var jsonLevels = {};

jsonLevels['level1'] =
{
	"ball": {
		"x": 50,
		"y": 50,
		"vel_x": 300,
		"vel_y": 300,
		"vel_max": 300
	},
	"blocks": [
		{"x": 50, "y": 100, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 200, "y": 100, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 350, "y": 100, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 500, "y": 100, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 650, "y": 100, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 50, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 200, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 350, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 500, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 650, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
	],
	"action": "buildEndMessage('images/you_win.png', 'Next Level', function() { reset('level2');});"
}

jsonLevels['level2'] =
{
	"ball": {
		"x": 50,
		"y": 50,
		"vel_x": 300,
		"vel_y": 300,
		"vel_max": 500
	},
	"blocks": [
		{"x": 55, "y": 0, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 205, "y": 0, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 355, "y": 0, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 505, "y": 0, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 655, "y": 0, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 10, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 120, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 230, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 340, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 450, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 560, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 670, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 10, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 120, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 230, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 340, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 450, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 560, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
		{"x": 670, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
	],
	"action": "buildEndMessage('images/you_win.png', 'Next Level', function() { reset('level3');});"
}

jsonLevels['level3'] =
{
	"ball": {
		"x": 50,
		"y": 50,
		"vel_x": 300,
		"vel_y": 300,
		"vel_max": 500
	},
	"blocks": [
	{"x": 15, "y": 0, "width": 70, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
	{"x": 115, "y": 0, "width": 70, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
	{"x": 215, "y": 0, "width": 70, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
	{"x": 315, "y": 0, "width": 70, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
	{"x": 415, "y": 0, "width": 70, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
	{"x": 515, "y": 0, "width": 70, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
	{"x": 615, "y": 0, "width": 70, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
	{"x": 715, "y": 0, "width": 70, "height": 30, "color": "rgb(65,215,200)", "border": "rgb(0,0,0)"},
	],
	"bricks": [
	{"x": 50, "y": 300, "width": 100, "height": 30, "color": "rgb(255,100,100)", "border": "rgb(0,0,0)"},
	{"x": 250, "y": 300, "width": 100, "height": 30, "color": "rgb(255,100,100)", "border": "rgb(0,0,0)"},
	{"x": 450, "y": 300, "width": 100, "height": 30, "color": "rgb(255,100,100)", "border": "rgb(0,0,0)"},
	{"x": 650, "y": 300, "width": 100, "height": 30, "color": "rgb(255,100,100)", "border": "rgb(0,0,0)"},
	],
	"action": "buildEndMessage('images/you_win.png', 'See Stats', function() { showAllLevelStats();});"
}
