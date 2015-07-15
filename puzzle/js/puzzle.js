var documentHandler = null;

window.onload = function()
{
	document.getElementById("uploadBtn").onclick = function()
	{
                document.fileForm.fileSelect.addEventListener('change', handleFileSelect, false);
                document.fileForm.fileSelect.click();
	};
}

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

var validFileTypes = [
	"image/png",
	"image/jpg",
	"image/jpeg",
	"image/gif",
	"image/tiff",
];
