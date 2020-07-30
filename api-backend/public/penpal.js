
// Define the UI Variables
const inputs = document.querySelector(".input-penpal")
const form = document.querySelector('#penpal-form');
const penpalList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const penpals = [];

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

fetchPenpals();

function fetchPenpals() {
  return fetch("/penpals")
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
  let list = document.getElementById("penpal-list")
  let input = document.createElement('input')
  input.setAttribute("src", penpal.image_url)
  input.setAttribute("width", 98)
  input.setAttribute("height", 98)
  input.setAttribute("type", "image")
  input.setAttribute("data-id", penpal.id)
  input.setAttribute("class", "input-penpal")
  input.addEventListener('click', addPenpal);
  list.appendChild(input)
}

loadEventListeners();
function loadEventListeners() {
  clearBtn.addEventListener('click', clearPenpals);
  filter.addEventListener('keyup', filterPenpals);
}

function addPenpal(event) {
  event.preventDefault()
  let element = event.target;
  let id = Number(element.getAttribute('data-id'))
  let penpal = penpals.find(p => p.id === id)
  fetch(`/penpals/${id}/choose`, {method: 'POST'})
  .then(() => {
    element.remove()
    renderChosenPenpal(penpal)
  })
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

  const link = document.createElement('a');
  
  link.className = 'delete-item secondary-content';
  // secondary content is must when using materialze
  // Add icon html
  const cancel = document.createElement('i')
  cancel.classList.add('fa', 'fa-remove')
  cancel.setAttribute('data-id', penpal.id)
  cancel.addEventListener('click', removePenpal)
  link.append(cancel);

  const destroy = document.createElement('i')
  destroy.classList.add('fa', 'fa-trash')
  destroy.setAttribute('data-id', penpal.id)
  destroy.addEventListener('click', deletePenpal)
  link.append(destroy);

  li.appendChild(link);
  penpalList.appendChild(li);
}
function removePenpal(e) {
  let element = e.target;
  let id = Number(element.getAttribute('data-id'))
  let penpal = penpals.find(p => p.id === id)
  fetch(`/penpals/${id}/remove`, {method: 'POST'})
  .then(() => {
    alert('this will remove your Penpal');
    element.remove()
    renderUnchosenPenpal(penpal)
  })
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete-item')){
    console.log(e.target);
      if(confirm("Are you sure ?")){
        e.target.parentElement.parentElement.remove();
      }   
   }
}

function deletePenpal(e) {
  let element = e.target;
  let id = Number(element.getAttribute('data-id'))
  fetch(`/penpals/${id}`, {method: 'DELETE'})
  .then(() => {
    alert('this will delete your Penpal');
    e.target.parentElement.parentElement.remove();
  })
  e.preventDefault();

}

  function clearPenpals() {  
    fetch(`/penpals/remove_all`, {method: 'DELETE'})
    .then(() => {
      alert('this will remove all Penpals');
      document.getElementById("penpal-list").innerHTML = ""
      penpalList.innerHTML = ""
      penpals.length = 0
      fetchPenpals()
  })
}

 function filterPenpals(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(penpal) {
    const item = penpal.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      penpal.style.display = 'block';
    } else {
      penpal.style.display = 'none';
    }
  });
}
