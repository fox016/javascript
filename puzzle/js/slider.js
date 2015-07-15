function Slider()
{
	var trackObj = null;
	var ballObj = null;
	var colorTrackObj;
	var values = [];
	var setValueCallback = function(){};

	var isDragging = false;

	this.init = function(trackId, ballId, colorTrackId, valueArray, callback)
	{
		trackObj = document.getElementById(trackId);
		ballObj = document.getElementById(ballId);
		colorTrackObj = document.getElementById(colorTrackId);
		values = valueArray;
		setValueCallback = callback;

		addEventListeners();
	}

	var addEventListeners = function()
	{
		ballObj.addEventListener('mousedown', dragStart, false);
		trackObj.addEventListener('mousemove', dragBall, false);
		window.addEventListener('mouseup', dragEnd, false);

		ballObj.addEventListener('touchstart', dragStart, false);
		trackObj.addEventListener('touchmove', dragBall, false);
		window.addEventListener('touchend', dragEnd, false);
	}

	var dragStart = function(evt)
	{
		isDragging = true;
	}

	var dragEnd = function(evt)
	{
		isDragging = false;
	}

	var dragBall = function(evt)
	{
		if(isDragging)
		{
			var pos = getBoundedValue(evt.pageX - trackObj.offsetLeft - (ballObj.offsetWidth/2), 0, trackObj.offsetWidth - ballObj.offsetWidth);
			ballObj.style.left = pos + "px";
			colorTrackObj.style.width = pos + "px";
			for(var i = 0; i < values.length; i++)
			{
				if(pos < (i+1) * trackObj.offsetWidth / values.length)
				{
					setValueCallback(values[i]);
					break;
				}
			}
		}
	}

	var getBoundedValue = function(value, min, max)
	{
		return Math.min(Math.max(value, min), max);
	}
}
