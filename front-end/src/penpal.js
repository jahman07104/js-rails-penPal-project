// Define the UI Variables

fetchPenpals();
const inputs = document.querySelector(".input-friend")
const form = document.querySelector('#penpal-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#penpal');
const penpals = [];
loadEventListeners();

class Penpal {
  constructor({id, name, city, email, image_url, user}) {
    this.id = id
    this.name = name
    this.city = city
    this.email = email
    this.image_url = image_url
    this.user = user
    penpals.push(this)
  }
}

function fetchPenpals() {
  return fetch("http://localhost:3000/penpals")
  .then(response => response.json())
  .then(response => {
    response.forEach(function(penpal) {
      penpal = new Penpal(penpal)
      if (penpal.user) {
        renderChosenPenpal(penpal)
      } else {
        renderUnchosenPenpal(penpal)
      }
    })
  })
}

function renderUnchosenPenpal(penpal) {
  let div = document.getElementById("penpal-list")
  let input = document.createElement('input')
  input.setAttribute("src", penpal.image_url)
  input.setAttribute("width", 98)
  input.setAttribute("height", 98)
  input.setAttribute("type", "image")
  input.setAttribute("data-id", penpal.id)
  input.setAttribute("class", "input-penpal")
  input.addEventListener('click', addPenpal);
  div.appendChild(input)
}

// Load all event listeners
  function loadEventListeners() {
  // Add Penpal event
  // clear Friends event
  clearBtn.addEventListener('click', clearPenpals);
  // Filter friends event
  filter.addEventListener('keyup', filterFriends);

}

// Add Task
function addPenpal(e) {
  let element = e.target;
  let id = Number(element.getAttribute('data-id'))
  let penpal = penpals.find(p => p.id === id)
  fetch(`http://localhost:3000/penpals/${id}/choose`, {method: 'POST'})
  .then(() => {
    if(taskInput.value === '') {
      alert('Add a Penpal to your list');
    }
    element.remove()
    renderChosenPenpal(penpal)
    // Clear input
    taskInput.value = '';
  })
  e.preventDefault();
}

function renderChosenPenpal(penpal) {
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li..usng materilize requires a collection and the li requires a collection-item
  // Create Text Node and appended

  let span = (text, className) => {
    let el = document.createElement("span")
    el.textContent = text
    el.className = className
    return el
  } 

  let image = document.createElement("img")
  image.setAttribute("src", penpal.image_url)
  li.appendChild(span(penpal.name, "name"));
  li.appendChild(image);
  li.appendChild(span(penpal.city, "city"));
  li.appendChild(span(penpal.email, "email"));
    
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  const i = document.createElement('i')
  i.classList.add('fa', 'fa-remove')
  i.setAttribute('data-id', penpal.id)
  i.addEventListener('click', removePenpal)
  link.append(i);

  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  // console.log(li);
}



// remove Penpal

function removePenpal(e) {
  let element = e.target;
  let id = Number(element.getAttribute('data-id'))
  let penpal = penpals.find(p => p.id === id)
  fetch(`http://localhost:3000/penpals/${id}/remove`, {method: 'POST'})
  .then(() => {
    if(taskInput.value === '') {
      alert('this will remove your Penpal');
    }
    element.remove()
    renderUnchosenPenpal(penpal)
    // Clear input
    taskInput.value = '';
  })
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete-item')){
    console.log(e.target);
    if(confirm("are you sure ?")){
      e.target.parentElement.parentElement.remove();
    }   
   }
}

// clear Friends
 function clearPenpals() { 
  // taskList.innerHTML = '';

// // faster
  // fetch, if ok look down
 
  fetch(`http://localhost:3000/penpals/remove_all`, {method: 'DELETE'})
  .then(() => {
    alert('this will remove all Penpals');

    let div = document.getElementById("penpal-list")
    
    penpals.length = 0
    div.innerHTML = ""
    fetchPenpals()
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }
  })

 

// https://jsperf.com/innerhtml-vs-removechild
}

// filter Friends
function filterFriends(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(friend) {
const item = friend.firstChild.textContent;
if(item.toLowerCase().indexOf(text)!= -1){
    friend.style.display = 'block';
}else{
    friend.style.display = 'none';
}

  });
}
