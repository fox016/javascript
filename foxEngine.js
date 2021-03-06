function _foxEngine()
{
	// Public fields
	this.delta_t = 40;
	this.typeComponentMap = {};
	this.updateInterval;
	this.lastId = 0;

	// Private fields
	var frame;
	var bg_x = 0;
	var bg_y = 0;
	var engine = this;
	var keyEvents = {};
	var keysDown = {};
	var components = {};
	var collisionEvents = [];
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

		makeBorderObjects();

		this.updateInterval = setInterval(this.update, this.delta_t);

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
	 * @desc Destroy everything, reset to defaults
	 */
	this.destroy = function()
	{
		clearInterval(this.updateInterval);
		this.updateInterval = null;
		this.typeComponentMap = {};
		for(componentId in components)
			this.removeComponent(components[componentId]);

		this.lastId = 0;
		frame = null;
		bg_x = 0;
		bg_y = 0;
		keyEvents = {};
		collisionEvents = [];
		scroll = null;
	}

	/*
	 * @desc Pause motion
	 */
	this.pause = function()
	{
		clearInterval(this.updateInterval);
		this.updateInterval = null;
	}

	/*
	 * @desc Resume motion (see this.pause function)
	 */
	this.resume = function()
	{
		this.updateInterval = setInterval(this.update, this.delta_t);
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
	this.addComponent = function(component)
	{
		frame.appendChild(component.node);
		component.node.style.display="inline";
		component.componentId = this.getNextId();
		components[component.componentId] = component;
	}

	/*
	 * @desc Remove a Component from the engine
	 */
	this.removeComponent = function(component)
	{
		// Hide
		component.node.style.display="none";

		// Remove from components list
		delete components[component.componentId];

		// Remove from type component map
		if(component.type != null && component.type in engine.typeComponentMap) {
			var i = 0;
			for(; i < engine.typeComponentMap[component.type].length; i++) {
				if(component.componentId == engine.typeComponentMap[component.type][i].componentId) {
					engine.typeComponentMap[component.type].splice(i, 1);
					break;
				}
			}
		}

		// Free memory
		if(component.node.parentNode !== null)
		{
			frame.removeChild(component.node);
			delete component;
		}
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
	 * @desc Add key pressed handler
	 */
	this.addKeyEvent = function(key, callback)
	{
		keyEvents[key] = callback;
	}

	/*
	 * @desc Delete key pressed handler
	 */
	this.deleteKeyEvent = function(key)
	{
		if(key in keyEvents)
			delete keyEvents[key];
	}

	/*
	 * @desc Add mouse motion event
	 * @param {string} targetId - id of element to apply event handler to,
	 * 	or pass in null to apply event handler to window
	 * @param {function} callback
	 */
	this.addMouseMoveEvent = function(targetId, callback)
	{
		if(typeof callback != "function")
			callback = function(mouseMoveEvent){};
		if(typeof targetId == "undefined" || targetId == null)
			window.onmousemove = callback;
		else
			document.getElementById(targetId).onmousemove = callback;
	}

	/*
	 * @desc Add collision event handler
	 */
	this.addCollisionEvent = function(type1, type2, handler)
	{
		if(!(type1 in engine.typeComponentMap))
			engine.typeComponentMap[type1] = [];
		if(!(type2 in engine.typeComponentMap))
			engine.typeComponentMap[type2] = [];
		collisionEvents.push({type1: type1, type2: type2, handler: handler});
	}

	/*
	 * @desc Update all components, call at constant interval (see open function)
	 */
	this.update = function()
	{
		// Update components
		for(componentId in components)
			components[componentId].update();

		// Detect collisions
		for(i=0; i < collisionEvents.length; i++) {
			var evt = collisionEvents[i];
			for(j=0; j < engine.typeComponentMap[evt.type1].length; j++) {
				var component1 = engine.typeComponentMap[evt.type1][j];
				for(k=0; k < engine.typeComponentMap[evt.type2].length; k++) {
					var component2 = engine.typeComponentMap[evt.type2][k];
					if(testCollision(component1, component2)) {
						evt.handler(component1, component2);
					}
				}
			}
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
	 * @desc Get next unique ID
	 */
	this.getNextId = function()
	{
		this.lastId += 1;
		return this.lastId;
	}

	/*
	 * @desc Get full width of scrollable background
	 * 	(or width of frame if no scrollable background)
	 */
	function getFullWidth()
	{
		if(scroll)
			return scroll.scrollObj.getWidth();
		return frame.width;
	}

	/*
	 * @desc Get full height of scrollable background
	 * 	(or height of frame if no scrollable background)
	 */
	function getFullHeight()
	{
		if(scroll)
			return scroll.scrollObj.getHeight();
		return frame.height;
	}

	/*
	 * @desc Test collision between two components
	 */
	function testCollision(component1, component2)
	{
		var corners1 = component1.getCorners();
		var corners2 = component2.getCorners();
		for(corner in corners1)
			if(isPointInBox(corners1[corner], corners2))
				return true;
		for(corner in corners2)
			if(isPointInBox(corners2[corner], corners1))
				return true;
		return false;
	}

	/*
	 * @desc Test if point {x, y} is inside of box {topLeft, topRight, bottomLeft, bottomRight}
	 */
	function isPointInBox(point, box)
	{
		return (point.x >= box.topLeft.x &&
			point.x <= box.topRight.x &&
			point.y >= box.topLeft.y &&
			point.y <= box.bottomLeft.y);
	}

	/*
	 * @desc Make the 4 borders of the world
	 */
	function makeBorderObjects()
	{
		var borderBottom = makeBorderObject("borderBottom");
		var borderTop = makeBorderObject("borderTop");
		var borderLeft = makeBorderObject("borderLeft");
		var borderRight = makeBorderObject("borderRight");

		borderBottom.update = function() {
			this.setComponentPosition(0, getFullHeight());
			this.setSize(getFullWidth(), 1);
		}

		borderTop.setComponentPosition(0, 0);
		borderTop.update = function() {
			this.setSize(getFullWidth(), 1);
		}

		borderLeft.setComponentPosition(0, 0);
		borderLeft.update = function() {
			this.setSize(1, getFullHeight());
		}

		borderRight.update = function() {
			this.setComponentPosition(getFullWidth(), 0);
			this.setSize(1, getFullHeight());
		}
	}

	/*
	 * @desc Initialize fields for a border object
	 * @param {string} type
	 */
	function makeBorderObject(type)
	{
		var borderObj = new engine.Component();
		borderObj.node = document.createElement("div");
		borderObj.node.style.position = "absolute";
		borderObj.setType(type);
		engine.addComponent(borderObj);
		return borderObj;
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
		this.type = null;

		this.setSize = function(width, height)
		{
			this.node.style.width = width;
			this.node.style.height = height;
		}

		this.setComponentPosition = function(x, y)
		{
			this.x = x;
			this.y = y;
			this.node.style.left = Math.round(x) + (this.fixed ? 0 : bg_x) + "px";
			this.node.style.top = Math.round(y) + (this.fixed ? 0 : bg_y) + "px";
		}

		/*
		 * @desc Sets the type of the Component and adds it to the typeComponentMap
		 */
		this.setType = function(type)
		{
			if(this.type != null)
			{
				alert("Error: type already set for this Component");
				return;
			}
			this.type = type;
			if(!(type in engine.typeComponentMap))
				engine.typeComponentMap[type] = [];
			engine.typeComponentMap[type].push(this);
		}

		this.getPosition = function()
		{
			if(this.fixed)
				return {x: this.x - bg_x, y: this.y - bg_y};
			return {x: this.x, y:this.y};
		}

		/*
		 * @desc Calculates the (x,y) coordinates of the Component's four corners
		 */
		this.getCorners = function()
		{
			var pos = this.getPosition();
			return {
				topLeft: {x: pos.x, y: pos.y},
				topRight: {x: pos.x + this.getWidth(), y: pos.y},
				bottomLeft: {x: pos.x, y: pos.y + this.getHeight()},
				bottomRight: {x: pos.x + this.getWidth(), y: pos.y + this.getHeight()},
			}
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

		/*
		 * @desc Returns true iff this Component is directly above the otherComponent
		 */
		this.isDirectlyAbove = function(otherComponent)
		{
			var thisCorners = this.getCorners();
			var otherCorners = otherComponent.getCorners();
			if(thisCorners.bottomLeft.y < otherCorners.bottomLeft.y) {
				if(thisCorners.bottomRight.x > otherCorners.bottomLeft.x)
					if(thisCorners.bottomLeft.x < otherCorners.bottomRight.x)
						return [true, thisCorners.bottomLeft.y - otherCorners.topLeft.y];
			}
			return [false, Number.POSITIVE_INFINITY];
		}

		/*
		 * @desc Returns true iff this Component is directly below the otherComponent
		 */
		this.isDirectlyBelow = function(otherComponent)
		{
			var thisCorners = this.getCorners();
			var otherCorners = otherComponent.getCorners();
			if(thisCorners.topLeft.y > otherCorners.topLeft.y) {
				if(thisCorners.bottomRight.x > otherCorners.bottomLeft.x)
					if(thisCorners.bottomLeft.x < otherCorners.bottomRight.x)
						return [true, otherCorners.bottomLeft.y - thisCorners.topLeft.y];
			}
			return [false, Number.POSITIVE_INFINITY];
		}

		/*
		 * @desc Returns true iff this Component is directly left of the otherComponent
		 */
		this.isDirectlyLeftOf = function(otherComponent)
		{
			var thisCorners = this.getCorners();
			var otherCorners = otherComponent.getCorners();
			if(thisCorners.bottomRight.x < otherCorners.bottomRight.x) {
				if(thisCorners.bottomRight.y > otherCorners.topRight.y)
					if(thisCorners.topRight.y < otherCorners.bottomRight.y)
						return [true, thisCorners.bottomRight.x - otherCorners.bottomLeft.x];
			}
			return [false, Number.POSITIVE_INFINITY];
		}

		/*
		 * @desc Returns true iff this Component is directly right of the otherComponent
		 */
		this.isDirectlyRightOf = function(otherComponent)
		{
			var thisCorners = this.getCorners();
			var otherCorners = otherComponent.getCorners();
			if(thisCorners.bottomLeft.x > otherCorners.bottomLeft.x) {
				if(thisCorners.bottomLeft.y > otherCorners.topLeft.y)
					if(thisCorners.topLeft.y < otherCorners.bottomLeft.y)
						return [true, otherCorners.bottomRight.x - thisCorners.bottomLeft.x];
			}
			return [false, Number.POSITIVE_INFINITY];
		}

		/*
		 * @desc Remove this Component from the engine
		 */
		this.remove = function()
		{
			engine.removeComponent(this);
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
		this.vel_max_left = 500;
		this.vel_max_right = 500;
		this.vel_max_up = 1200;
		this.vel_max_down = 600;

		this.isGravity = false;
		this.gravity = 1000;

		this.boundInView = false;

		/*
		 * @desc Called every delta_t milliseconds, updates physics variables
		 */
		this.update = function()
		{
			var t = engine.delta_t / 1000.0; // Convert delta_t to seconds

			// Update velocity
			this.vel_x += (this.acc_x * t);
			this.vel_y += (this.acc_y * t);
			this.vel_x = engine.getBoundedValue(this.vel_x, -1 * this.vel_max_left, this.vel_max_right);
			this.vel_y = engine.getBoundedValue(this.vel_y, -1 * this.vel_max_up, this.vel_max_down);

			// Update position
			this.pos_x += (this.vel_x * t);
			this.pos_y += (this.vel_y * t);

			// Define boundaries
			var minPosX = 0;
			var maxPosX = getFullWidth() - this.getWidth();
			var minPosY = 0;
			var maxPosY = getFullHeight() - this.getHeight();
			if(this.boundInView)
			{
				minPosX = -1 * bg_x;
				maxPosX = minPosX + frame.width;
				minPosY = -1 * bg_y;
				maxPosY = minPosY + frame.height;
			}

			// If trying to go out of X range, call onHitVerticalBorder handler
			var boundX = engine.getBoundedValue(this.pos_x, minPosX, maxPosX);
			if(boundX != this.pos_x)
			{
				this.pos_x = boundX;
				this.onHitVerticalBorder();
			}

			// If trying to go out of Y range, call onHitHorizontalBorder handler
			var boundY = engine.getBoundedValue(this.pos_y, minPosY, maxPosY);
			if(boundY != this.pos_y)
			{
				this.pos_y = boundY;
				this.onHitHorizontalBorder();
			}

			// Set Component position
			this.setComponentPosition(this.pos_x, this.pos_y);

			// Reset forces
			this.pushX(0);
			this.pushY(0);
		}

		/*
		 * @desc Apply a force in the X direction
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
					this.stopX();
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
		 * @desc Apply a force in the Y direction
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
		 * @desc Kill velocity and acceleration in the X direction
		 */
		this.stopX = function()
		{
			this.vel_x = 0;
			this.acc_x = 0;
		}

		/*
		 * @desc Kill velocity and acceleration in the Y direction
		 */
		this.stopY = function()
		{
			this.vel_y = 0;
			this.acc_y = 0;
		}

		/*
		 * @desc If Y velocity and acceleration are positive, kill them
		 */
		this.stopDown = function()
		{
			this.vel_y = Math.min(0, this.vel_y);
			this.acc_y = Math.min(0, this.acc_y);
		}

		/*
		 * @desc If Y velocity and acceleration are negative, kill them
		 */
		this.stopUp = function()
		{
			this.vel_y = Math.max(0, this.vel_y);
			this.acc_y = Math.max(0, this.acc_y);
		}

		/*
		 * @desc Reverse velocity and acceleration in X direction
		 */
		this.reverseX = function()
		{
			this.vel_x *= -1;
			this.acc_x *= -1;
		}

		/*
		 * @desc Reverse velocity and acceleration in Y direction
		 */
		this.reverseY = function()
		{
			this.vel_y *= -1;
			this.acc_y *= -1;
		}

		/*
		 * @desc Defines what happens when this object hits a vertical border
		 * @default Kill velocity and acceleration in X direction
		 */
		this.onHitVerticalBorder = function()
		{
			this.stopX();
		}

		/*
		 * @desc Defines what happens when this object hits a horizontal border
		 * @default Kill velocity and acceleration in Y direction
		 */
		this.onHitHorizontalBorder = function()
		{
			this.stopY();
		}

		/*
		 * @desc Apply (or remove) gravity to this object instance
		 * @param {bool} isGravity
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

		/*
		 * @desc Places component directly above other component
		 */
		this.placeAbove = function(otherComponent)
		{
			this.pos_y = otherComponent.y - this.getHeight();
			this.setComponentPosition(this.pos_x, this.pos_y);
		}

		/*
		 * @desc Places component directly below other component
		 */
		this.placeBelow = function(otherComponent)
		{
			this.pos_y = otherComponent.y + otherComponent.getHeight();
			this.setComponentPosition(this.pos_x, this.pos_y);
		}

		/*
		 * @desc Places component directly left of other component
		 */
		this.placeLeftOf = function(otherComponent)
		{
			this.pos_x = otherComponent.x - this.getWidth();
			this.setComponentPosition(this.pos_x, this.pos_y);
		}

		/*
		 * @desc Places component directly right of other component
		 */
		this.placeRightOf = function(otherComponent)
		{
			this.pos_x = otherComponent.x + otherComponent.getWidth();
			this.setComponentPosition(this.pos_x, this.pos_y);
		}

		/*
		 * @desc Move this object instance by amount (x,y)
		 */
		this.moveOffset = function(x, y)
		{
			this.pos_x += x;
			this.pos_y += y;
		}
	}
	this.Moveable.prototype = componentObj; // Moveable extends Component
	var moveableObj = new this.Moveable();

	/*
	 * Image Class
	 * @class module:foxEngine.Image
	 * @extends module:foxEngine.Moveable
	 * @param {string} src - classpath of image source
	 * @param {int} width - (opt, default frame width) width of image
	 * @param {int} height - (opt, default frame height) height of image
	 */
	this.Image = function(src, width, height, xPos, yPos)
	{
		if(typeof width == "undefined")
			width = frame.width;
		if(typeof height == "undefined")
			height = frame.height;
		if(typeof xPos == "undefined")
			xPos = 0;
		if(typeof yPos == "undefined")
			yPos = 0;


		this.faceRightSrc = src;
		this.faceLeftSrc = src;
		this.node = new Image();
		this.node.src = src;
		this.node.style.position = "absolute";
		this.node.ondragstart = function(){return false;};
		this.setSize(width, height);

		this.setPosition(xPos, yPos);
		this.setComponentPosition(xPos, yPos);

		this.direction = LEFT;

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
			this.direction = RIGHT;
			this.node.src = this.faceRightSrc;
		}

		/*
		 * @desc Face object to the left (see setHFlipImages function)
		 */
		this.faceLeft = function()
		{
			this.direction = LEFT;
			this.node.src = this.faceLeftSrc;
		}

		/*
		 * @desc Face object in the opposite direction (see setHFlipImages function)
		 */
		this.hFlip = function()
		{
			if(this.direction == LEFT)
				this.faceRight();
			else
				this.faceLeft();
		}

		/*
		 * @desc Get direction that object is facing
		 */
		this.getDirection = function()
		{
			return this.direction;
		}

		/*
		 * @desc Set z-index of object (higher number => more forward)
		 * @param {int} zindex
		 */
		this.setZIndex = function(zIndex)
		{
			this.node.style.zIndex = zIndex;
		}

		/*
		 * @desc Hide image from view
		 */
		this.hide = function()
		{
			this.node.style.display = "none";
		}

		/*
		 * @desc Show image in view
		 */
		this.show = function()
		{
			this.node.style.display = "inline";
		}
	}
	this.Image.prototype = moveableObj; // Image extends Moveable

	/*
	 * Button Class
	 * @class module:foxEngine.Button
	 * @extends modle:foxEngine.Component
	 * @param {string} text
	 * @param {function} handler
	 * @param {int} width - (opt, default 100)
	 * @param {int} height - (opt, default 30)
	 * @param {int} xPos - (opt, default 0)
	 * @param {int} yPos - (opt, default 0)
	 * @param {boolean} fixed - (opt, default false)
	 */
	this.Button = function(text, handler, width, height, xPos, yPos, fixed)
	{
		if(typeof width == "undefined")
			width = 100;
		if(typeof height == "undefined")
			height = 30;
		if(typeof xPos == "undefined")
			xPos = 0;
		if(typeof yPos == "undefined")
			yPos = 0;
		if(typeof fixed == "undefined")
			fixed = false;

		this.node = document.createElement('button');
		this.node.innerHTML = text;
		this.node.style.position = "absolute";
		this.node.style.cursor = "pointer";
		this.node.onclick = handler;
		this.setSize(width, height);
		this.fixed = fixed;
		this.setComponentPosition(xPos, yPos);
		engine.addComponent(this);
	}
	this.Button.prototype = componentObj;

	/*
	 * Text Class
	 * @class module:foxEngine.Text
	 * @extends modle:foxEngine.Component
	 * @param {string} text
	 * @param {int} width - (opt, default 100)
	 * @param {int} height - (opt, default 30)
	 * @param {int} xPos - (opt, default 0)
	 * @param {int} yPos - (opt, default 0)
	 * @param {boolean} fixed - (opt, default false)
	 */
	this.Text = function(text, width, height, xPos, yPos, fixed)
	{
		if(typeof width == "undefined")
			width = 100;
		if(typeof height == "undefined")
			height = 30;
		if(typeof xPos == "undefined")
			xPos = 0;
		if(typeof yPos == "undefined")
			yPos = 0;
		if(typeof fixed == "undefined")
			fixed = false;

		this.node = document.createElement('div');
		this.node.innerHTML = text;
		this.node.style.position = "absolute";
		this.setSize(width, height);
		this.fixed = fixed;
		this.setComponentPosition(xPos, yPos);
		engine.addComponent(this);

		/*
		 * @desc Set style for text div
		 * @param {string} key - name of style element (e.g. "color", "backgroundColor", "fontSize")
		 * @param {string} value - value to set style element to (e.g. "blue", "#FDFADE", "14pt")
		 */
		this.setStyle = function(key, value)
		{
			this.node.style[key] = value;
		}

		/*
		 * @desc Set text
		 */
		this.setText = function(text)
		{
			this.node.innerHTML = text;
		}
	}
	this.Text.prototype = componentObj;
}

/** @global */
var foxEngine = new _foxEngine();

var UP_KEY    = 38;
var DOWN_KEY  = 40;
var LEFT_KEY  = 37;
var RIGHT_KEY = 39;
var SPACE_KEY = 32;
var ENTER_KEY = 13;
var ESC_KEY = 27;

var RIGHT = 0;
var LEFT = 1;
var UP = 2;
var DOWN = 3;
