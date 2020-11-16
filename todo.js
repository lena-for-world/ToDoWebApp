const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "todos";

let toDos = [];
const temp1 = 1;

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDos) {
        return parseInt(li.id) !== toDos.id;
    });
    toDos = cleanToDos;
    saveToDos();
}

function paintToDo(value) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click", deleteToDo);
    span.innerText = value;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        id: newId,
        text: value
    }
    toDos.push(toDoObj);
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadTodos() {
    const loadedTodos = localStorage.getItem(TODO_LS);
    if(loadedTodos !== null) {
        const parserdToDos = JSON.parse(loadedTodos);
        parserdToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadTodos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();