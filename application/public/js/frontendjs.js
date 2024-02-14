
function setFlashMessageFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - .05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 30);
    }, 2000)
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message');
    innerFlashDiv.setAttribute('class', 'alert alert-info');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);
}

function executeSearch() {
    let searchTerm = document.getElementById('search-bar').value;
    if (!searchTerm) {
        location.replace('/');
        return;
    }
    let mainContent = document.getElementById('body_container_gallery');
    let searchURL = `/posts/search?search=${searchTerm}`;
    fetch(searchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let newMainContentHTML = '';
            data_json.results.forEach((row) => {
                newMainContentHTML += createCard(row);
            });
            mainContent.innerHTML = newMainContentHTML;
            if (data_json.message) {
                addFlashFromFrontEnd(data_json.message);
            }
        })
        .catch((err) => console.log(err));

}

function createCard(postData) {
    return `<div class="container image_container" id="post-${postData.id}" onclick="window.location='/post/${postData.id}';">
    <div class="major-image">
        <img class="imageReal" src="${postData.thumbnail}" alt="Missing Image">
    <div class="major-image text-container">
    <div class="major-image-header" id="major-image-header">
    <a class="imageText major-image-title" id="photoTitle">${postData.title}</a>
    </div>
    <a class="imageText upload-date" id="date">${postData.created}</a>
    </div>
    </div>
</div>`
}

let flashElement = document.getElementById('flash-message');
if (flashElement) {
    setFlashMessageFadeOut(flashElement);
}

let searchButton = document.getElementById('search-button');

if (searchButton) {
    searchButton.onclick = executeSearch;
}