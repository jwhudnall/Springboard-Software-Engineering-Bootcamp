const form = document.querySelector('form');
const list = document.querySelector('#todos');
const todoInput = document.querySelector('input[id="newTodo"]');
const liStorageList = [];

const populateLocalStorage = function () {
  if(localStorage.todos) {
    const todos = JSON.parse(localStorage.todos);
    for (let todo of todos) {
      appendNewTodo(todo);
    }
  }
};

const appendNewTodo = function (str = '') {
  const li = document.createElement("li");
  str ? li.innerText = str : li.innerText = todoInput.value;
  sendToLocalStorage(li.innerText);
  const removeBtn = document.createElement("button");
  removeBtn.innerText = 'X';
  li.append(removeBtn);
  list.append(li);
  todoInput.value = '';
};

const sendToLocalStorage = function (text) {
  liStorageList.push(text);
  const convertedLI = JSON.stringify(liStorageList);
  localStorage.setItem('todos', convertedLI);
};

const removeFromLocalStorage = function (text) {
  let idx = liStorageList.indexOf(text);
  if (idx !== -1) {
    liStorageList.splice(idx, 1);
    const convertedLI = JSON.stringify(liStorageList);
    localStorage.setItem('todos', convertedLI);
  }
}

const removeTodo = function (e) {
  const target = e.target.parentElement.childNodes[0].textContent;
  e.target.parentElement.remove();
  removeFromLocalStorage(target);
};

const checkItem = function (e) {
  e.target.classList.toggle('checked');
};

document.addEventListener("DOMContentLoaded", function () {
  populateLocalStorage();
})

// Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  appendNewTodo();
})

list.addEventListener("click", function (e) {
  if (e.target.tagName === 'BUTTON') {
    removeTodo(e);
  } else if (e.target.tagName === 'LI') {
    checkItem(e);
  }
})