const difficulty=[{num:1,text:"easy"},{num:2,text:"medium"},{num:3,text:"hard"}]

let cards
let cardsArr=[]
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


for(let i=1;i<4;i++){
    let diffButton=document.getElementById(i)
    diffButton.disabled=true
}


function showDiff(){
    console.log("show diff")
    const buttons=document.getElementById("lowerButtons")
    console.log(buttons)
    buttons.style.top="-160px"
    buttons.style.opacity="100%"
    for(let i=1;i<4;i++){
        let diffButton=document.getElementById(i)
        diffButton.disabled=false
        diffButton.classList.remove("hidden")
    }

}

function hideDiff(){
    console.log("hide diff")
    const buttons=document.getElementById("lowerButtons")
    buttons.style.opacity="0%"
    buttons.style.top="-150px"
    for(let i=1;i<4;i++){
        let diffButton=document.getElementById(i)
        diffButton.disabled=true
        diffButton.classList.add("hidden")
    }
    
}

function createCards(ev){
    const diff=ev.srcElement.id
    switch (diff){
        case "1":
            for(let i=0;i<8;i++){
                cardsArr.push({
                    value: Math.floor((i/2)+1)
                })
            }
            showCards(cardsArr)
            break;
        case "2":
            for(let i=0;i<16;i++){
                cardsArr.push({
                    value: Math.floor((i/2)+1)
                })
            }
            showCards(cardsArr)
            break;
        case "3":
            for(let i=0;i<24;i++){
                cardsArr.push({
                    value: Math.floor((i/2)+1)
                })
            }
            showCards(cardsArr)
            break;
        default:
            console.log("oopsie poopsie")
    }
}


function showCards(cardsButtons){
    const shade=document.getElementById("game_shade")
    shade.style.opacity="0%"

    let screen=document.getElementById("game_screen")
    screen.classList+=" showCards"

    for(const child of screen.children){
        child.style.visibility="hidden"
    }

    cardsButtons.map((card,i)=>{
        console.log(card)
        console.log(card.value)
        screen.innerHTML+=`<button class='memory-card' value='${card.value}'>היי ${i}</button>`
    })
    cards = document.querySelectorAll('.memory-card');
    console.log(cards)
    shuffle()
    cards.forEach(card => card.addEventListener('click', flipCard));

}

function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 25);
      card.style.order = randomPos;
    })
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add('flip');
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
  
      return;
    }
  
    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    console.log(firstCard)
    console.log(firstCard.value)
    console.log(secondCard)
    console.log(secondCard.value)

    let isMatch = firstCard.value === secondCard.value;
  
    isMatch ? disableCards() : unflipCards();
  }
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
  }
  
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      resetBoard();
    }, 1500);
  }


