const postURL = "http://localhost:3000/posts"
const commentsUrl = 'http://localhost:3000/comments'

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
  let ul = addComments(div, post)
  let form = addSubmitComment(div)
  addSubmitEvent(form, ul, post)

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
    let li = createCommentElement(comment.content)
    displayComment(ul, li)
  })
  div.appendChild(ul)
  return ul
}

function addSubmitComment(div) {
  let form = document.createElement('form')

  let textInput = document.createElement("input")
  textInput.setAttribute("type", "text")
  textInput.name = "content"
  textInput.placeholder = "Add a Comment"
  form.appendChild(textInput)

  let submitButton = document.createElement("input")
  submitButton.setAttribute("type", "submit")
  form.appendChild(submitButton)

  div.appendChild(form)
  return form
}

function addSubmitEvent(form, ul, post) {
  form.addEventListener("submit", event => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const comment = {
      post_id: post.id,
      content: formData.get("content")
    }
    console.log("Post ID", post.id)
    event.target.reset()

    let commentElement = createCommentElement(formData.get("content"))
    displayComment(ul, commentElement)
    postNewComment(comment)
  })
}

function createCommentElement(content) {
  const comment = document.createElement('li')
  comment.textContent = content
  return comment
}

function displayComment(ul, comment) {
  ul.appendChild(comment)
}

function postNewComment(comment) {
  return fetch(commentsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  })
}
