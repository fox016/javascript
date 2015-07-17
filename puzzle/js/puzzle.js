var slider = null; // Object that handles slider animation
var selectedPiece = null; // Piece that is being dragged
var puzzlePieces = null; // 2D array of puzzle pieces

/*
 * Initialize components
 */
window.onload = function()
{
	document.getElementById("uploadBtn").onclick = function()
	{
                document.fileForm.fileSelect.addEventListener('change', handleFileSelect, false);
                document.fileForm.fileSelect.click();
	};

	document.getElementById("startBtn").onclick = function()
	{
		buildPuzzle();
	};

	window.addEventListener("mousemove", dragPiece, false);
	window.addEventListener("touchmove", dragPiece, false);
	window.addEventListener("mouseup", dropPiece, false);
	window.addEventListener("touchend", dropPiece, false);

	slider = new Slider();
	slider.init("sliderTrack", "sliderBall", "sliderColor", [4, 9, 16, 25], setSliderValue);
}

/*
 * Called when the slider changes position
 */
function setSliderValue(value)
{
	document.getElementById("sizeLabel").innerHTML = value + " Pieces";

	var imageParent = document.getElementById("imagePreviewDiv");
	var imageObj = document.getElementById("imagePreview");

	var overlayObj = document.getElementById("overlayTable");
	if(overlayObj != null) imageParent.removeChild(overlayObj);

	var overlay = document.createElement("table");
	overlay.id = "overlayTable";
	overlay.style.position = "absolute";
	overlay.style.width = imageObj.offsetWidth + "px";
	overlay.style.height = imageObj.offsetHeight + "px";
	overlay.style.left = imageObj.offsetLeft + "px";
	overlay.style.top = imageObj.offsetTop + "px";
	overlay.style.zIndex = 5;
	overlay.style.border = "2px groove white";
	overlay.style.borderCollapse = "collapse";

	var size = Math.sqrt(value);
	for(var i = 0; i < size; i++)
	{
		var row = document.createElement("tr");
		for(var j = 0; j < size; j++)
		{
			var cell = document.createElement("td");
			cell.style.border = "2px groove white";
			row.appendChild(cell);
		}
		overlay.appendChild(row);
	}
	imageParent.appendChild(overlay);
}

/*
 * Respond to file select
 * Read in image and replace imagePreview space
 */
function handleFileSelect(evt)
{
	var file = evt.target.files[0];

	if(typeof file == "undefined")
		return;
	if(validFileTypes.indexOf(file.type) == -1)
	{
		alert("Invalid file type: " + file.type);
		return;
	}

	var reader = new FileReader();
	reader.onload = function(e) {
		document.getElementById("imagePreview").src = e.target.result;
	}
	reader.readAsDataURL(file);
}

/*
 * Array of valid file types
 */
var validFileTypes = [
	"image/png",
	"image/jpg",
	"image/jpeg",
	"image/gif",
	"image/tiff",
];

/*
 * Build puzzle pieces from image and size inputs
 */
function buildPuzzle()
{
	clearPuzzle();
	var puzzleCanvas = document.getElementById("puzzleCanvas");
	var imageObj = document.getElementById("imagePreview");

	var size = Math.sqrt(slider.getValue());
	puzzlePieces = [];
	for(var row=0; row < size; row++)
	{
		var column = [];
		for(col=0; col < size; col++)
		{
			var piece = document.createElement("div");
			var pieceSize = imageObj.offsetWidth / size;
			piece.style.cursor = "pointer";
			piece.style.width = pieceSize + "px";
			piece.style.height = pieceSize + "px";
			piece.style.backgroundImage = "url('" + imageObj.src + "')";
			piece.style.backgroundSize = imageObj.offsetWidth + "px " + imageObj.offsetHeight + "px";
			piece.style.backgroundRepeat = "no-repeat";
			piece.style.backgroundPositionX = -1 * col * pieceSize + "px";
			piece.style.backgroundPositionY = -1 * row * pieceSize + "px";
			piece.style.position = "absolute";
			piece.style.zIndex = 6;
			piece.style.top = Math.floor(Math.random() * imageObj.offsetHeight * 1.5 + puzzleCanvas.offsetTop) + "px";
			piece.style.left = Math.floor(Math.random() * (0.8*window.innerWidth) + (0.1*window.innerWidth)) + "px";
			piece.puzzleRow = row;
			piece.puzzleCol = col;
			piece.hashCode = row * 10 + col;
			piece.group = new HashSet();
			piece.group.add(piece);
			piece.addEventListener("mousedown", function(evt) { grabPiece(this, evt); }, false);
			piece.addEventListener("touchstart", function(evt) { grabPiece(this, evt); }, false);
			puzzleCanvas.appendChild(piece);
			column.push(piece);
		}
		puzzlePieces.push(column);
	}
}

/*
 * Remove all elements from puzzle canvas
 */
function clearPuzzle()
{
	var puzzleCanvas = document.getElementById("puzzleCanvas");
	while(puzzleCanvas.firstChild) {
		puzzleCanvas.removeChild(puzzleCanvas.firstChild);
	}
}

/*
 * React to a mouse down event on a puzzle piece to select the piece
 */
function grabPiece(piece, evt)
{
	selectedPiece = piece;
	var groupList = selectedPiece.group.toList();
	for(var i = 0; i < groupList.length; i++)
	{
		groupList[i].dragStart = {x: evt.pageX, y: evt.pageY};
		groupList[i].pieceStart = {x: groupList[i].offsetLeft, y: groupList[i].offsetTop};
	}
}

/*
 * React to a mouse drag event when a piece has been selected
 */
function dragPiece(evt)
{
	if(selectedPiece != null)
	{
//		var puzzleCanvas = document.getElementById("puzzleCanvas");
		evt.preventDefault();
		var groupList = selectedPiece.group.toList();
		for(var i = 0; i < groupList.length; i++)
		{
			groupList[i].style.boxShadow = "0px 0px 20px 1px";
			groupList[i].style.zIndex = 10;
//			groupList[i].style.top = slider.getBoundedValue(groupList[i].pieceStart.y + evt.pageY - groupList[i].dragStart.y,  puzzleCanvas.offsetTop, Number.MAX_VALUE) + "px";
			groupList[i].style.top = groupList[i].pieceStart.y + evt.pageY - groupList[i].dragStart.y + "px";
			groupList[i].style.left = groupList[i].pieceStart.x + evt.pageX - groupList[i].dragStart.x + "px";
		}
	}
}

/*
 * React to a mouseup event when a piece is being dragged
 */
function dropPiece(evt)
{
	if(selectedPiece != null)
	{
		var groupList = selectedPiece.group.toList();
		for(var i = 0; i < groupList.length; i++)
		{
			joinClosePieces(groupList[i], selectedPiece.group);
			groupList[i].style.boxShadow = "none";
			groupList[i].style.zIndex = 6;
		}
		selectedPiece = null;
	}
}

/*
 * Get all of the neighbors of a puzzle piece
 */
function getNeighbors(puzzlePiece)
{
	var neighbors = {up: null, down: null, left: null, right: null};

	if(puzzlePiece.puzzleRow != 0)
		neighbors.up = puzzlePieces[puzzlePiece.puzzleRow-1][puzzlePiece.puzzleCol];
	if(puzzlePiece.puzzleRow +1 < puzzlePieces.length)
		neighbors.down = puzzlePieces[puzzlePiece.puzzleRow+1][puzzlePiece.puzzleCol];
	if(puzzlePiece.puzzleCol != 0)
		neighbors.left = puzzlePieces[puzzlePiece.puzzleRow][puzzlePiece.puzzleCol-1];
	if(puzzlePiece.puzzleCol +1 < puzzlePieces.length)
		neighbors.right = puzzlePieces[puzzlePiece.puzzleRow][puzzlePiece.puzzleCol+1];

	return neighbors;
}

/*
 * If neighboring pieces are placed close together, snap them together and add to group
 */
function joinClosePieces(puzzlePiece, currentGroup)
{
	var neighbors = getNeighbors(puzzlePiece);
	var margin = 12;

	var puzzleCanvas = document.getElementById("puzzleCanvas");

	if(neighbors.up != null && !currentGroup.contains(neighbors.up))
	{
		var topDiff = (neighbors.up.offsetTop + neighbors.up.offsetHeight) - puzzlePiece.offsetTop;
		var leftDiff = neighbors.up.offsetLeft - puzzlePiece.offsetLeft;
		if(Math.abs(topDiff) <= margin && Math.abs(leftDiff) <= margin)
		{
			console.log("connect to up");
			moveGroup(puzzlePiece, topDiff, leftDiff);
			mergeGroups(puzzlePiece, neighbors.up);
		}
	}

	if(neighbors.down != null && !currentGroup.contains(neighbors.down))
	{
		var topDiff = (neighbors.down.offsetTop - puzzlePiece.offsetHeight) - puzzlePiece.offsetTop;
		var leftDiff = neighbors.down.offsetLeft - puzzlePiece.offsetLeft;
		if(Math.abs(topDiff) <= margin && Math.abs(leftDiff) <= margin)
		{
			console.log("connect to down");
			moveGroup(puzzlePiece, topDiff, leftDiff);
			mergeGroups(puzzlePiece, neighbors.down);
		}
	}

	if(neighbors.left != null && !currentGroup.contains(neighbors.left))
	{
		var topDiff = neighbors.left.offsetTop - puzzlePiece.offsetTop;
		var leftDiff = (neighbors.left.offsetLeft + neighbors.left.offsetWidth) - puzzlePiece.offsetLeft;
		if(Math.abs(topDiff) <= margin && Math.abs(leftDiff) <= margin)
		{
			console.log("connect to left");
			moveGroup(puzzlePiece, topDiff, leftDiff);
			mergeGroups(puzzlePiece, neighbors.left);
		}
	}

	if(neighbors.right != null && !currentGroup.contains(neighbors.right))
	{
		var topDiff = neighbors.right.offsetTop - puzzlePiece.offsetTop;
		var leftDiff = (neighbors.right.offsetLeft - puzzlePiece.offsetWidth) - puzzlePiece.offsetLeft;
		if(Math.abs(topDiff) <= margin && Math.abs(leftDiff) <= margin)
		{
			console.log("connect to right");
			moveGroup(puzzlePiece, topDiff, leftDiff);
			mergeGroups(puzzlePiece, neighbors.right);
		}
	}

	console.log(puzzlePiece.group.toList());
}

/*
 * Move a group of pieces (tied to puzzlePiece) topDiff px down and leftDiff px right
 */
function moveGroup(puzzlePiece, topDiff, leftDiff)
{
	var groupList = puzzlePiece.group.toList();
	for(var i = 0; i < groupList.length; i++)
	{
		groupList[i].style.top = groupList[i].offsetTop + topDiff + "px";
		groupList[i].style.left = groupList[i].offsetLeft + leftDiff + "px";
	}
}

/*
 * Merge two pieces' groups together
 */
function mergeGroups(piece1, piece2)
{
	var newGroup = piece1.group.concat(piece2.group);
	var newGroupList = newGroup.toList();
	for(var i = 0; i < newGroupList.length; i++)
		newGroupList[i].group = newGroup;
}
