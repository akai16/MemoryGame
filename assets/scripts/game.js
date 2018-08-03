//Timer
var timerHTML = document.getElementById("timer");
var timer = 0;

setInterval(startTimer, 1000);

function startTimer() {
    timer += 1;
    timerHTML.innerHTML = String(timer) + "s";
}

//Popula cartas com imagens
populateCards();

function populateCards() {
    var cardArray = document.getElementsByClassName("card");

    var imagePath = "assets/images/";
    var imageSource = ["io.jpg","hao.jpg","anna.jpg","chocolove.jpg"];
    var filledCardsIndexes = []

    for (var i = 0; i < cardArray.length; i++) {
        filledCardsIndexes.push(false);
    }

    for (var i = 0; i < (cardArray.length)/2; i++) {
        for (var j=0; j<2; j++) {
            var randomNumber = generateRandomBetween(0,cardArray.length-1);

            while(filledCardsIndexes[randomNumber]) {
                randomNumber = generateRandomBetween(0,cardArray.length-1);
            }

            filledCardsIndexes[randomNumber] = true;

            var imageCard = document.createElement("img");
            imageCard.setAttribute("src", imagePath + imageSource[i]);

            cardArray[randomNumber].appendChild(imageCard);
        }
    }
}

//Funções Genericas
function generateRandomBetween(from,to) {
    return Math.floor((Math.random() * (to - from + 1)) + from);
}


//Logica do Jogo
var score = 0;
var maxPoints = 4;
var tentativas = 0;
var firstCardClicked = false
var secondCardClicked = false
var lastCardClicked;

var cardBackArray = document.getElementsByClassName("cardBack");

for (var i = 0; i < cardBackArray.length; i++) {
    cardBackArray[i].addEventListener("click", function(event) {
        if (!(firstCardClicked && secondCardClicked)) {
            var currentCard = event.target;
        }
        if (!firstCardClicked) {
            firstCardClicked = true;
            lastCardClicked = currentCard;
            currentCard.style.zIndex = -1;
        }
        else if (!secondCardClicked) {
            secondCardClicked = true
            currentCard.style.zIndex = -1;

            if (checkCardsEqual(currentCard,lastCardClicked)) {
                firstCardClicked = false;
                secondCardClicked = false;
                score += 1;
                if (score == maxPoints){
                    gameWon();
                }
            }
            else {
                flipWrongCards(currentCard);
            }
        }
    })
}


function checkCardsEqual(currentCard,lastCardClicked) {
    return currentCard.nextElementSibling.getAttribute("src") == lastCardClicked.nextElementSibling.getAttribute("src")
}

function flipWrongCards(currentCard) {
    setTimeout (function(){
        tentativas += 1;
        currentCard.style.zIndex = 1;
        lastCardClicked.style.zIndex = 1;
        firstCardClicked = false;
        secondCardClicked = false;
    }, 800);
}

function gameWon() {
    var modal = document.getElementById("modalGameWon");
    var gameContainer = document.getElementsByClassName("game-container")[0];
    var timeToWin = document.getElementById("timeToWin"); 
    var numTentativas = document.getElementById("numTentativas");

    gameContainer.style.opacity = 0.5;
    modal.style.display = "flex";
    timeToWin.innerHTML = String(timer);
    numTentativas.innerHTML = String(tentativas);

    console.log("Game Won Boys");
}