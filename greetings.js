const form = document.querySelector(".js-form"),
input = document.querySelector("input"),
greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

/*function dragged(event) {
    const temp_message = document.getSelection();
    event.clipboardData.setData('text/plain', temp_message.toString().toUpperCase());
    event.preventDefault();
    greeting.innerText = temp_message.toString();
}*/

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser===null) {
        askForName();
    } else {
        paintGreeting(currentUser);
        //greeting.addEventListener("copy", dragged);
    }
}

function init() {
    loadName();
}
init();