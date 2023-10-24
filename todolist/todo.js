const fs = require('fs');

class Todo {
  constructor() {
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    try {
      const tasksData = fs.readFileSync('todo.json', 'utf8');
      return JSON.parse(tasksData);
    } catch (error) {
      // If file doesn't exist or is empty, return an empty array
      return [];
    }
  }

  saveTasks() {
    const tasksData = JSON.stringify(this.tasks, null, 2);
    fs.writeFileSync('todo.json', tasksData);
  }

  addTask(task) {
    if (!task) {
      throw new Error('Task cannot be empty.');
    }

    const taskId = Date.now().toString();
    const newTask = { id: taskId, task: task };
    this.tasks.push(newTask);

    this.saveTasks();
  }

  updateTask(taskId, updatedTask) {
    const task = this.findTaskById(taskId);
    if (!task) {
      throw new Error('Task not found.');
    }

    task.task = updatedTask;

    this.saveTasks();
  }

  deleteTask(taskId) {
    const taskIndex = this.findTaskIndexById(taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found.');
    }

    this.tasks.splice(taskIndex, 1);

    this.saveTasks();
  }

  findTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  findTaskIndexById(taskId) {
    return this.tasks.findIndex((task) => task.id === taskId);
  }

  listTasks() {
    return this.tasks;
  }
}