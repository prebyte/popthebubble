var counter = 3;
console.log(counter);
var isStartInProgress = false;
var previousCellElement;
var previousScore;
var gameProgressCounter = 1;
var score = 0;
var secCount = 20;
var scoreElement = $(".score");
var restartButton = $(".playAgain");
var playButton = $(".playBtn");

function ReadyGame() {
    $(".timer").removeClass("hidden");
    counter--;
    console.log("score here is : ", score);
    $(".timeOut").text("Your game starts in "+ counter + " seconds");
    console.log("counter=",counter);

    if (counter === 0) {
        clearInterval(readyGameHandler);

        $(".stgame").addClass("hidden");


        counter = 3;

        StartGame();
        console.log("counter=",counter);
    }


}


function raiseScore () {
    console.log("score here is 1: ", score);
    score++;
    scoreElement.removeClass("hidden");
    scoreElement.text("score:"+ score);
    console.log("score=",score);
}
function timeCount() {
    secCount--;
    console.log("secCount=",secCount);
    $(".timer").text(" Time : "+ secCount + " second");

    if (secCount === 0) {
        clearInterval(timeCountHandler);
        secCount = 20;

        console.log("secCount",secCount);

    }


}

function runGame() {
    if (previousCellElement) {
        previousCellElement.removeClass("showGreen");
        previousCellElement.unbind("click", raiseScore);
    }

    console.log(gameProgressCounter);

    if (gameProgressCounter > 10) {
        clearInterval(runGameHandler);
        clearInterval(timeCountHandler);
        $(".gameOver").removeClass("hidden");
        $(".gameOver .gameOverIndicator").text("Game Over!");
        $(".gameOver .scoreIndicator").text("Your score is "+ score);
        return;
    }


    var x = Math.ceil(Math.random() * 25);
    console.log("x",x);
    var cellElement = $("#cell" + x);
    cellElement.addClass("showGreen");
    scoreElement.removeClass("hidden");
    $(".timer").removeClass("hidden")
    gameProgressCounter++;

    cellElement.click(raiseScore);
    console.log("x=",x);



    previousCellElement = cellElement;


}


function StartGame() {
    $(".timer").addClass("hidden");
    timeCount();
    timeCountHandler = setInterval(timeCount, 1000);
    runGame();
    runGameHandler = setInterval(runGame, 2000);
    console.log("counter 3=",counter);
}

function ResetGame() {
    clearInterval(runGameHandler);
    clearInterval(timeCountHandler);
    gameProgressCounter = 1;
    //scoreElement.addClass("hidden");
    $(".stgame").addClass("hidden");
    $(".gameOver").addClass("hidden");
    previousCellElement.removeClass("showGreen");
    counter = 3;
    secCount = 20;
    score= 0;
    scoreElement.text("score: "+ score);

    GetGame();
}

function GetGame() {
    playButton.addClass("hidden");
    restartButton.removeClass("hidden");
    restartButton.click(ResetGame);

    $(".gameOver").addClass("hidden");
    $(".stgame").removeClass("hidden");
    $(".timeOut").text("Your game starts in "+ counter + " seconds");
    readyGameHandler = setInterval(ReadyGame, 1000);
    console.log("hhhh",counter);
}

playButton.click(GetGame);

