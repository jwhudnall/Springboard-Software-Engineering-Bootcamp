const form = document.querySelector('form');
const list = document.querySelector('#todos');
const todoInput = document.querySelector('input[id="newTodo"]');

form.addEventListener("submit", function(e) {
  e.preventDefault();
  appendNewTodo();
})

list.addEventListener("click", function(e) {
  // if target === 'BUTTON' => removeTodo
  // else if target === "LI" => toggleClass
  // console.log(e.target);
  if (e.target.tagName === 'BUTTON') {
    removeTodo(e);
  } else if (e.target.tagName === 'LI') {
    checkItem(e);
  }
})

const appendNewTodo = function() {
  const li = document.createElement("li");
  li.innerText = todoInput.value;
  const removeBtn = document.createElement("button");
  removeBtn.innerText = 'X';
  li.append(removeBtn);
  list.append(li);
  todoInput.value = '';
}

const removeTodo = function(e) {
  e.target.parentElement.remove();
}

const checkItem = function(e) {
  e.target.classList.toggle('checked');
}