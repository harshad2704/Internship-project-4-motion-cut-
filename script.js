document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() === '') {
        alert('Please enter a valid task.');
        return;
    }

    const task = {
        text: taskInput.value,
        completed: false,
    };

    appendTaskToDOM(task, taskList);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
}

function appendTaskToDOM(task, taskList) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
        <button onclick="toggleTaskStatus(this)">Toggle Status</button>
    `;
    taskList.appendChild(li);
}

function editTask(button) {
    const li = button.parentNode;
    const span = li.querySelector('span');
    const newText = prompt('Edit task:', span.innerText);

    if (newText !== null) {
        span.innerText = newText;
        updateTaskInLocalStorage(li);
    }
}

function deleteTask(button) {
    const li = button.parentNode;
    li.remove();
    removeTaskFromLocalStorage(li);
}

function toggleTaskStatus(button) {
    const li = button.parentNode;
    const span = li.querySelector('span');
    span.classList.toggle('completed');

    updateTaskInLocalStorage(li);
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(li) {
    const tasks = getTasksFromLocalStorage();
    const index = Array.from(li.parentNode.children).indexOf(li);
    tasks[index].text = li.querySelector('span').innerText;
    tasks[index].completed = li.querySelector('span').classList.contains('completed');
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(li) {
    const tasks = getTasksFromLocalStorage();
    const index = Array.from(li.parentNode.children).indexOf(li);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById('task-list');

    tasks.forEach(task => {
        appendTaskToDOM(task, taskList);
    });
}
