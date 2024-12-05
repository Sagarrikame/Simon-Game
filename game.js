var buttonColors= ["red", "blue", "green", "yellow"];
var gamePattern= [];
var userClickedPattern= [];
var started= false;
var level=0;


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
           console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        $("#level-title").text("Game over, Press any key to Restart");
        console.log("wrong");   
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
$(".btn").click(function(){
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var lastIndex= userClickedPattern.length -1;
    checkAnswer(lastIndex);
})


$(document).keypress(function(){
    if(!started){
        console.log(started);
        $("#level-title").html("Level: "+level);
        nextSequence();
        started= true;
    }
})

function nextSequence(){
    userClickedPattern= [];
    level++;
    $("#level-title").html("Level: "+level);
    var randomNumber= Math.floor(Math.random() * 4);
    var randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
