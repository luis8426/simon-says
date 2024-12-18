var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;

// Function to make sound based on color
function playSound(name) {
  switch (name) {
    case "red":
      var redSound = new Audio("./sounds/red.mp3");
      redSound.play();
      break;

    case "blue":
      var blueSound = new Audio("./sounds/blue.mp3");
      blueSound.play();
      break;

    case "green":
      var greenSound = new Audio("./sounds/green.mp3");
      greenSound.play();
      break;

    case "yellow":
      var yellowSound = new Audio("./sounds/yellow.mp3");
      yellowSound.play();
      break;

    default:
      console.log(name);
      break;
  }
}

// Event listener to start the game once clicked.
$("#level-title").on("click", function () {
  $("#level-title").hide(400);
  $("#counter").removeClass("hidden");

  setTimeout(() => {
    $("#counter").text("Level " + level);
  }, 3000);
  setTimeout(() => {
    var firstColor = buttonColours[Math.floor(Math.random() * 4)];
    $("#" + firstColor).fadeToggle(100);
    $("#" + firstColor).fadeToggle(100);
    playSound(firstColor);
    gamePattern.push(firstColor);
  }, 5000);
});

// Function to add animation on color press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Event listener to get user's clicks
$(".btn").on("click", function (event) {
  var userChosenColour = event.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log("Game = " + gamePattern);
  console.log("User = " + userClickedPattern);
  nextSequence();
});

// Function to repeat game's pattern and add new random color
function nextSequence() {
  if (userClickedPattern.length == gamePattern.length) {
    for (let index = 0; index < userClickedPattern.length; index++) {
      const element = userClickedPattern[index];
      if (element == gamePattern[index]) {
        console.log("Good");

        if (index == userClickedPattern.length - 1) {
          for (let index2 = 0; index2 < gamePattern.length; index2++) {
            const element2 = gamePattern[index2];
            setTimeout(() => {
              $("#" + element2).fadeToggle(100);
              $("#" + element2).fadeToggle(100);
              playSound(element2);
            }, (index2 + 1) * 500);
          }

          var randomNumber = Math.floor(Math.random() * 4);
          var randomChosenColour = buttonColours[randomNumber];
          setTimeout(() => {
            $("#" + randomChosenColour).fadeToggle(100);
            $("#" + randomChosenColour).fadeToggle(100);
            playSound(randomChosenColour);
            gamePattern.push(randomChosenColour);
          }, (gamePattern.length + 1) * 500);
          userClickedPattern = [];
          level++;
          $("#counter").text("Level " + level);
        }
      } else {
        console.log("Bad");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        $("#counter").text("Game over, you lose! Your score is " + (level - 1));
      }
    }
  }
}

// // Game logic to check answer and proceed
// function checkAnswer() {
//   for (let index = 0; index < userClickedPattern.length; index++) {
//     const element = userClickedPattern[index];
//     if (element == gamePattern[index]) {
//       console.log("Good");
//     } else {
//       console.log("Bad");
//     }
//   }
// }
