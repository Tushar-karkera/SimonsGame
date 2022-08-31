var userClickedPattern=[];
var gamePattern=[];
var buttonColours = ["red","blue","green","yellow"];
var gameStart = false;
var level =0 ;
function nextSequence(){
    level++;
    $("h1").text("level "+level);
    randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audioPath = "sounds/"+name + ".mp3";
    var audio = new Audio(audioPath);
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(() => {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

$(".btn").click(function(){
    userChosenColour = this.classList[1];
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(event){

    if(!gameStart)
    {
        $("h1").text("level "+level);
        gameStart = true;
        nextSequence();
    }
    
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
    {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else
    {
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver()
{
    level = 0;
    gamePattern = [];
    gameStart = false;
    userClickedPattern = [];
}