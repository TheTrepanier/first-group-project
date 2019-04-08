var ticketMasterCall = function(eventSearch) {
  var tmqueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?&radius=20&countryCode=us&stateCode=AZ&sort=date,asc";
  var tmsearch = "&keyword=" + eventSearch;
  var tmapiKey = "&apikey=uSxl2gTHIkk0ZOlvcFjRxmWklVwyB41K";
 
  $.ajax({
    url: tmqueryURL + tmsearch + tmapiKey,
    method: "GET"
  }).then(function(response) {
    var eventList = response._embedded.events;
    for (let i = 0; i < eventList.length; i++) {

      var eventName = eventList[i].name;
      var url = eventList[i].url;
      var images = eventList[i].images;
      var startDate = eventList[i].dates.start.localDate;
      var eventTime = eventList[i].dates.start.localTime;

      // eventsList.dates.start.localDate

      var linkToEvent = $("<a>").attr("href", url).addClass("uk-button uk-button-primary").text("Get Tickets!");
      var tmCardUrl = $("<img uk-cover>").addClass("uk-cover").attr("src", images[0].url);
      var tmCardMediaLeft = $("<div>").addClass("uk-card-media-left uk-cover-container").append(tmCardUrl);
      var tmCardTitle = $("<h2>").addClass("uk-card-title").text(eventName);
      var tmCardText = $("<p>").text("Show date: " + startDate);
      var tmCardMoreText = $("<p>").text("Time: " + eventTime);
      var tmCardBody = $("<div>").addClass("uk-card-body").append(tmCardTitle, tmCardText, tmCardMoreText, linkToEvent);
      var bodyDiv = $("<div>").append(tmCardBody);

      var tmResultsDiv = $("<div uk-grid>").addClass("uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-margin-auto").append(tmCardMediaLeft, bodyDiv);
      tmResultsDiv.css({"width" : "45%"});
      $("#results").append(tmResultsDiv);
    }
  });
};