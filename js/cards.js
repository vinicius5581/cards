function generateCardDeck() {
    
    suits = [
        {suit:'clubs', color: 'black', symbol: '♣'}, 
        {suit:'diamonds', color: 'red', symbol: '♦'}, 
        {suit:'hearts', color: 'red', symbol: '♥'}, 
        {suit:'spades', color: 'black', symbol: '♠'}, 
    ];

    ranks = [
      {values: [1,14], label: 'Ace'},
      {values: [2], label: 'Two'},
      {values: [3], label: 'Three'},
      {values: [4], label: 'Four'},
      {values: [5], label: 'Five'},
      {values: [6], label: 'Six'},
      {values: [7], label: 'Seven'},
      {values: [8], label: 'Eigth'},
      {values: [9], label: 'Nine'},
      {values: [10], label: 'Ten'},
      {values: [11], label: 'Jack'},
      {values: [12], label: 'Queen'},
      {values: [13], label: 'King'},
    ];
    
    const cardDeck = [];

    suits.forEach(suit => {
        ranks.forEach(rank => {
            cardDeck.push({
                ...suit,
                rank
            })
        })
    })
    
    return cardDeck; // array of cards
}

function shuffleCards(cardDeck) {
  const pickedCards = {};
  const shuffledCardDeck = [];

  for(let i = 0; i < cardDeck.length; i++) {
    let randomIndex = Math.floor(Math.random() * 51);
    while (pickedCards[randomIndex]) {
      randomIndex = Math.floor(Math.random() * 51);
      if (!pickedCards[randomIndex]) {
        pickedCards[randomIndex] = 1;
      }
    }
    shuffledCardDeck[i] = cardDeck[randomIndex];
  }
  return shuffledCardDeck;
}

function simplifyCards(cardDeck) {
  return cardDeck.map(card => ({
    suit: card.suit,
    rank: card.rank.label
  }))
}

const cardDeck1 = generateCardDeck();
const suffledDeck1 = shuffleCards(cardDeck1);
const suffledDeck1Simplified = simplifyCards(suffledDeck1);

// console.log(cardDeck1);
// console.log(suffledDeck1);
console.log(suffledDeck1Simplified);

function CardGame() {
    this.el = document.getElementById('cards');
    this.cards = shuffleCards(generateCardDeck());
}

CardGame.prototype.render = function() {
    let cardsHtml = '';
    this.cards.forEach(card => {
        console.log(card)
        cardsHtml += `
        <div class="card card--${card.suit} card--${card.color}">
            <p>${(card.rank.values[0] >= 2 || card.rank.values[0] <= 10) ? card.rank.values[0] : card.rank.label}</p>
            <p>${card.symbol}</p>
        </div>
    `
    })
    this.el.insertAdjacentHTML("beforeend", cardsHtml);
}



function init() {
    const game = new CardGame();
    game.render();
    console.log('initializing', game.cards)
}

window.onload = function() {
    init();
    // doSomethingElse();
};