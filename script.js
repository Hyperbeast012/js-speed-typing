const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement=document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input',()=>{
const arrayQuote=quoteDisplayElement.querySelectorAll('span')
const arrayValue=quoteInputElement.value.split('')

let correct =true
arrayQuote.forEach((characterSpan,index)=>{
  const character=arrayValue[index]
  if(character ==null){
    characterSpan.classList.remove('correct')
    characterSpan.classList.remove('incorrect')
    correct=false
  }
 else if(character === characterSpan.innerText){
    characterSpan.classList.add('correct')
    characterSpan.classList.remove('incorrect')
  }else
  {
    characterSpan.classList.remove('correct')
    characterSpan.classList.add('incorrect')
    correct=false
  }
})
if(correct) renderNewQuote()
})
//fetching data from Api
async function getRandomQuote() {
  const response = await fetch(RANDOM_QUOTE_API_URL)
  const data = await response.json()
  return data.content
}
//storing fatch data into api
async function renderNewQuote() {
  const quote = await getRandomQuote()

  quoteDisplayElement.innerHTML = ''
quote.split('').forEach(character => {
  const characterSpan=document.createElement('span')
 
  characterSpan.innerText =   character
  quoteDisplayElement.appendChild(characterSpan)
});
quoteInputElement.value=null
startTimer()
}
let startTime
function startTimer(){
  timerElement.innerText=0
  startTime= new Date()
  setInterval(function(){
  timer.innerText=getTimerTime()
  },1000)
}

function getTimerTime(){
  return Math.floor((new Date -startTime)/1000)
}


renderNewQuote()