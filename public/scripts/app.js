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

    const timeDifference = function (current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = current - previous;
    let plural = 's';
    if (elapsed < msPerMinute) {
      const seconds = Math.round(elapsed / 1000);
      if (seconds === 1) plural = '';
      return seconds + ' second' + plural + ' ago';
    } else if (elapsed < msPerHour) {
      const minutes = Math.round(elapsed / msPerMinute);
      if (minutes === 1) plural = '';
      return minutes + ' minute' + plural + ' ago';
    } else if (elapsed < msPerDay) {
      const hours = Math.round(elapsed / msPerHour);
      if (hours === 1) plural = '';
      return hours + ' hour' + plural + ' ago';
    } else if (elapsed < msPerMonth) {
      const days = Math.round(elapsed / msPerDay);
      if (days === 1) plural = '';
      return days + ' day' + plural + ' ago';
    } else if (elapsed < msPerYear) {
      const months = Math.round(elapsed / msPerMonth);
      if (months === 1) plural = '';
      return months + ' month' + plural + ' ago';
    } else {
      const years = Math.round(elapsed / msPerYear);
      if (years === 1) plural = '';
      return years + ' year' + plural + ' ago';
    }
  };


  let createTweetElement = function(obj) {
    const image = obj.user.avatars;
    const username = obj.user.name;
    const handle = obj.user.handle;
    const tweetText = obj.content.text;
    const currentTime = new Date();
    const creationTime = timeDifference(currentTime, obj.created_at);
    const $markup = `<article class="tweet"> 
    <header>
      <img src="${image}" alt="${username}" />
      <h3>${username}</h3>
      <h4>${handle}</h4>
    </header>
    <p>${escape(tweetText)}</p>
    <footer> ${creationTime}
      <div class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
    </footer>
</article>`;

    return $markup;
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const renderTweets = function(tweets) {
    tweets.forEach(function(tweetData) {
      const $tweet = createTweetElement(tweetData);
      $(".tweet-container-box").prepend($tweet);
    });
  };



  const loadTweets = function() {
    return $.ajax({
      url: '/tweets/',
      type: 'GET',
      success: function(data) {
        renderTweets(data);
      }
    });
  };

  $(".write-arrow").click(function() {
    $(".new-tweet").toggle("slow");
  });



  $(function() {
    $("#form").on("submit", function(event) {
      event.preventDefault();
      const $form = $(this);
      const data = $form.serialize();
      const tweetMsg = data.substring(5);

      if(!tweetMsg || tweetMsg.length > 140) {
        console.log("hello");
        $(".error-msg").slideDown("slow");
      } else {
      $.ajax({
        type: "POST",
        url: '/tweets/',
        data: data
      })
      .then($(this).children(".counter").html("140"))
      .then($("#textMsg").val(''))
      .then($(".error-msg").slideUp("slow"))
      .then(loadTweets);
    }
  });
})
     
      


});
// ^to document.ready