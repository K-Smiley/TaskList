// DEFINE UI VARIABLES

const form = document.querySelector('#task-form'); // <form> the form tag
const taskInput = document.querySelector('#task'); // <input> 'New task' input field
const clearBtn = document.querySelector('.clear-tasks'); // <href> black button 'CLEAR TASKS' 
const filter = document.querySelector('#filter'); // <input> option at top of tasks list
const taskList = document.querySelector('.collection'); // <ul> tarts blank/'invisible', appended li appended as user inputs tasks

// Load  event listener
loadEventListeners();


// FUNCTION FOR LOADING EVENT LISTENER
function loadEventListeners() {
  // input tag within form has 'submit' as type, styled like a button. 'addTask' function called when user clicks on this
  form.addEventListener('submit', addTask)
}



// FUNCTION TO ADD TASK
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task'); // message pops up if user clicks on 'ADD TASK' with blank field
  }

  // Create <li> element
  const li = document.createElement('li');

  // Give the li a .class
  li.className = 'collection-item';

  // Create text node and append to li, pass in whatever use typed in 'New Task' field
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element to hold  'x'
  const link = document.createElement('a');

  // Add class
  link.className = 'delete-item secondary content';

  // Add icon html
  link.innerHTML = '<i class="fa  fa-remove"></i>';

  // Append the link to the li
  li.appendChild(link);

  // Append li to u
  taskList.appendChild(li);

  // Clear input after it's been appended below
  taskInput.value = '';

  e.preventDefault();

}