var ticketMasterCall = function() {
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?";
  var search = "&keyword=comerica+theatre";
  var apiKey = "&apikey=uSxl2gTHIkk0ZOlvcFjRxmWklVwyB41K";
  $.ajax({
    url: queryURL + search + apiKey,
    method: "GET"
  }).then(function(response) {
    var eventList = response._embedded.events;
    // console.log(eventList);
    for (let i = 0; i < eventList.length; i++) {
      // console.log(eventList[i].name);
      // console.log(eventList[i].url);
      // console.log(eventList[i]._embedded.venues[0].name);
    }
  });
};