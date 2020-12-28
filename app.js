// DEFINE UI VARIABLES

const form = document.querySelector('#task-form'); // <form> the form tag
const taskInput = document.querySelector('#task'); // <input> 'New task' input field
const clearBtn = document.querySelector('.clear-tasks'); // <href> black button 'CLEAR TASKS' 
const filter = document.querySelector('#filter'); // <input> option at top of tasks list
const taskList = document.querySelector('.collection'); // <ul> tarts blank/'invisible', appended li appended as user inputs tasks

// Load all  event listeners in one call
loadEventListeners();


// ADD INDIVIDUAL EVENT LISTENERS
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // input tag within form has 'submit' as type, styled like a button. 'addTask' function called when user clicks on this
  form.addEventListener('submit', addTask)
  // Remove task from list
  taskList.addEventListener('click', removeTask);
  // Clear all tasks in list
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks in list
  filter.addEventListener('keyup', filterTasks);
}


// FUNCTION TO GET TASKS FROM LOCAL STORAGE
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    // Create <li> element
    const li = document.createElement('li');
    // Give the <li> a .class
    li.className = 'collection-item';
    // Create text node and append to <li>, pass in whatever user typed in 'New Task' field
    li.appendChild(document.createTextNode(tasks));
    // Create new <a> link element to hold  'x' to delete
    const link = document.createElement('a');
    // Add .class to <a>
    link.className = 'delete-item secondary-content';
    // Add <i> icon in html
    link.innerHTML = '<i class="fa  fa-remove"></i>';
    // Append the <a> to the <li>
    li.appendChild(link);
    // Append <li> to <ul>
    taskList.appendChild(li);
  });
}



// FUNCTION TO ADD TASKS
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task'); // message pops up if user clicks on 'ADD TASK' with blank field
  }
  // Create <li> element
  const li = document.createElement('li');
  // Give the <li> a .class
  li.className = 'collection-item';
  // Create text node and append to <li>, pass in whatever user typed in 'New Task' field
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new <a> link element to hold  'x' to delete
  const link = document.createElement('a');
  // Add .class to <a>
  link.className = 'delete-item secondary-content';
  // Add <i> icon in html
  link.innerHTML = '<i class="fa  fa-remove"></i>';
  // Append the <a> to the <li>
  li.appendChild(link);
  // Append <li> to <ul>
  taskList.appendChild(li);
  // FUNCTION TO add list item to local storage
  storeTaskInLocalStorage(taskInput.value);
  // Clear input after it's been appended below
  taskInput.value = '';
  e.preventDefault();
}

// FUNCTION TO ADD TASK TO LOCAL STORAGE
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// FUNCTION TO REMOVE  TASKS
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) { // .class from addTask()
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// FUNCTION TO REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);

    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// FUNCTION TO CLEAR TASKS
function clearTasks() {
  while (taskList.firstChild) { // loop until no firstChild left
    taskList.removeChild(taskList.firstChild); // <ul> will remove each <li>
  }
  // Clear tasks from Local Storage
  clearTasksFromLocalStorage()
    ;
}

// FUCNTION TO REMOVE TASKS FROM LOCAL STORAGE AFTER 'CLEAR ALL' BTN CLICKED
function clearTasksFromLocalStorage() {
  localStorage.clear();
}


// FUNCTION TO FILTER TASKS
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
    (function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}
