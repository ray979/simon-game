//Button Sequence Arrays
let buttonSequence = [];
let userButtonSequence = [];

//Buttons
const buttonColors = ["green", "red", "yellow", "blue"];

//Game Variables
let gameLevel = 0;
let gameStarted = false;

//init game
$(document).on("keypress", function(){
    if(gameStarted === false){
        gameStarted = true;
        buttonSequence = [];
        userButtonSequence = [];
        gameLevel = 0;
        nextSequence();
    }
});

//check user button press
$(".btn").on("click", function(event) {
    if(gameStarted){
        var buttonColor = $(this).attr("id");
        animateButton(buttonColor);
        userButtonSequence.push(buttonColor);
        if(userButtonSequence[userButtonSequence.length-1] === buttonSequence[userButtonSequence.length-1]){
            playSound(buttonColor);
            if(userButtonSequence.length == buttonSequence.length){
                setTimeout(() => {
                    nextSequence(); 
                }, 1000);
            }
        }
        else{
            $("#level-title").text("Game Over, Press Any Key to Restart");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);

            gameStarted = false;
        }
    }
});

//next level
function nextSequence(){
    if(gameStarted){
        userButtonSequence = [];
        $("#level-title").text("Level " + ++gameLevel);
        let randomButton = Math.floor(Math.random() * 4);
        buttonSequence.push(buttonColors[randomButton]);
        flashButton(randomButton);
        playSound(buttonColors[randomButton]);
    }
}

function playSound(fileName){
    let audio = new Audio("sounds/" + fileName +".mp3");
    audio.play();
}

function flashButton(button){
    $("#" + buttonColors[button]).fadeToggle(100).fadeToggle(100);
}

function animateButton(buttonColor){
    $("#"+buttonColor).addClass("pressed");
    setTimeout(function(){
        $("#"+buttonColor).removeClass("pressed");
    },100);
}