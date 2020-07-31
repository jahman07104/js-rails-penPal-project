
// Define the UI Variables
const inputs = document.querySelector(".input-penpal")
const form = document.querySelector('#penpal-form');
const penpalList = document.querySelector('.collection');
const unchosenList = document.getElementById("penpal-list");

const filter = document.querySelector('#filter');
const penpals = [];
const users =[];


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

  static render() {
    fetch("/penpals")
    .then(response => response.json())
    .then(response => {
      response.forEach(function(penpal) {
         penpal = new Penpal(penpal)
        penpal.render()
      })
    })
  }

  render() {
    if (this.user) {
      renderChosenPenpal(this)
    } else {
      renderUnchosenPenpal(this)
    }
  }

  choose() {
    fetch(`/penpals/${this.id}/choose`, {method: 'POST'})
    .then(() => {
      this.user = {}
      this.render()
    })
  }

  remove() {
    fetch(`penpals/${this.id}/remove`, {method: 'POST'}).then(() => {
      this.user = null
      this.render()
    })
  }

  destroy() {
    fetch(`/penpals/${this.id}`, {method: 'DELETE'})
  }
}
  


Penpal.render() // calling line 24

function renderUnchosenPenpal(penpal) {
  let chosen = penpalList.querySelector(`[data-id="${penpal.id}"]`)
  if (chosen) { chosen.remove() }

  let input = document.createElement('input')
  input.setAttribute("src", penpal.image_url)
  input.setAttribute("width", 98)
  input.setAttribute("height", 98)
  input.setAttribute("type", "image")
  input.setAttribute("data-id", penpal.id)
  input.setAttribute("class", "input-penpal")
  input.addEventListener('click', (e) => {
    penpal.choose()
    e.preventDefault()
  });
  unchosenList.appendChild(input)
}

loadEventListeners();
function loadEventListeners() {
  filter.addEventListener('keyup', filterPenpals);
}

function renderChosenPenpal(penpal) {
  // remove penpal from unchosen list if they exist there
  let unchosen = unchosenList.querySelector(`[data-id="${penpal.id}"]`)
  if (unchosen) { unchosen.remove() }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  li.setAttribute('data-id', penpal.id);
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
  cancel.addEventListener('click', (e) => {
    penpal.remove()
    e.preventDefault()
  })
  link.append(cancel);

  const destroy = document.createElement('i')
  destroy.classList.add('fa', 'fa-trash')
  destroy.addEventListener('click', (e) => {
    penpal.destroy()
    e.target.parentElement.parentElement.remove()
    e.preventDefault()
  })
  link.append(destroy);

  li.appendChild(link);
  penpalList.appendChild(li);
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
