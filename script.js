const word_element = document.getElementById("word");
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el =document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const play_again = document.getElementById('play-again');



const correctLetters=[];
const wrongLettsers=[];

let selectedWord = getRandomWord();


function getRandomWord() {
  const words = ["javascrıpt","java","mvc"];

  return words[Math.floor(Math.random() * words.length)];
}


function displayWord() {

  word_element.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) => `
    <div class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </div>
    `
      )
      .join('')}`;

      const w = word_element.innerText.replace(/\n/g,'')
      if(w===selectedWord){
        popup.style.display='flex';
        message_el.innerText = "Tebrikler kazandınız";
      }
}

function displayMessage(){
    message.classList.add('show');

    setTimeout(function(){
        message.classList.remove('show');
    }, 1500);
}


play_again.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLettsers.splice(0);

    selectedWord=getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display='none';
});

window.addEventListener('keydown',function(e){
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            } else{
                displayMessage();
               
            }
        }else{
            if(!wrongLettsers.includes(letter)){
                wrongLettsers.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }
    }
});

function updateWrongLetters(){
    wrongLetters_el.innerHTML=` 
    ${wrongLettsers.length>0?'<h3>Hatalı harfler</h3>':''}
    ${wrongLettsers.map(letter=>`<span>${letter}<span>`)}
    `;

    items.forEach((item,index)=>{
        const errorCount=wrongLettsers.length;

        if(index<errorCount){
            item.style.display='block';
        }else{
            item.style.display='none';
        }
    })

    if(wrongLettsers.length===items.length){
        popup.style.display='flex';
        message_el.innerText='Maalesef oyunu kaybettiniz'
    }
}
displayWord();