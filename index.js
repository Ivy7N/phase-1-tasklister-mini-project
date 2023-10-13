document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("new-task-description");
  const taskList = document.getElementById("tasks");
  const addTaskButton = document.getElementById("create-task-form");
  const clearTasksButton = document.getElementById("clear-tasks");
 
  function addTask(event) {
    event.preventDefault(); // Prevent form submission behavior
 
    const taskText = taskInput.value.trim();
 
    if (taskText !== "") {
      const priority = prompt("Enter priority (High, Medium, Low):");
      if (priority === null || priority === "") {
        return; // Do not add the task if priority is not provided
      }
 
      const listItem = document.createElement("li");
      listItem.textContent = taskText;
 
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.className = "delete-task";
      deleteButton.dataset.description = taskText;
 
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
      taskInput.value = "";
    }
  }
 
  function deleteTask(event) {
    if (event.target.classList.contains("delete-task")) {
      const taskDescription = event.target.dataset.description;
      const taskItem = event.target.parentElement;
 
      if (confirm(`Are you sure you want to delete "${taskDescription}"?`)) {
        taskItem.remove();
      }
    }
  }
 
  function setPriorityColor(taskItem, priority) {
    switch (priority) {
      case "High":
        taskItem.style.color = "red";
        break;
      case "Medium":
        taskItem.style.color = "yellow";
        break;
      case "Low":
        taskItem.style.color = "green";
        break;
      default:
        taskItem.style.color = "black";
    }
  }
 
  const tasksArray = [];
 
  function addTaskToList(event) {
    event.preventDefault();
 
    const taskText = taskInput.value.trim();
 
    if (taskText !== "") {
      const priority = prompt("Enter priority (High, Medium, Low):");
      if (priority === null || priority === "") {
        return; // Do not add the task if priority is not provided
      }
 
      const task = {
        text: taskText,
        priority: priority,
      };
      tasksArray.push(task);
 
      const listItem = document.createElement("li");
      listItem.textContent = task.text;
      setPriorityColor(listItem, task.priority);
 
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.className = "delete-task";
      deleteButton.dataset.description = task.text;
 
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
      taskInput.value = "";
    }
  }
 
  function sortByPriority() {
    tasksArray.sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") {
        return -1;
      } else if (a.priority !== "High" && b.priority === "High") {
        return 1;
      } else if (a.priority === "Medium" && b.priority === "Low") {
        return -1;
      } else if (a.priority === "Low" && b.priority === "Medium") {
        return 1;
      } else {
        return 0;
      }
    });
  }
 
  function displaySortedTasks() {
    sortByPriority();
    taskList.innerHTML = "";
 
    tasksArray.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.textContent = task.text;
      setPriorityColor(listItem, task.priority);
 
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.className = "delete-task";
      deleteButton.dataset.description = task.text;
 
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
    });
  }
 
  addTaskButton.addEventListener("submit", addTaskToList);
  clearTasksButton.addEventListener("click", function () {
    taskList.innerHTML = "";
    tasksArray.length = 0;
  });
 
  // Create Sort Tasks button and add event listener
  const sortButton = document.createElement("button");
  sortButton.textContent = "Sort Tasks";
  sortButton.id = "sort-tasks";
 
  sortButton.addEventListener("click", displaySortedTasks);
 
  const form = document.getElementById("create-task-form");
  form.appendChild(sortButton);
 
  taskList.addEventListener("click", deleteTask);
});