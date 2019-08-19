$(document).ready(function() {
  $('#textMsg').on('keyup', function(event) { //count characters in new twees messages

    const $this = $(this);

    const $count = $this.siblings('.counter');

    const counter = 140 - $this.val().length;

    $count.html(counter);
    $count.css("color", counter >= 0 ? "black" : "red");
  });
});