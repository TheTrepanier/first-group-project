// Visual Elements
var masthead = $("<h1>").addClass("uk-text-center");
var searchInput = $("<input>").attr("id", "search-box").addClass("uk-input uk-align-center uk-form-width-large").attr("type", "uk-input").attr("placeholder", "Look for things to do here");
var searchEventButton = $("<button>").attr("id", "event-button").addClass("uk-button uk-button-default").css({"margin-left": "10px", "margin-right": "10px"}).text("search by event");
var searchLocationButton = $("<button>").attr("id", "location-button").addClass("uk-button uk-button-default").css({"margin-left": "10px", "margin-right": "10px"}).text("search by location");
var buttonsDiv = $("<div>").addClass("uk-text-center").append(searchEventButton, searchLocationButton);

// Navbar
var logo = $("<div>").addClass("uk-navbar-item uk-logo").text("NightOut!");
var navSeachBar = $("<input>").attr("id", "navbar-search").addClass("uk-input uk-width-large").attr("type", "uk-input").attr("placeholder", "Look for things to do here");
var navEventBtn = $("<button>").attr("id", "navbar-event-button").addClass("uk-button uk-button-default uk-margin-small-right").text("search by event");
var navLocationBtn = $("<button>").attr("id", "navbar-location-button").addClass("uk-button uk-button-default uk-margin-medium-right").text("search by location");
var navbarForm = $("<form>").attr("action", "javascript:void(0)").append(navSeachBar);
var navbarSearchDiv = $("<div>").addClass("uk-navbar-item").append(navbarForm);
var navbarLeftDiv = $("<div>").addClass("uk-navbar-left").append(logo, navbarSearchDiv);
var navbarRightDiv = $("<div>").addClass("uk-navbar-right").append(navEventBtn, navLocationBtn);
var navbar = $("<nav uk-navbar>").addClass("uk-navbar-container uk-margin").append(navbarLeftDiv, navbarRightDiv);



function searchEvent() {
    $("#root").empty();
    var resultsContainer = $("<div>").attr("id", "results").addClass("container");
    $("#root").append(navbar, resultsContainer);
    var eventSearchTerm = $("#search-box").val();
    console.log("searching for event");
}

function searchLocation() {
    var locationSearchTerm = "";
    if ($("#search-box").val() != "") {
        locationSearchTerm = $("#search-box").val();
    }
    $("#root").empty();
    var resultsContainer = $("<div>").attr("id", "results").addClass("container");
    $("#root").append(navbar, resultsContainer);
    locationSearchTerm = locationSearchTerm.replace(/\s/g, "+");
    yelpCall(locationSearchTerm);
    console.log(locationSearchTerm);
}

function navbarSearch() {
    var locationSearchTerm = "";
    if ($("#navbar-search").val() != "") {
        locationSearchTerm = $("#navbar-search").val();
    }

    $("#results").empty();
    locationSearchTerm = locationSearchTerm.replace(/\s/g, "+");
    yelpCall(locationSearchTerm);
    console.log(locationSearchTerm);
}

$(document).ready(function () {
    masthead.text("NightOut!");
    var searchDiv = $("<div>").append(searchInput, buttonsDiv);
    var landingDiv = $("<div>").addClass("uk-margin-xlarge-top").append(masthead, searchDiv);
    $("#root").append(landingDiv);

    $("#event-button").on("click", searchEvent);
    $("#location-button").on("click", searchLocation);

    $(document.body).on("click", "#navbar-location-button", navbarSearch);
});