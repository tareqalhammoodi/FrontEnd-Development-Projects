const projectName = "Random-Quote-Machine";
let quotes_List;
var c_Quote  = "",
    c_Author = "";

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url: "https://raw.githubusercontent.com/tareqalhammoodi/FrontEnd-Development-Projects/master/Random%20Quote%20Machine/json%20file/quotes.json",
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === "string") {
        quotes_List = JSON.parse(jsonQuotes);
        console.log("quotes_List");
        console.log(quotes_List);
      }
    }
  });
}

function getRandomQuote() {
  return quotes_List.quotes[
    Math.floor(Math.random() * quotes_List.quotes.length)
  ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  c_Quote = randomQuote.quote;
  c_Author = randomQuote.author;

  $("#tweet-quote").attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + c_Quote + '" ' + c_Author));

  $(".text").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#text").text(randomQuote.quote);
  });

  $(".author").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#author").html(randomQuote.author);
  });
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $("#new-quote").on("click", getQuote);
});
