jokes = window.localStorage.getItem('jokes')

if (jokes === null) {
  // A couple jokes to start with
  var jokes = {
    'the horse': {
      setup: 'A horse walks into the bar. The bartender asks...',
      punchline: 'Why the long face?'
    },
    'Orion\'s pants': {
      setup: 'How does Orion keep his pants up?',
      punchline: 'With an asteroid belt.'
    }
  }
} else {
  jokes = JSON.parse(jokes)
}
console.log(jokes)

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------
var forgetJokeButton = document.getElementById('forget-joke')
var rememberJokeButton = document.getElementById('remember-joke')

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  if (requestedJokeKey in jokes){
    jokeBox.textContent = jokes[requestedJokeKey].setup + ' ' + jokes[requestedJokeKey].punchline
  } else {
    jokeBox.textContent = "No matching joke found."
  }
}

function updateLocal() {
  stringJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringJokes)
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
  updateLocal()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

rememberJokeButton.addEventListener('click', addJoke)

function addJoke() {
  var about = document.getElementById('about').value
  var setup = document.getElementById('setup').value
  var punchline = document.getElementById('punchline').value
  if(!about || !setup || !punchline){
    window.alert("Not all the information is filled in!")
  } else{
    jokes[about] = {}
    jokes[about].setup = setup
    jokes[about].punchline = punchline
    updatePage()
  }
}

forgetJokeButton.addEventListener('click', removeJoke)

function removeJoke() {
  var about = document.getElementById('remove-joke').value
  delete jokes[about]
  updatePage()
}

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
