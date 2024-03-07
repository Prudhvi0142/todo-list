// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on page load
displayTasks();

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', () => toggleTask(index));

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', (event) => deleteTask(event, index));
        li.appendChild(deleteButton);

        // Add edit button
        const editButton = document.createElement('button');
        editButton.textContent = '✏️';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editTask(index));
        li.appendChild(editButton);

        // Add complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Done';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', (event) => completeTask(event, index));
        li.appendChild(completeButton);

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        const newTask = { name: taskName, completed: false };
        tasks.push(newTask);
        saveTasks();
        taskInput.value = '';
        displayTasks();
    }
}

function deleteTask(event, index) {
    event.stopPropagation(); // Prevent toggling the task when clicking delete button
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function editTask(index) {
    const newTaskName = prompt('Enter new task name:');
    if (newTaskName !== null && newTaskName.trim() !== '') {
        tasks[index].name = newTaskName.trim();
        saveTasks();
        displayTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function completeTask(event, index) {
    event.stopPropagation(); // Prevent toggling the task when clicking complete button
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
