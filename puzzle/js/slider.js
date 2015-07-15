function Slider()
{
	var trackObj = null;
	var ballObj = null;
	var colorTrackObj = null;

	var values = [];
	var selectedValue = null;
	var setValueCallback = function(){};

	var isDragging = false;

	/*
	 * Initialize slider object
	 */
	this.init = function(trackId, ballId, colorTrackId, valueArray, callback)
	{
		trackObj = document.getElementById(trackId);
		ballObj = document.getElementById(ballId);
		colorTrackObj = document.getElementById(colorTrackId);

		values = valueArray;
		setValueCallback = callback;
		selectedValue = values[0];
		setValueCallback(selectedValue);

		addEventListeners();
	}

	/*
	 * Get value that the slider has last selected
	 */
	this.getValue = function()
	{
		return selectedValue;
	}

	/*
	 * Add mouse and touch event listeners to sliding ball
	 */
	var addEventListeners = function()
	{
		ballObj.addEventListener('mousedown', dragStart, false);
		window.addEventListener('mousemove', dragBall, false);
		window.addEventListener('mouseup', dragEnd, false);

		ballObj.addEventListener('touchstart', dragStart, false);
		window.addEventListener('touchmove', dragBall, false);
		window.addEventListener('touchend', dragEnd, false);
	}

	/*
	 * Start drag
	 */
	var dragStart = function(evt)
	{
		isDragging = true;
	}

	/*
	 * End drag
	 */
	var dragEnd = function(evt)
	{
		isDragging = false;
	}

	/*
	 * Drag the ball across the slider
	 */
	var dragBall = function(evt)
	{
		if(isDragging)
		{
			evt.preventDefault();
			var pos = getBoundedValue(evt.pageX - trackObj.offsetLeft - (ballObj.offsetWidth/2), 0, trackObj.offsetWidth - ballObj.offsetWidth);
			ballObj.style.left = pos + "px";
			colorTrackObj.style.width = pos + "px";
			for(var i = 0; i < values.length; i++)
			{
				if(pos < (i+1) * trackObj.offsetWidth / values.length)
				{
					if(selectedValue != values[i])
					{
						selectedValue = values[i];
						setValueCallback(selectedValue);
					}
					break;
				}
			}
		}
	}

	/*
	 * Return value bounded by min and max
	 */
	var getBoundedValue = function(value, min, max)
	{
		return Math.min(Math.max(value, min), max);
	}
}
