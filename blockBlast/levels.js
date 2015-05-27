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
		{"x": 50, "y": 100, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 200, "y": 100, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 350, "y": 100, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 500, "y": 100, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 650, "y": 100, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 50, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 200, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 350, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 500, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 650, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
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
		{"x": 55, "y": 0, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 205, "y": 0, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 355, "y": 0, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 505, "y": 0, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 655, "y": 0, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 10, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 120, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 230, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 340, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 450, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 560, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 670, "y": 150, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 10, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 120, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 230, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 340, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 450, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 560, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
		{"x": 670, "y": 200, "width": 100, "height": 30, "color": "rgb(65,215,200)"},
	],
	"action": "buildEndMessage('images/you_win.png', 'See Stats', function() { showAllLevelStats();});"
}
