var slider = null;

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
	overlay.style.border = "2px solid black";
	overlay.style.borderCollapse = "collapse";

	var size = Math.sqrt(value);
	for(var i = 0; i < size; i++)
	{
		var row = document.createElement("tr");
		for(var j = 0; j < size; j++)
		{
			var cell = document.createElement("td");
			cell.style.border = "2px solid black";
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
