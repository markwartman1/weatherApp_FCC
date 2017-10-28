$(document).ready(function() {
  var long;
  var lat;

  $.getJSON("https://ipapi.co/json", function(data2) {
    lat = data2.latitude;
    long = data2.longitude;

    console.log("latitude & longitude are: " + lat + " " + long);
    var api =
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
      lat +
      "&lon=" +
      long;

    $.getJSON(api, function(data) {
      var celciusTemp = data.main.temp;   // Temp in Celsius
      var finalCelsiusTemp = celciusTemp.toFixed(1); // adjust the Celsius decimal
      var tempSwap = true;    // for click function below
      var weatherType = data.weather[0].description;
      var windSpeed = data.wind.speed;
      var city = data.name;
      var fTemp = (celciusTemp * (9 / 5) + 32).toFixed(1); // Temp in Fahrenheit

      //weather icons
      var myIcon = data.weather[0].icon;
      $("#weatherIcon").html("<img src=" + myIcon + ">");

      // city, weather description,
      $("#city").html(city); // City name
      $("#weatherType").html(weatherType);
      $("#fTemp").html(fTemp + " &#8457;"); // set default to Fahrenheit
      $("#CF").html(" &#8457;" + " /" + " &#8451;"); // label the C / F btn.

      // click function logic
      $("#CF").click(function() {
        if (tempSwap === false) {
          $("#fTemp").html(fTemp + " &#8457;"); // unicode Fahrenheit= &#8457
          tempSwap = true;
        } else {
          $("#fTemp").html(finalCelsiusTemp + " &#8451;"); // unicode Celsius= &#8451
          tempSwap = false;
        }
      }); //end click function

      // convert to miles per hour
      windSpeed = (0.621 * windSpeed).toFixed(1); //assuming the api return is in KPH
      $("#windSpeed").html(windSpeed + " mph");

      console.log(weatherType);

      // determine the background picture contingent of the weather type.
      if (
        weatherType === "partly cloudy" ||
        weatherType === "scattered clouds" ||
        weatherType === "broken clouds"
      ) {
        $("body").css(
          "background-image",
          "url(https://images.unsplash.com/photo-1414269665217-a57681e266b3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=6fd9f051bea811268593340698b6a822)"
        );
      } else if (weatherType === "rain" || weatherType === "moderate rain")
        $("body").css(
          "background-image",
          "url(https://images.unsplash.com/photo-1428592953211-077101b2021b?crop=entropy&fit=crop&fm=jpg&h=1000&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1925)"
        );
      else if (weatherType === "snow") {
        $("body").css(
          "background-image",
          "url(https://images.unsplash.com/photo-1422020297037-97bd356cc312?crop=entropy&fit=crop&fm=jpg&h=1250&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=2400)"
        );
      } else if (weatherType === "mist" ||
                 weatherType === "light rain" ||
                weatherType === "overcast clouds" ||
                 weatherType === "fog") {
        $("body").css(
          "background-image",
          "url(https://images.unsplash.com/photo-1468962786167-fbc55c2cd852?dpr=1&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=)"
        );
      } else if (weatherType === "clear sky") {
        // THE YELLOW FLOWERS / BLUE SKY
        $("body").css(
          "background-image",
          "url(https://images.unsplash.com/photo-1460025243317-d9ea99e5c828?dpr=1&amp;auto=compress,format&amp;fit=crop&amp;w=991&amp;h=661&amp;q=80&amp;cs=tinysrgb&amp;crop=)"
        );
      } else if (weatherType === "thunderstorm") {
        $("body").css(
          "background-image",
          "url(https://images.unsplash.com/photo-1475116127127-e3ce09ee84e1?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=)"
        );
      } else {
        // CLEAR SKY BELOW
        // SHOULD BE CLEAR & AT NIGHT !!
        $("body").css(
          "background-image",
          "url(https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?dpr=1&amp;auto=compress,format&amp;fit=crop&amp;w=991&amp;h=661&amp;q=80&amp;cs=tinysrgb&amp;crop=)"
        );
      }
    }); // end getJSON data
  }); // end data 2
}); // end ready function
