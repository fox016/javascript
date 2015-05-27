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
		{"x": 100, "y": 100, "width": 100, "height": 30, "color": "blue"},
		{"x": 300, "y": 100, "width": 100, "height": 30, "color": "blue"},
		{"x": 500, "y": 100, "width": 100, "height": 30, "color": "blue"},
		{"x": 400, "y": 300, "width": 100, "height": 30, "color": "blue"}
	],
	"action": "buildEndMessage('images/you_win.png', 'See Stats', function() { showAllLevelStats();});"
}
