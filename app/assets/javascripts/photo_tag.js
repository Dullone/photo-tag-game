var photo_tag_game = (function () {

  var $photo;
  var guessBoxWidth;
  var guessBoxHeight;
  var $guessBox;
  var $guesses;
  var guessBoxPadding = 4;
  var guessesPadding  = 6;
  var time            = 0;

  var init = function() {

    $photo = $("#photo_tag_game_img");

    if($photo.length) {

      $guessBox       = $("#guess-box");
      $guesses        = $("#guesses");
      $timer          = $("#timer");
      guessBoxWidth   = $guessBox.width();
      guessBoxHeight  = $guessBox.height();

      $('body').click(onClickBody);
      $photo.click(onClickPhoto);
      $guesses.click(onClickGuesses);

      setTimeout(updateTimer, 1000);

    }
  };

  var updateTimer = function() {
    $timer.text("Time: " + ++time);
    setTimeout(updateTimer, 1000);
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
    event.stopPropagation()
    event.preventDefault();
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

  return {
    init: init,
  } //photo_tag_game
})();

$(document).ready(photo_tag_game.init);
$(document).on('page:load', photo_tag_game.init);
