buttonColors = ["red","blue","green", "yellow"]
gamePattern = []
userClickedPattern = []
var started = false
var level = 0

$("body").keydown(function (e) {
    if(started === false){
        $("#level-title").text("Level "+level)
        nextSequence()
        started = true
    }
})

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)

    var i = userClickedPattern.length - 1
    checkAnswer(i)
    
    var name = $(this).attr("id")
    playSound(name)
    
    var currentColor = $(this).attr("id")
    animatePress(currentColor)
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.round(Math.random()*3)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $("#"+randomChosenColor).fadeTo(100, 0.3, function() { 
        $(this).fadeTo(500, 1.0) 
    })
    playSound(randomChosenColor)
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play()
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed")
    setTimeout(()=>{
        $("#"+currentColor).removeClass("pressed")
    },100)
}

function checkAnswer(index){
    if(userClickedPattern != null){

    }
    if(userClickedPattern[index] === gamePattern[index]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence()
            },1000)
        }
    }else{
        $("body").addClass("game-over")
        setTimeout(()=>{
            $("body").removeClass("game-over")
        },200)
        $("h1").text("Game Over, Press any Key to Restart")
        setTimeout(()=>{
            startOver()
        },2000)
    }
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}