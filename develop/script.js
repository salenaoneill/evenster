var ticketApiKey = "dJqLwkzfmRboei4GB7DDkGUtn5uG2Nk4";
var searchBtn = document.getElementById('city-searchBtn');
var cityInput = document.getElementById('search');


searchBtn.addEventListener('click', function(){
    var city = cityInput.value;
    getEvents(city);
});

function getEvents(city){
    var requestUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+ city +"&apikey=" + ticketApiKey ; 
    $.ajax({
        type: 'GET',
        url: requestUrl, 
        dataType: 'json',
        success: function(response) {
            console.log(response);
            var eventName = response._embedded.events[0].name;
            var eventDate = response._embedded.events[0].dates.start.localDate;
            $("#Events").text(eventName);
            $("#Dates").text(eventDate);
        } 
    })
}

// fetch(requestUrl)
// .then(function (response){
//     console.log(response)
//     return response.json();
// })
// .then(function (data) {
//     console.log(data)
//   });


  // fetch('requestUrl')
// .then((response) => {
// response.json().then((data) => {
// console.log(data);
// });
// });