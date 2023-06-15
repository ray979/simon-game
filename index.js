//Button Sequence Arrays
let buttonSequence = [];
let userButtonSequence = [];

//Buttons
const buttonColors = ["green", "red", "yellow", "blue"];

//Game Variables
let gameLevel = 0;
let gameStarted = false;

$(document).on("keypress", function(event){
    if(gameStarted === false){
        gameStarted = true;
        buttonSequence = [];
        userButtonSequence = [];
        gameLevel = 0;
        nextSequence();
    }
});

$(".btn").on("click", function() {
    if(gameStarted){
        var buttonColor = $(this).attr("id");
        animateButton(buttonColor);
        userButtonSequence.push(buttonColor);
        if(buttonColor === buttonSequence[userButtonSequence.length-1]){
            playSound(buttonColor);
            if(userButtonSequence.length == buttonSequence.length){
                userButtonSequence = [];
                setTimeout(nextSequence, 1000);
            }
        }
        else{
            gameStarted = false;
            gameLevel = 0;
            playSound("wrong");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
        }


    }
});

function nextSequence(){
    $("#level-title").text("Level " + ++gameLevel);
    let randomButton = Math.floor(Math.random() * 4);
    buttonSequence.push(buttonColors[randomButton]);
    flashButton(randomButton);
    playSound(buttonColors[randomButton]);
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