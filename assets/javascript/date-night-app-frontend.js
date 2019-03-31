// Visual Elements
var masthead = $("<h1>").addClass("uk-text-center");
var searchInput = $("<input>").addClass("uk-input uk-align-center uk-form-width-large").attr("type", "uk-input").attr("placeholder", "Look for things to do here");
var searchEventButton = $("<button>").attr("id", "event-button").addClass("uk-button uk-button-default").css({"margin-left": "10px", "margin-right": "10px"}).text("search by event");
var searchLocationButton = $("<button>").attr("id", "location-button").addClass("uk-button uk-button-default").css({"margin-left": "10px", "margin-right": "10px"}).text("search by location");
var buttonDiv = $("<div>").addClass("uk-text-center").append(searchEventButton, searchLocationButton);

$(document).ready(function () {
    masthead.text("NightOut!");
    var searchDiv = $("<div>").append(searchInput, buttonDiv);
    var landingDiv = $("<div>").addClass("uk-margin-xlarge-top").append(masthead, searchDiv);
    $("#root").append(landingDiv);
});