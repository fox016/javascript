function _foxEngine()
{
	// Public fields
	this.delta_t = 40;

	// Private fields
	var frame;
	var bg_x = 0;
	var bg_y = 0;
	var engine = this;
	var keyEvents = {};
	var keysDown = {};
	var components = [];
	var scroll;

	/*
	 * @desc Sets an element to be the frame (root element for all objects)
	 * @param {string} targetId - The ID of the target element
	 * @param {int} width - (opt, default 500) Width of frame
	 * @param {int} height - (opt, default 400) Height of frame
	 */
	this.open = function(targetId, width, height)
	{
		if(typeof width == "undefined")
			width = 500;
		if(typeof height == "undefined")
			height = 400;
		frame = document.getElementById(targetId);
		if(typeof frame == "undefined" || frame == null)
		{
			alert("Unable to open: Invalid target");
			return;
		}

		frame.width = width;
		frame.height = height;
		frame.style.width = width + "px";
		frame.style.height = height + "px";
		frame.style.position = "relative";
		frame.style.overflow = "hidden";
		frame.x = frame.getBoundingClientRect().top;
		frame.y = frame.getBoundingClientRect().left;

		setInterval(this.update, this.delta_t);

		window.onkeydown = function(e) {
			keysDown[e.keyCode] = true;
			if(e.keyCode in keyEvents)
				e.preventDefault();
		}
		window.onkeyup = function(e) {
			delete keysDown[e.keyCode];
			if(e.keyCode in keyEvents)
				e.preventDefault();
		}
	}

	/*
	 * Getters
	 */
	this.getHeight = function() { return frame.height; }
	this.getWidth = function() { return frame.width; }
	this.getComponents = function() { return components; }

	/*
	 * @desc Add a Component to the engine
	 */
	this.addComponent = function(obj)
	{
		obj.node.style.display="inline";
		components.push(obj);
	}

	/*
	 * @desc Scroll the scrollObj to follow the followObj
	 */
	this.scrollToFollow = function(scrollObj, followObj)
	{
		scroll = {scrollObj: scrollObj, followObj: followObj};
	}

	/*
	 * @desc Get bounded value between min and max
	 * 	If value is between min and max, return value
	 * 	If value is less than min, return min
	 * 	If value is greater than max, return max
	 */
	this.getBoundedValue = function(value, min, max)
	{
		return Math.min(Math.max(value, min), max);
	}

	/*
	 * @desc Add key down handler
	 */
	this.keyDown = function(key, callback)
	{
		keyEvents[key] = callback;
	}

	/*
	 * @desc Update all components, call at constant interval (see open function)
	 */
	this.update = function()
	{
		// Update components
		for(i=0; i < components.length; i++) {
			components[i].update();
		}

		// Perform key events
		for(key in keysDown) {
			if(typeof keyEvents[key] == "function")
				keyEvents[key]();
		}

		// Scroll
		if(scroll)
		{
			bg_x = engine.getBoundedValue((frame.width/2) - (scroll.followObj.x +
						(scroll.followObj.getWidth()/2)), -1 *
						(scroll.scrollObj.getWidth()-frame.width), 0);
			bg_y = engine.getBoundedValue((frame.height/2) - (scroll.followObj.y +
						(scroll.followObj.getHeight()/2)), -1 *
						(scroll.scrollObj.getHeight()-frame.height), 0);
		}
	}

	/*
	 * @desc get full width of scrollable background
	 * 	(or width of frame if no scrollable background)
	 */
	function getFullWidth()
	{
		if(scroll)
			return scroll.scrollObj.getWidth();
		return frame.width;
	}

	/*
	 * @desc get full height of scrollable background
	 * 	(or height of frame if no scrollable background)
	 */
	function getFullHeight()
	{
		if(scroll)
			return scroll.scrollObj.getHeight();
		return frame.height;
	}

	/*
	 * Component class
	 * @class module:foxEngine.Component
	 * @classdesc A base class that contains basic functionality common to 
	 * 	many foxEngine entities
	 */
	this.Component = function()
	{
		this.x = 0;
		this.y = 0;
		this.fixed = false;

		this.setSize = function(width, height)
		{
			this.node.width = width;
			this.node.height = height;
		}

		this.setComponentPosition = function(x, y)
		{
			this.x = x;
			this.y = y;
			this.node.style.left = Math.round(x) + (this.fixed ? 0 : bg_x) + "px";
			this.node.style.top = Math.round(y) + (this.fixed ? 0 : bg_y) + "px";
		}

		this.getPosition = function()
		{
			if(this.fixed)
				return {x: this.x - bg_x, y: this.y - bg_y};
			return {x: this.x, y:this.y};
		}

		this.getWidth = function()
		{
			return this.node.offsetWidth;
		}

		this.getHeight = function()
		{
			return this.node.offsetHeight;
		}

		this.getCenter = function()
		{
			return {x: this.x + (this.getWidth() / 2), y: this.y + (this.getHeight() / 2)};
		}

		this.update = function()
		{
		}
	}
	var componentObj = new this.Component();

	/*
	 * Moveable class
	 * @class module:foxEngine.Moveable
	 * @extends module:foxEngine.Component
	 */
	this.Moveable = function()
	{
		this.mass = 10;

		this.pos_x = 0;
		this.pos_y = 0;
		this.vel_x = 0;
		this.vel_y = 0;
		this.acc_x = 0;
		this.acc_y = 0;

		this.friction = 0.2;
		this.vel_margin = 5.0; // If velocity is within vel_margin of 0, consider velocity to be 0
		this.vel_max_x = 500;
		this.vel_max_y = 1000;

		this.isGravity = false;
		this.gravity = 1000;

		/*
		 * Called every delta_t milliseconds, updates physics variables
		 */
		this.update = function()
		{
			var t = engine.delta_t / 1000.0; // Convert delta_t to seconds

			// Update velocity
			this.vel_x += (this.acc_x * t);
			this.vel_y += (this.acc_y * t);
			this.vel_x = engine.getBoundedValue(this.vel_x, -1 * this.vel_max_x, this.vel_max_x);
			this.vel_y = engine.getBoundedValue(this.vel_y, -1 * this.vel_max_y, this.vel_max_y);

			// Update position
			this.pos_x += (this.vel_x * t);
			this.pos_y += (this.vel_y * t);
			var boundX = engine.getBoundedValue(this.pos_x, 0, getFullWidth() - this.getWidth());
			if(boundX != this.pos_x)
			{
				this.pos_x = boundX;
				this.vel_x = 0;
			}
			var boundY = engine.getBoundedValue(this.pos_y, 0, getFullHeight() - this.getHeight());
			if(boundY != this.pos_y)
			{
				this.pos_y = boundY;
				this.vel_y = 0;
			}
			this.setComponentPosition(this.pos_x, this.pos_y);

			// Reset forces
			this.pushX(0);
			this.pushY(0);
		}

		/*
		 * Apply a force in the X direction
		 * @param {int} force - positive is right, negative is left
		 */
		this.pushX = function(force)
		{
			var fN = this.mass * this.gravity;	// "Normal" force
			var fF = fN * this.friction;		// Friction

			// Static friction
			if(this.vel_x > (-1 * this.vel_margin) && this.vel_x < this.vel_margin)
			{
				if(force > 0)
					fF *= -1; // Friction opposes direction of force
				if(Math.abs(force) >= Math.abs(fF))
					this.acc_x = (force + fF) / this.mass;
				else // If force not enough to overcome static friction
				{
					this.vel_x = 0;
					this.acc_x = 0;
				}
			}

			// Kinetic friction
			else
			{
				if(this.vel_x > 0)
					fF *= -1; // Friction opposes direction of velocity
				this.acc_x = (force + fF) / this.mass;
			}
		}

		/*
		 * Apply a force in the Y direction
		 * @param {int} force - positive is down, negative is up
		 */
		this.pushY = function(force)
		{
			var fN = this.mass * this.gravity; 	// "Normal" force
			var fF = fN * this.friction; 		// Friction
			var fG = 0; 				// Gravity
			if(this.isGravity)
			{
				fF = 0;
				fG = fN;
			}

			// Static friction
			if(this.vel_y > (-1 * this.vel_margin) && this.vel_y < this.vel_margin)
			{
				if(force > 0)
					fF *= -1; // Friction opposes direction of force
				if(Math.abs(force) >= Math.abs(fF))
					this.acc_y = (force + fF + fG) / this.mass;
				else // If force not enough to overcome static friction
				{
					this.vel_y = 0;
					this.acc_y = fG / this.mass;
				}
			}

			// Kinetic friction
			else
			{
				if(this.vel_y > 0)
					fF *= -1; // Friction opposes direction of velocity
				this.acc_y = (force + fF + fG) / this.mass;
			}
		}

		/*
		 * @desc Apply (or remove) gravity to this object instance
		 * @param isGravity {bool}
		 */
		this.applyGravity = function(isGravity)
		{
			this.isGravity = isGravity;
		}

		/*
		 * @desc Move this object instance to coordinates (x,y)
		 */
		this.setPosition = function(x, y)
		{
			this.pos_x = x;
			this.pos_y = y;
		}
	}
	this.Moveable.prototype = componentObj; // Moveable extends Component
	var moveableObj = new this.Moveable();

	/*
	 * Image Class
	 * @class module:foxEngine.Image
	 * @extends module:foxEngine.Moveable
	 * @param src {string} - classpath of image source
	 * @param width {int} - (opt, default frame width) width of image
	 * @param height {int} - (opt, default frame height) height of image
	 */
	this.Image = function(src, width, height)
	{
		if(typeof width == "undefined")
			width = frame.width;
		if(typeof height == "undefined")
			height = frame.height;

		this.faceRightSrc = src;
		this.faceLeftSrc = src;
		this.node = new Image();
		this.node.src = src;
		this.node.style.position = "absolute";
		this.node.ondragstart = function(){return false;};
		this.node.width = width;
		this.node.height = height;
		frame.appendChild(this.node);
		engine.addComponent(this);

		/*
		 * @desc Set different images for when player is facing right/left
		 * @param {string} faceRightSrc - classpath of image to face right
		 * @param {string} faceLeftSrc - classpath of image to face left
		 */
		this.setHFlipImages = function(faceRightSrc, faceLeftSrc)
		{
			this.faceRightSrc = faceRightSrc;
			this.faceLeftSrc = faceLeftSrc;
		}

		/*
		 * @desc Face object to the right (see setHFlipImages function)
		 */
		this.faceRight = function()
		{
			this.node.src = this.faceRightSrc;
		}

		/*
		 * @desc Face object to the left (see setHFlipImages function)
		 */
		this.faceLeft = function()
		{
			this.node.src = this.faceLeftSrc;
		}
	}
	this.Image.prototype = moveableObj; // Image extends Moveable
}

/** @global */
var foxEngine = new _foxEngine();

var UP_KEY    = 38;
var DOWN_KEY  = 40;
var LEFT_KEY  = 37;
var RIGHT_KEY = 39;
var SPACE_KEY = 32;
