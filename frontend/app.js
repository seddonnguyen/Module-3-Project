const postURL = "http://localhost:3000/posts"
const commentsUrl = 'http://localhost:3000/comments'

fetch(postURL)
  .then(parseJSON)
  .then(listPosts)


function parseJSON(response) {
  return response.json()
}

function listPosts(posts) {
  AddPostElement()
  posts.forEach(displayPost)
  return posts
}

function AddPostElement() {

  let button = document.createElement('button')
  button.textContent = "Add a Post"

  button.addEventListener('click', event => {
    resetMain()

    let form = document.createElement('form')
    addTitleInputField(form, "")
    addDescriptionInputField(form, "")
    addImageInputField(form, "")
    addSubmitButton(form)

    const main = document.querySelector('main')
    main.appendChild(form)

    form.addEventListener("submit", event => {
      event.preventDefault()
      const formData = new FormData(event.target)

      const post = {
        title: formData.get("title"),
        description: formData.get("description"),
        image: formData.get("image")
      }

      resetMain()
      postNew(postURL, post)
      .then(() =>
        fetch(postURL)
        .then(parseJSON)
        .then(listPosts))

    })
  })

  const main = document.querySelector('main')
  main.appendChild(button)
}

function addTitleInputField(form, value) {
  let label = document.createElement('label')
  label.textContent = "Title: "
  label.htmlFor = "title"
  form.appendChild(label)

  let inputElement = document.createElement("input")
  inputElement.setAttribute("type", "text")
  inputElement.name = "title"
  inputElement.value = value
  inputElement.placeholder = "Add a title"
  form.appendChild(inputElement)
}

function addDescriptionInputField(form, value) {
  let label = document.createElement('label')
  label.textContent = "Description: "
  label.htmlFor = "description"
  form.appendChild(label)

  let inputElement = document.createElement("input")
  inputElement.setAttribute("type", "text")
  inputElement.name = "description"
  inputElement.value = value
  inputElement.placeholder = "Add a description"
  form.appendChild(inputElement)
}

function addImageInputField(form, value) {
  let label = document.createElement('label')
  label.textContent = "Image URL: "
  label.htmlFor = "image"
  form.appendChild(label)

  let inputElement = document.createElement("input")
  inputElement.setAttribute("type", "text")
  inputElement.name = "image"
  inputElement.value = value
  inputElement.placeholder = "Add an image URL"
  form.appendChild(inputElement)
}

function addSubmitButton(form) {
  let submitButton = document.createElement("input")
  submitButton.setAttribute("type", "submit")
  form.appendChild(submitButton)
}

function resetMain() {
  document.querySelector('main').remove()
  const body = document.querySelector('body')
  const main = document.createElement('main')
  body.appendChild(main)
}

function displayPost(post) {
  let divCard = document.createElement('div')
  divCard.className = "card"

  let div = document.createElement('div')
  div.className = "card-body"
  div.dataset.id = post.id

  addTitle(div, post)
  addEditPost(div, post)
  addPosted(div, post)
  addImage(div, post)
  addDescription(div, post)
  let ul = addComments(div, post)
  let form = addSubmitComment(div)
  addSubmitEvent(form, ul, post)
  addDeletePost(div, post)

  divCard.appendChild(div)
  const main = document.querySelector('main')
  main.appendChild(divCard)
}

function addEditPost(div, post) {

  let button = document.createElement('button')
  button.textContent = "Edit Post"
  div.appendChild(button)

  button.addEventListener('click', event => {
    resetMain()

    let form = document.createElement('form')
    addTitleInputField(form, post.title)
    addDescriptionInputField(form, post.description)
    addImageInputField(form, post.image)
    addSubmitButton(form)

    const main = document.querySelector('main')
    main.appendChild(form)

    form.addEventListener("submit", event => {
      event.preventDefault()
      const formData = new FormData(event.target)

      console.log(post.id)

      const postObj = {
        title: formData.get("title"),
        description: formData.get("description"),
        image: formData.get("image")
      }

      resetMain()

      fetch(`${postURL}/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
      }).then(() => fetch(postURL)
                    .then(parseJSON)
                    .then(listPosts))
    })
  })
}

function addTitle(div, post) {
  let h4 = document.createElement('h4')
  h4.textContent = post.title
  div.appendChild(h4)
}

function addPosted(div, post) {
  let p = document.createElement('p')
  p.textContent = `Posted: ${post.posted}`
  div.appendChild(p)
}

function addImage(div, post) {
  let img = document.createElement('img')
  img.src = post.image
  div.appendChild(img)
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

    event.target.reset()

    let commentElement = createCommentElement(formData.get("content"))
    displayComment(ul, commentElement)
    postNew(commentsUrl, comment)
  })
}

function addDeletePost(div, post) {
  let button = document.createElement('button')
  button.textContent = "Remove Post"

  button.addEventListener("click", event => {
    if(event.target.tagName == 'BUTTON') {
      event.target.parentNode.parentNode.remove()

      fetch(`${postURL}/${post.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  })

  div.appendChild(button)
}

function createCommentElement(content) {
  const comment = document.createElement('li')
  comment.textContent = content
  return comment
}

function displayComment(ul, comment) {
  ul.appendChild(comment)
}

function postNew(url, obj) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
}
