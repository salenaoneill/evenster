var ticketApiKey = "dJqLwkzfmRboei4GB7DDkGUtn5uG2Nk4";
var userInput = "Minneapolis"
var requestUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+userInput+"&apikey=" + ticketApiKey ;
var searchBtn = document.getElementById('city-searchBtn');
var cityInput = document.getElementById('search');


searchBtn.addEventListener('click', function(){
    var city = cityInput.value;
    console.log(city);
})


fetch(requestUrl)
.then(function (response){
    console.log(response)
    return response.json();
})
.then(function (data) {
    console.log(data)
  });