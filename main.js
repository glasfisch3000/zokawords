Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

let wordsPanel = document.getElementById("words")
let headerPanel = document.getElementById("header")
let wordType = document.getElementById("wordType")
let syllableCount = document.getElementById("syllables")
let word1 = document.getElementById("word-1")
let word2 = document.getElementById("word-2")
let word3 = document.getElementById("word-3")

document.body.onresize = () => {
  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  if(!height) return

  height -= headerPanel.offsetHeight
  height -= 45 // margin
  height -= 2 // border
  height -= 30 // padding
  height = Math.max(height, 264) // wordsPanel style min-height
  height /= 3

  word1.parentElement.style.height = height
  word2.parentElement.style.height = height
  word3.parentElement.style.height = height
}

document.body.onresize()

word1.innerHTML = newWord()
word2.innerHTML = newWord()
word3.innerHTML = newWord()

function newWord() {
  let syllables = syllableCount.value

  if(wordType.value == "noun") {
    var string = ""
    for(var i = syllables; i>0; i--) {
      string += newConsonant(i==syllables) // consonant is optional only at the beginning
      string += newVowel()
      string += newCoda(true)
    }

    string += newConsonant()
    string += "a"

    return string
  } else if(wordType.value == "verb") {
    var string = ""
    for(var i = syllables; i>0; i--) {
      string += newConsonant()
      string += newVowel()
      string += newCoda(true)
    }

    string += newConsonant()
    string += "i"

    return string
  } else if(wordType.value == "adjective") {
    var string = ""
    for(var i = syllables; i>0; i--) {
      string += newConsonant(i==syllables) // consonant is optional only at the beginning
      string += newVowel()
      string += newCoda(true)
    }

    string += newConsonant()
    string += "u"

    return string
  } else {
    var string = ""
    string += newConsonant(true)
    string += newVowel()

    for(var i = syllables; i>0; i--) {
      string += newCoda(true)
      string += newConsonant()
      string += newVowel()
    }

    string += newConsonant()

    return string
  }
}

function newConsonant(optional) {
  var array = ["v", "b", "m", "n", "z", "d", "zh", "dh", "l", "y", "k", "r"]
  if(optional) array.push("")
  return array.random()
}

function newVowel(optional) {
  var array = ["a", "e", "i", "o", "u"]
  if(optional) array.push("")
  return array.random()
}

function newCoda(optional) {
  var array = ["m", "n", "l", "r"]
  if(optional) for(var i = 0; i<5; i++) array.push("")
  return array.random()
}
