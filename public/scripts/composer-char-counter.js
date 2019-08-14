$(document).ready(function() {
  $('#tweet-text').on('keydown', function(event) {

    const $this = $(this);

    const $count = $this.siblings('.counter');

    const counter = 140 - $this.val().length;

    $count.html(counter);
    $count.css("color", counter >= 0 ? "black" : "red");
  });
});

