/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

$(document).ready(function() {

  let createTweetElement = function(obj) {
    const image = obj.user.avatars;
    const username = obj.user.name;
    const handle = obj.user.handle;
    const tweetText = obj.content.text;
    const $markup = `<article class="tweet"> 
    <header>
      <img src="${image}" alt="${username}" />
      <h3>${username}</h3>
      <h4>${handle}</h4>
    </header>
    <p>${tweetText}</p>
    <footer>10 days ago
      <div class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
    </footer>
</article>`;

    return $markup;
  };

  const renderTweets = function(tweets) {
    tweets.forEach(function(tweetData) {
      const $tweet = createTweetElement(tweetData);
      $(".tweet-container-box").append($tweet);
    });
  };


  const loadTweets = function() {
    return $.ajax({
      url: '/tweets/',
      type: 'GET',
      success: function(data) {
        console.log(data);
        renderTweets(data);
      }
    });
  };



  $(function() {
    $("#form").on("submit", function(event) {
      event.preventDefault();
      const $form = $(this);
      const data = $form.serialize();
      const tweetMsg = data.substring(5);
      if(!tweetMsg) {
        alert("Text area is empty!");
      }
      if(tweetMsg.length > 140) {
        alert("Too many characters!");
      }


      $.ajax({
        type: "POST",
        url: '/tweets/',
        data: data
      })
        .then(function() {
          console.log("success", data);
          loadTweets();
          $("#textMsg").val('');
        });

    });
  });



});