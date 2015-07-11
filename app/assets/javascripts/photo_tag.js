String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if (hours > 0) {
      var time    = hours+':'+minutes+':'+seconds;
    } else {
      var time    = minutes+':'+seconds;
    }
    return time;
}

var photo_tag_game = (function () {

  var $photo;
  var guessBoxWidth;
  var guessBoxHeight;
  var $guessBox;
  var $guesses;
  var characters;
  var guessBoxPadding = 4;
  var guessesPadding  = 6;
  var time            = 0;
  var currentX;
  var currentY;
  var sessionKey;

  var timerCallback;
  var removeBoxTimer;

  var feedbacktoS = {
    "true": "Correct!",
    "false": "Incorrect",
  }

  var waitingDiv  = '<div id="waiting">Checking...</div>';
  var errorDiv    = '<div id="guessError">Server error<br/>Guess not checked</div>';

  var init = function() {

    $photo = $("#photo_tag_game_img");

    if($photo.length) {
      $guessBox       = $("#guess-box");
      $guesses        = $("#guesses");
      $timer          = $("#timer");
      $guessFeedback  = $("#guess-feedback");
      $legend         = $('#characters-legend');
      characters      = $photo.data("characters");
      guessBoxWidth   = $guessBox.width();
      guessBoxHeight  = $guessBox.height();
      sessionKey      = $photo.data("key");

      populateGuessCharacters();

      $('body').click(onClickBody);
      $photo.click(onClickPhoto);
      $guesses.click(onClickGuesses);
      $("#guesses a").click(makeGuess);
      $('#high-score-form').on('ajax:success', highScorePosted
                          ).on('ajax:error',   highScoreRefused);


      timerCallback = setTimeout(updateTimer, 1000);

    }
  };

  var populateGuessCharacters = function() {
    var html_string = "";
    for(var idx in characters){
      html_string += '<div><a id="guess-' + characters[idx] + 
               '" href="#">' + characters[idx].replace(/_/g, " ") +  '</a></div>';
    }
    $guesses.append(html_string);
    $legend.append(html_string.replace(/guess-/g, "legend-")
      .replace(/<a/g, '<strong').replace(/\/a>/g, '/strong>'));
  };

  var updateTimer = function() {
    ++time;
    $timer.text("Time: " + time.toString().toHHMMSS());
    timerCallback = setTimeout(updateTimer, 1000);
  };

  var onClickGuesses = function(event) {
    event.stopPropagation();
  };

  var onClickBody = function(event) {
    removeGuessBox();
  };

  var removeGuessBox = function() {
    $guessBox.css('visibility', 'hidden');
    $guesses.css('visibility', 'hidden');
  };

  var onClickPhoto = function(event) {
    clearTimeout(removeBoxTimer); //stop from removing guess box after inteval
    event.stopPropagation()
    event.preventDefault();
    currentX = event.offsetX;
    currentY = event.offsetY;
    console.log(currentX + ", " +  currentY);
    showGuessBox(event);
    showGuesses(event);
  };

  var showGuesses = function(event_args) {
    var offsetX = event_args.offsetX + $guessBox.width()/2 + guessBoxPadding;
    var offsetY = event_args.offsetY;
    
    if(event_args.offsetX + $guesses.width() + $guessBox.width() > $photo.width()) {
      offsetX = event_args.offsetX - $guessBox.width()/2 - $guesses.width() 
                           - guessBoxPadding - guessesPadding;
    }
    $guesses.css({
      left: offsetX,
      top: offsetY,
      'visibility': 'visible',
    });
  };

  var showGuessBox = function(event_args) {
    $guessBox.css({
      left: event_args.offsetX - guessBoxWidth/2,
      top: event_args.offsetY - guessBoxHeight/2,
    });
    $guessBox.css('visibility', 'visible');
    $guesses.css('visibility', 'visible');
  };

  var makeGuess = function(event) {
    var character = idToCharacter(this.id)
    $.ajax({
      url: "guess",
      data: {
        character: character,
        x: currentX,
        y: currentY,
        photo: $photo.data("photo-name"),
        key: sessionKey,
      },
      dataType: 'json',
      success: guessFeedback,
      error: makeGuessError,
      beforeSend: ajaxWaiting,
      complete: ajaxFinishedWaiting,
    })

  };

  var ajaxWaiting = function() {
    $guesses.append(waitingDiv);
  };

  var ajaxFinishedWaiting = function() {
    $("#waiting").remove()
  };

  var makeGuessError = function() {
    console.log("error")
    $guesses.append(errorDiv);
    setTimeout(clearGuessError, 3000)
  };

  var clearGuessError = function() {
    $("#guessError").remove()
  };

  var guessFeedback = function(response) {
    var color = "#CC0000";
    
    if(response.feedback === false) {
      $guessFeedback.css('color', color);
    } else {
      color = "#00CC00";
      $guessFeedback.css('color', color);
      removeCorrectAnswer(response.character);
      removeBoxTimer = setTimeout(removeGuessBox, 1500);
    }

    $guessFeedback.html('<h1>' + feedbacktoS[response.feedback] + '</h1>' + 
                                                    response.character);
    $guessFeedback.effect("highlight", {}, 1500);
    $guesses.effect("highlight", { color: color }, 1500);

    if(response.wonGame){
      gameWon();
    }
  };

  var gameWon = function() {
    clearTimeout(timerCallback);
    //remove click handlers
    won_message = '<h1>You won!</h1>Time: ' + time.toString().toHHMMSS()
    $guesses.html(won_message);
    $guessFeedback.html(won_message);

    $("#high-score-form").css('visibility', 'visible').effect(
                          "highlight", {} , 1500);

  };

  var removeCorrectAnswer = function(character) {
    $('#' + characterToID(character)).remove();
    $('#' + characterToID(character, 'legend-')).addClass("found");
  };

  var idToCharacter = function(id) {
    return id.substr(id.indexOf("-") + 1);
  };

  var characterToID = function(character, prefix) {
    prefix = prefix || 'guess-'
    return prefix + character;
  };

  var highScorePosted = function(response) {
    $('#high-score-form').empty();
    $('#high-score-form').html("<h2>Score sent</h2>")
    getHighScores();
  };

  var highScoreRefused = function() {
    $('#high-score-form').append("Something went wrong.")
  };

  var getHighScores = function() {
    $.ajax({
      url: "high_scores",
      type: "get",
      data: {
        photo: $photo.data("photo-name"),
      },
      dataType: 'json',
      success: updateHighScores,
    })

  };

  var updateHighScores = function(response) {
    var html_string = "";
    console.log(response);
    for(var idx in response) {
      html_string += "<div>"
      html_string += '<div class="name">'  + response[idx].name  + '</div>'
      html_string += '<div class="score">' + 
                      response[idx].score.toString().toHHMMSS() + '</div>'
      html_string += "</div>"
    }
    $('#score-container').html(html_string).effect("highlight", {} , 1500);
  };

  return {
    init: init,
  } //photo_tag_game
})();

$(document).ready(photo_tag_game.init);
$(document).on('page:load', photo_tag_game.init);
