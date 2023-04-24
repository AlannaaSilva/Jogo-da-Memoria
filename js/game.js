const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const characters = [
  'aniversario',
  'cafe',
  'casamento',
  'chandler-joey',
  'janice',
  'joey',
  'peru',
  'porta',
  'rachel',
  'phoebe'
];

//função para criar um elemento com uma tag e uma classe
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;

}

let primeiroCard = '';
let segundoCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length == 20){
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de ${timer.innerHTML} segundos`);
  }
}


const checkCards = () => {
const primeiroCharacter = primeiroCard.getAttribute('data-character');
const segundoCharacter = segundoCard.getAttribute('data-character');

if (primeiroCharacter == segundoCharacter){
  primeiroCard.firstChild.classList.add('disabled-card');
  segundoCard.firstChild.classList.add('disabled-card');

  primeiroCard = '';
  segundoCard = '';

  checkEndGame();

}else{
  setTimeout(() => {
    primeiroCard.classList.remove('reveal-card');
    segundoCard.classList.remove('reveal-card');

    primeiroCard = '';
    segundoCard = '';

  }, 500);
  
}

}

const revealCard = ({ target }) => {

  if(target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (primeiroCard == '') {

    target.parentNode.classList.add('reveal-card');
    primeiroCard = target.parentNode;
  } else if (segundoCard == '') {

    target.parentNode.classList.add('reveal-card');
    segundoCard = target.parentNode;
    checkCards();
  }
  

}

const creatCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../imagens/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);
  return card;

}

//função para gerar o jogo, usar essa função para criar várias cartas demodo aleatório

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const embaralhaArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  embaralhaArray.forEach((character) => {
    const card = creatCard(character);
    grid.appendChild(card);
  });
}

const starTimer = () =>{

  this.loop = setInterval(()=>{
    const atualTime = Number(timer.innerHTML);
    timer.innerHTML = atualTime + 1;
  }, 1000);

}
window.onload = () =>{

  spanPlayer.innerHTML = localStorage.getItem('player');
  starTimer();
  loadGame();
}
 