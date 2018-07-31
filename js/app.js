/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//variables
var cardsArrNames = [];

//load all card's icons second class
// for (let i = 0; i < document.querySelectorAll('.card i').length; i++) {
//     cardsArrNames[i] = document.querySelectorAll('.card i')[i].classList[1];
// }
for (let i = 0; i < document.querySelectorAll('.card').length; i++) {
    cardsArrNames[i] = document.querySelectorAll('.card')[i];
}

//get random cards
shuffle(cardsArrNames);

//append cards to deck UL
for (let i = 0; i < cardsArrNames.length; i++) {
    document.querySelector('.deck').appendChild(cardsArrNames[i]);
}


document.querySelector('.deck').addEventListener('click', flipCard);
//




function flipCard(e) {



    //if card has match dont toggle open and show
    if (e.target.classList.contains('match') || opendNum == 2) {

    }
    else {
        e.target.classList.toggle('open');
        e.target.classList.toggle('show');

        var opendNum = 0;
        var compared2Card = [];

        for (var i = 0; i < cardsArrNames.length; i++) {
            if (cardsArrNames[i].classList.contains('open')) {
                opendNum++;
                if (opendNum === 1) {
                    compared2Card[0] = cardsArrNames[i];
                }
                if (opendNum === 2) {
                    compared2Card[1] = cardsArrNames[i];
                    break;
                }
            }
        }
        console.log(compared2Card);

        if (opendNum === 2) {
            if (compared2Card[0].children[0].classList[1] == compared2Card[1].children[0].classList[1]) {
                compared2Card[0].classList.add('match');
                compared2Card[1].classList.add('match');
            }
            else { //if not matched
                compared2Card[0].classList.remove('open');
                compared2Card[0].classList.remove('show');
                compared2Card[1].classList.remove('open');
                compared2Card[1].classList.remove('show');
            }
           
        }
        else {

        }






    }






}
