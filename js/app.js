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
var moves = Number(document.querySelector('.moves').textContent);
var matchedCardsNum = 0;
var handleTimer;
var modal = document.getElementById('winningModal');
var span = document.getElementsByClassName("close")[0];


for (let i = 0; i < document.querySelectorAll('.card').length; i++) {
    cardsArrNames[i] = document.querySelectorAll('.card')[i];
}

getRandomListsAndAppend();

function getRandomListsAndAppend() {
    //get random cards
    shuffle(cardsArrNames);

    //append cards to deck UL
    for (let i = 0; i < cardsArrNames.length; i++) {
        document.querySelector('.deck').appendChild(cardsArrNames[i]);
    }
}



document.querySelector('.deck').addEventListener('click', flipCard);

document.querySelector('.restart').addEventListener('click', reset);

//moves
function reset() {
    for (let i = 0; i < cardsArrNames.length; i++) {
        cardsArrNames[i].classList.remove('match');
        cardsArrNames[i].classList.remove('open');
        cardsArrNames[i].classList.remove('show');
    }
    getRandomListsAndAppend();
    // moves = 0
    moves = 0;
    document.querySelector('.moves').textContent = 0;

    //reset stars
    for (var n = 0; n < document.querySelectorAll('.stars li > i').length; n++) {
        document.querySelectorAll('.stars li > i')[n].className = 'fa fa-star';
    }

    //reset timer
    clearInterval(handleTimer);
    handleTimer = 0;
    totalSeconds = 0;
    startTimer();
}

function flipCard(e) {
    //if card has match dont toggle open and show
    if (e.target.classList.contains('match')) { }
    else {
        e.target.classList.toggle('open');
        e.target.classList.toggle('show');

        var opendNum = 0;        //number of opened cards
        var compared2Card = [];  // array with 2 opened cards to compare if matchin'

        for (var i = 0; i < cardsArrNames.length; i++) {
            if (cardsArrNames[i].classList.contains('open')) {
                opendNum++;
                if (opendNum === 1) {
                    compared2Card[0] = cardsArrNames[i];
                }
                if (opendNum === 2) {
                    compared2Card[1] = cardsArrNames[i];

                    //increase moves by one
                    moves++;
                    document.querySelector('.moves').textContent = moves;

                    //compare if cards r matchin'
                    if (compared2Card[0].children[0].classList[1] == compared2Card[1].children[0].classList[1]) {
                        for (var k = 0; k < compared2Card.length; k++) {
                            compared2Card[k].classList.add('match');
                            compared2Card[k].classList.remove('open');
                            compared2Card[k].classList.remove('show');
                        }
                        matchedCardsNum++;
                        if (matchedCardsNum === 2) {
                            document.querySelector('.stars li:nth-child(3) > i').className = 'fa fa-star-o';
                        }
                        if (matchedCardsNum === 6) {
                            document.querySelector('.stars li:nth-child(2) > i').className = 'fa fa-star-o';
                        }
                        if (matchedCardsNum === 8) {
                            //open the winning page
                            // setTimeout(function () { window.open('./winning.html?moves=' + moves, '_self'); }, 300);
                            modal.style.display = "block";

                            clearInterval(handleTimer);
                            handleTimer = 0;
                            totalSeconds = 0;

                            document.querySelector('.winMoves').textContent = moves;
                            document.querySelector('.time').innerText = document.querySelector('.timer').innerText;
                        }
                    }
                    else { //if not matchin'
                        setTimeout(function () {
                            for (var j = 0; j < compared2Card.length; j++) {
                                compared2Card[j].classList.remove('open');
                                compared2Card[j].classList.remove('show');
                            }
                        }, 30);
                    }
                    break;
                }
            }
        }
    }
}




//Timer start count up
startTimer();

function startTimer() {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    handleTimer = setInterval(setTime, 1000);
    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
}



//modal
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    reset();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        reset();
    }
}


