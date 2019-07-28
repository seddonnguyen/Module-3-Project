let postURL = "http://localhost:3000/posts/"

fetch(postURL)
  .then(parseJSON)
  .then(listPosts)


function parseJSON(response) {
  return response.json()
}

function listPosts(posts) {
  posts.forEach(displayPost)
}

function displayPost(post) {
  let divCard = document.createElement('div')
  divCard.className = "card"

  let div = document.createElement('div')
  div.className = "card-body"
  div.dataset.id = post.id

  addTitle(div, post)
  addPosted(div, post)
  addImage(div, post)
  addDescription(div, post)
  addComments(div, post)


  divCard.appendChild(div)
  const main = document.querySelector('main')
  main.appendChild(divCard)
}

function addTitle(div, post) {
  let h4 = document.createElement('h4')
  h4.textContent = post.title
  div.appendChild(h4)
}

function addImage(div, post) {
  let img = document.createElement('img')
  img.src = post.image
  div.appendChild(img)
}

function addPosted(div, post) {
  let p = document.createElement('p')
  p.textContent = `Posted: ${post.posted}`
  div.appendChild(p)
}

function addDescription(div, post) {
  let p = document.createElement('p')
  p.textContent = post.description
  div.appendChild(p)
}

function addComments(div, post) {
  let p = document.createElement('p')
  p.textContent = "Comment(s):"
  div.appendChild(p)

  let ul = document.createElement('ul')
  post.comments.forEach(comment => {
    let li = document.createElement('li')
    li.textContent = comment.comment
    ul.appendChild(li)
  })
  div.appendChild(ul)
}