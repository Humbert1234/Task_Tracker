// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const taskDueDate = document.getElementById('taskDueDate');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));

    const renderTasks = () => {
        taskList.innerHTML = '';
        getTasks().forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>${task.dueDate}</p>
                </div>
                <div class="task-actions">
                    <button class="complete" data-index="${index}">✔️</button>
                    <button class="delete" data-index="${index}">🗑️</button>
                </div>
            `;
            if (task.completed) {
                taskItem.style.textDecoration = 'line-through';
            }
            taskList.appendChild(taskItem);
        });
    };

    const addTask = () => {
        const title = taskTitle.value.trim();
        const description = taskDescription.value.trim();
        const dueDate = taskDueDate.value.trim();
        if (title && description && dueDate) {
            const tasks = getTasks();
            tasks.push({ title, description, dueDate, completed: false });
            saveTasks(tasks);
            renderTasks();
            taskTitle.value = '';
            taskDescription.value = '';
            taskDueDate.value = '';
        }
    };

    const updateTask = (index, completed) => {
        const tasks = getTasks();
        tasks[index].completed = completed;
        saveTasks(tasks);
        renderTasks();
    };

    const deleteTask = (index) => {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            deleteTask(e.target.dataset.index);
        }
        if (e.target.classList.contains('complete')) {
            updateTask(e.target.dataset.index, true);
        }
    });

    renderTasks();
});
