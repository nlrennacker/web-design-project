//Code found on stackoverflow, written by Alexey D. from soshace.com
//purely for drag and drop functionality and image previewing
//changed it a little bit to fit my needs but the image validation is the same, as is the image preview 
//for the most part

var // where files are dropped + file selector is opened
  dropRegion = document.getElementById("drop-region"),
  // where images are previewed
  imagePreviewRegion = document.getElementById("image-preview");
  //the entire form
  imageForm = document.getElementById("postForm");

// open file selector when clicked on the drop region
var fakeInput = document.createElement("input");
fakeInput.name = "uploadImage";
fakeInput.type = "file";
fakeInput.accept = "image/*";
fakeInput.multiple = false;
dropRegion.addEventListener("click", function () {
  fakeInput.click();
});

fakeInput.addEventListener("change", function () {
  var files = fakeInput.files;
  document.querySelector(".imageInput").files = files;
  handleFiles(files);
});

function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

dropRegion.addEventListener("dragenter", preventDefault, false);
dropRegion.addEventListener("dragleave", preventDefault, false);
dropRegion.addEventListener("dragover", preventDefault, false);
dropRegion.addEventListener("drop", preventDefault, false);

function handleDrop(e) {
  var dt = e.dataTransfer,
    files = dt.files;
    document.querySelector(".imageInput").files = dt.files;
  

  handleFiles(files);
}

dropRegion.addEventListener("drop", handleDrop, false);

//function for multiple files which I decided I didn't want but the function stays
function handleFiles(files) {
  for (var i = 0, len = files.length; i < len; i++) {
    if (validateImage(files[i])) previewAnduploadImage(files[i]);
  }
}

function validateImage(image) {
  // check the type
  var validTypes = ["image/jpeg", "image/png", "image/gif"];
  if (validTypes.indexOf(image.type) === -1) {
    alert("Invalid File Type");
    return false;
  }

  // check the size
  var maxSizeInBytes = 10e6; // 10MB
  if (image.size > maxSizeInBytes) {
    alert("File too large");
    return false;
  }

  return true;
}

function previewAnduploadImage(image) {
  // container
  dropRegion.classList.add('hidden');

  var imgView = document.createElement("div");
  imgView.className = "image-view";
  imagePreviewRegion.appendChild(imgView);

  // previewing image
  var img = document.createElement("img");
  imgView.appendChild(img);

  // read the image...
  var reader = new FileReader();
  reader.onload = function (e) {
    img.src = e.target.result;
  };
  reader.readAsDataURL(image);

}

dropRegion.addEventListener("dragenter", highlight, false);
dropRegion.addEventListener("dragleave", unhighlight, false);
dropRegion.addEventListener("dragover", highlight, false);
dropRegion.addEventListener("drop", unhighlight, false);

function highlight() {
    dropRegion.classList.add('highlighted');
}
function unhighlight() {
    dropRegion.classList.remove("highlighted");
}