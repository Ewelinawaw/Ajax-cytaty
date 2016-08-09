/**
 * Created by Ewelina on 12.07.2016.
 */


//aplikacja losująca cytaty

$(function(){
    var tweetLink = "https://twitter.com/intent/tweet?text="; //adres do wysyłania tweetów
    var quoteUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&key=867576&format=jsonp&lang=en&jsonp=?"; //adres do pobierania cytatów - link do API Forismatic, które pozwala nam pobierać losowe cytaty ze swojej bazy


    function getQuote() { //napisanie logiki, która pobierze nam losowy cytat za pomocą API.
        $.getJSON(quoteUrl, createTweet);//quoteUrl-adres zapytania (czyli link do API), createTweet(drugi)-funkcja, która zostanie wykonana przy pomyślnym wykonaniu zapytania.
    }
    function createTweet(input) {//ma za zadanie tworzyć linki z tweetami i podpinać je pod przycisk do tweetowania.
        if (!input.quoteAuthor.length) { //sprawdzenia autora cytatu
            input.quoteAuthor = "Unknown author";//Jeśli autor cytatu jest pustym stringiem (jego długość jest równa 0) to w pole autora wpisze się "Unknown author".
        }
        var tweetText = "Quote of the day - " + input.quoteText + " Author: " + input.quoteAuthor;
        if (tweetText.length > 140) {//sprawdzamy czy nie wykraczamy przypadkiem poza maksymalną długość 140 znaków (ograniczenie Twittera). Jeśli wykraczamy poza 140 symboli należy jeszcze raz wygenerować tweeta
            getQuote();
        } else {//Jeśli długość tweeta jest ok - możemy pokazać cytat użytkownikowi i podpiąć pod linka, który zajmie się generowaniem tweeta.
            var tweet = tweetLink + tweetText;
            $('.quote').text(input.quoteText);
            $('.author').text("Author: " + input.quoteAuthor);
            $('.tweet').attr('href', tweet);
        }
    }
    //Generowanie nowego tweeta po wejściu na stronę oraz po kliknięciu w przycisk z napisem Random quote
    $(document).ready(function() {
        getQuote();
        $('.trigger').click(function() {
            getQuote();
        })
    });
});









