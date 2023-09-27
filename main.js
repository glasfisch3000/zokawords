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

wordsPanel.onclick = () => {
  word1.innerHTML = newWord(3)
  word2.innerHTML = newWord(2)
  word3.innerHTML = newWord(1)
}
wordType.onchange = wordsPanel.onclick
syllableCount.onchange = wordsPanel.onclick

wordsPanel.onclick()

word1.onclick = (event) => {
  event.stopPropagation()
}
word2.onclick = word1.onclick
word3.onclick = word1.onclick

function newWord(simplicity) {
  let syllables = syllableCount.value

  if(wordType.value == "noun") {
    var string = ""
    var lastCoda = null

    for(var i = syllables; i>1; i--) {
      string += newConsonant(i==syllables ? simplicity : null, lastCoda ? [lastCoda] : null) // consonant is optional only at the beginning
      string += newVowel()

      lastCoda = newCoda(simplicity)
      string += lastCoda
    }

    string += newConsonant(null, lastCoda ? [lastCoda] : null)
    string += "a"

    return string
  } else if(wordType.value == "verb") {
    var string = ""
    var lastCoda = null

    for(var i = syllables; i>1; i--) {
      string += newConsonant(null, lastCoda ? [lastCoda] : null)
      string += newVowel()

      lastCoda = newCoda(simplicity)
      string += lastCoda
    }

    string += newConsonant(null, lastCoda ? [lastCoda] : null)
    string += "i"

    return string
  } else if(wordType.value == "adjective") {
    var string = ""
    var lastCoda = null

    for(var i = syllables; i>1; i--) {
      string += newConsonant(i==syllables ? simplicity : null, lastCoda ? [lastCoda] : null) // consonant is optional only at the beginning
      string += newVowel()

      lastCoda = newCoda(simplicity)
      string += lastCoda
    }

    string += newConsonant(null, lastCoda ? [lastCoda] : null)
    string += "u"

    return string
  } else {
    var string = ""

    string += newConsonant(simplicity)
    string += newVowel()

    for(var i = syllables; i>1; i--) {
      let coda = newCoda(simplicity)
      string += coda
      string += newConsonant(null, coda ? [coda] : null)
      string += newVowel()
    }

    string += newConsonant(0, ["y"])

    return string
  }
}

function newConsonant(simplicity, forbidden) {
  var array = ["v", "b", "m", "n", "z", "d", "zh", "dh", "l", "k", "r"]
  if(forbidden) for(let item of forbidden) array.splice(array.indexOf(item), 1)

  if(simplicity==1) for(var i = 0; i<1; i++) array.push("")
  if(simplicity==2) for(var i = 0; i<5; i++) array.push("")
  if(simplicity==3) for(var i = 0; i<11; i++) array.push("")

  return array.random()
}

function newVowel() {
  var array = ["a", "e", "i", "o", "u"]
  return array.random()
}

function newCoda(simplicity) {
  var array = ["m", "n", "l", "r"]
  for(var i = 0; i<8; i++) array.push(array[i])

  if(simplicity==1) for(var i = 0; i<1; i++) array.push("")
  if(simplicity==2) for(var i = 0; i<8; i++) array.push("")
  if(simplicity==3) return ""

  return array.random()
}
