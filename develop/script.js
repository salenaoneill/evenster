var ticketApiKey = "dJqLwkzfmRboei4GB7DDkGUtn5uG2Nk4";
var searchBtn = document.getElementById('city-searchBtn');
var cityInput = document.getElementById('search');
var weatherApiKey = "2990125db773c56e5007a1ee037a364b";

//When search button clicked, call weather & events function on serarched city
searchBtn.addEventListener('click', function(){
    var city = cityInput.value;
    getEventsWithWeather(city);
});

//
function getEventsWithWeather(city){
    //grab date 7 days from now.
    let d = new Date();
    let sevendaysfutureepoch = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7).getTime();
    //ticketmaster and openweather API URLs
    var eventUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+ city +"&apikey=" + ticketApiKey ;
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + weatherApiKey;
    //event call
    $.ajax({
        type: 'GET',
        url: eventUrl, 
        dataType: 'json',
        success: function(eventResponse) {
            //weather call
            $.ajax({
                type: 'GET',
                url: weatherUrl, 
                dataType: 'json',
                success: function(weatherResponse) {
                    console.log(weatherResponse);
                    //sorts items by date & grabs only items within the next 7 days
                    var sortedEvents = eventResponse._embedded.events.sort(function(a,b){
                        return Date.parse(a.dates.start.localDate)-Date.parse(b.dates.start.localDate);
                    }).filter(function(i){
                        var eventDate = Date.parse(i.dates.start.localDate);
                        return eventDate < sevendaysfutureepoch;
                    });
                    $('#Events').empty();
                    //creates a list item for each event matching the criteria
                    for (i = 0; i < sortedEvents.length; i++) {
                        var newEvent = document.createElement("li");
                        //retrieves forecast for date of event
                        var matchingWeatherEl = weatherResponse.list.find(function(c){
                            return c.dt_txt.startsWith(sortedEvents[i].dates.start.localDate);
                        });
                        var temp = matchingWeatherEl.main.temp;
                        var weatherDescription = matchingWeatherEl.weather[0].description;
                        //displays date of event, followed by event, temp that day, and weather description that day.
                        newEvent.innerHTML = sortedEvents[i].dates.start.localDate + ": " + sortedEvents[i].name + " " + temp + "°F " + "w/ " + weatherDescription;
                        $("#Events").append(newEvent);
                    }
                    
                } 
            })

            

        } 
    })




   
}

