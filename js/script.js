const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");
const todoList = document.getElementById("todoList");

let todos = [];

function renderTodos() {
  todoList.innerHTML = "";
  if (todos.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" style="text-align: center;">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.completed ? "Done" : "Pending"}</td>
      <td class="actions">
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function addTodo() {
  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert("Please fill in both task and date!");
    return;
  }

  todos.push({ task, date, completed: false });
  todoInput.value = "";
  dateInput.value = "";
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleStatus(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteAllTodos() {
  if (confirm("Are you sure to delete all tasks?")) {
    todos = [];
    renderTodos();
  }
}

function filterToday() {
  const today = new Date().toISOString().split('T')[0];
  const filtered = todos.filter(todo => todo.date === today);

  todoList.innerHTML = "";

  if (filtered.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" style="text-align: center;">No task found for today</td></tr>`;
    return;
  }

  filtered.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.completed ? "Done" : "Pending"}</td>
      <td class="actions">
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAllTodos);
filterBtn.addEventListener("click", filterToday);

// Load first time
renderTodos();