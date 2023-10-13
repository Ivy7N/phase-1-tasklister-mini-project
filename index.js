document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const newTaskInput = document.getElementById("new-task");
  const priorityDropdown = document.getElementById("priority-dropdown");
  const taskList = document.getElementById("task-list");
  const sortAscendingButton = document.getElementById("sort-ascending");
  const sortDescendingButton = document.getElementById("sort-descending");

  const tasksArray = [];

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = newTaskInput.value.trim();
    const priority = priorityDropdown.value;

    if (taskText !== "") {
      const task = {
        text: taskText,
        priority: priority,
      };
      tasksArray.push(task);

      const listItem = document.createElement("li");
      listItem.textContent = task.text;
      setPriorityColor(listItem, task.priority);

      taskList.appendChild(listItem);
      newTaskInput.value = "";
    }
  });

  sortAscendingButton.addEventListener("click", function () {
    tasksArray.sort((a, b) => comparePriority(a.priority, b.priority));
    displaySortedTasks();
  });

  sortDescendingButton.addEventListener("click", function () {
    tasksArray.sort((a, b) => comparePriority(b.priority, a.priority));
    displaySortedTasks();
  });

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

  function comparePriority(priorityA, priorityB) {
    const priorityOrder = ["High", "Medium", "Low"];
    return priorityOrder.indexOf(priorityA) - priorityOrder.indexOf(priorityB);
  }

  function displaySortedTasks() {
    taskList.innerHTML = "";
    tasksArray.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.textContent = task.text;
      setPriorityColor(listItem, task.priority);
      taskList.appendChild(listItem);
    });
  }
});