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
  // input tag within form has 'submit' as type, styled like a button. 'addTask' function called when user clicks on this
  form.addEventListener('submit', addTask)
  // Event to remove task from list
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}



// FUNCTION TO ADD TASK
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
  // Add .class
  link.className = 'delete-item secondary content';
  // Add <i> icon in html
  link.innerHTML = '<i class="fa  fa-remove"></i>';
  // Append the link to the <li>
  li.appendChild(link);
  // Append <li> to <ul>
  taskList.appendChild(li);
  // Clear input after it's been appended below
  taskInput.value = '';

  e.preventDefault();
}

// FUNCTION TO REMOVE  TASK
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// FUNCTION TO CLEAR TASKS
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild); // <ul> will remove all children <li>
  }
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
