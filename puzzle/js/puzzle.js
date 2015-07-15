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
