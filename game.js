var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  // store the id of the button clicked by the user
  var userChosenColor = $(this).attr("id");

  // push the id of the button to the userClickedPattern array
  userClickedPattern.push(userChosenColor);

  // Play the sound of the button the user chose
  flashColorAndSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // flashColorAndSound(randomChosenColor);

  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(flashColorAndSound, 500*(i+1), gamePattern[i]);
  }
}

function flashColorAndSound(color) {
  // Flash animation for the randomly selected color
  $("#" + color)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // Add audio
  playSound(color);
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
