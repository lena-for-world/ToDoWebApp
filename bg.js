const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function getRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function paintBackground() {
    fetch (
        'https://api.unsplash.com/photos/random/?client_id=daMS23SrcTQYaNEBZ6Qho8Ytxw_zvVIf5GwbyrL5OAo'
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const image = new Image();
        image.src = json.urls.full + "auto=format";
        image.classList.add("bgImage");
        body.prepend(image);
    });
}

function init() {
    //const randomNumber = getRandom();
    //paintImage(randomNumber);
    paintBackground();
}

init();