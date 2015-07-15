var slider = null;
var selectedPiece = null;

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
	overlay.style.zindex = 5;
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
	for(var row=0; row < size; row++)
	{
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
			piece.style.top = Math.floor(Math.random() * imageObj.offsetHeight * 1.5 + puzzleCanvas.offsetTop) + "px";
			piece.style.left = Math.floor(Math.random() * (0.8*window.innerWidth) + (0.1*window.innerWidth)) + "px";
			piece.addEventListener("mousedown", function(evt) { selectedPiece = this; }, false);
			piece.addEventListener("touchstart", function(evt) { selectedPiece = this; }, false);
			puzzleCanvas.appendChild(piece);
		}
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
 * React to a mouse drag event when a piece has been selected
 */
function dragPiece(evt)
{
	if(selectedPiece != null)
	{
		var puzzleCanvas = document.getElementById("puzzleCanvas");
		evt.preventDefault();
		selectedPiece.style.boxShadow = "0px 0px 20px 1px";
		selectedPiece.style.top = slider.getBoundedValue(evt.pageY - selectedPiece.offsetHeight/2,  puzzleCanvas.offsetTop, Number.MAX_VALUE) + "px";
		selectedPiece.style.left = evt.pageX - selectedPiece.offsetWidth/2 + "px";
	}
}

/*
 * React to a mouseup event when a piece is being dragged
 */
function dropPiece(evt)
{
	if(selectedPiece != null)
	{
		selectedPiece.style.boxShadow = "none";
		selectedPiece = null;
	}
}
