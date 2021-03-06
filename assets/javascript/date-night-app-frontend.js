// Visual Elements
var masthead = $("<h1>").addClass("uk-text-center");
var searchInput = $("<input>").attr("id", "search-box").addClass("uk-input uk-align-center uk-form-width-large").attr("type", "uk-input").attr("placeholder", "Look for things to do here");
var searchEventButton = $("<button>").attr("id", "event-button").addClass("uk-button uk-button-default").css({ "margin-left": "10px", "margin-right": "10px" }).text("search by Venue");
var searchLocationButton = $("<button>").attr("id", "location-button").addClass("uk-button uk-button-default").css({ "margin-left": "10px", "margin-right": "10px" }).text("search by location");
var buttonsDiv = $("<div>").addClass("uk-text-center").append(searchEventButton, searchLocationButton);
var hr = $("<hr>");

// Navbar
var logo = $("<div>").addClass("uk-navbar-item uk-logo").text("NightOut!");
var navSeachBar = $("<input>").attr("id", "navbar-search").addClass("uk-input uk-width-large").attr("type", "uk-input").attr("placeholder", "Look for things to do here");
var navEventBtn = $("<button>").attr("id", "navbar-event-button").addClass("uk-button uk-button-default uk-margin-small-right").text("search by event");
var navLocationBtn = $("<button>").attr("id", "navbar-location-button").addClass("uk-button uk-button-default uk-margin-medium-right").text("search by location");

// offcanvas setion of menu
var hamburgerMenu = $("<a uk-navbar-toggle-icon uk-toggle>").attr("href", "#offcanvas-usage").addClass("uk-margin-medium-right");
var offCanvasTitle = $("<h3>").text("Get More Specific With The Location Search");
var locationLabel = $("<label>").addClass("uk-form-label").attr("for", "offcanvasLocationBar").text("Location");
var locationInput = $("<input>").addClass("uk-input").attr("id", "offcanvasLocationBar").attr("type", "text");
var locationInputDiv = $("<div>").addClass("uk-form-controls uk-margin-small-bottom").append(locationInput);
var locationEventLabel = $("<label>").addClass("uk-form-label").attr("for", "offcanvasLocationEventBar").text("Type of Food");
var locationEventInput = $("<input>").addClass("uk-input").attr("id", "offcanvasLocationEventBar").attr("type", "text");
var locationEventInputDiv = $("<div>").addClass("uk-form-controls").append(locationEventInput);
var moreSpecificYelpCallButton = $("<button>").attr("id", "moreSpecificYelpCallButton").addClass("uk-button uk-button-primary uk-align-right").text("Search");

var offCanvasFormDiv = $("<div>").addClass("uk-margin").append(locationLabel, locationInputDiv, locationEventLabel, locationEventInputDiv);
var offCanvasForm = $("<form>").addClass("uk-form-stacked").append(offCanvasFormDiv);
var offCanvasButtonDiv = $("<div>");
var offCanvasDiv = $("<div>").addClass("uk-offcanvas-bar").attr("id", "off-canvas-div").html("<button class=\"uk-offcanvas-close\" type=\"button\" uk-close></button>").append(offCanvasTitle, hr, offCanvasForm, moreSpecificYelpCallButton, offCanvasButtonDiv);
var offCanvasPage = $("<div>").attr("id", "offcanvas-usage").attr("uk-offcanvas", "flip: false").append(offCanvasDiv);

// navbar search elements
var navbarForm = $("<form>").attr("action", "javascript:void(0)").append(navSeachBar);
var navbarSearchDiv = $("<div>").addClass("uk-navbar-item").append(navbarForm);
var navbarLeftDiv = $("<div>").addClass("uk-navbar-left").append(logo, navbarSearchDiv);
var navbarRightDiv = $("<div>").addClass("uk-navbar-right").append(navEventBtn, navLocationBtn, hamburgerMenu, offCanvasPage);

var navbar = $("<nav uk-navbar>").addClass("uk-navbar-container uk-margin").append(navbarLeftDiv, navbarRightDiv);

// Pull info from the database and assign to arrays
var recentVenueSearchTermsArray = [];
var recentLocationSearchTermsArray = [];
    // Recent Event Venues Searched
database.ref("Recent Event").on("child_added", function(childSnapshot) {
    var recentSearchTerm = childSnapshot.val().search;
    recentSearchTerm = recentSearchTerm.toLowerCase();
    if (recentVenueSearchTermsArray.indexOf(recentSearchTerm) === -1) {
        recentVenueSearchTermsArray.unshift(recentSearchTerm);        
        var recentSearchButton = $("<button>").addClass("uk-button uk-button-default uk-margin-small recent-search-event").attr("data-term", recentSearchTerm).text(recentSearchTerm);
        offCanvasButtonDiv.append(recentSearchButton);
    }
});
    // Recent Locations Searched
database.ref("Recent Location").on("child_added", function(childSnapshot) {
    var recentLocationSearchTerm = childSnapshot.val().search;
    recentLocationSearchTerm = recentLocationSearchTerm.toLowerCase();
    if (recentLocationSearchTermsArray.indexOf(recentLocationSearchTerm) === -1) {
        recentLocationSearchTermsArray.unshift(recentLocationSearchTerm);
        var recentSearchButton = $("<button>").addClass("uk-button uk-button-default uk-margin-small recent-search-location").attr("data-term", recentLocationSearchTerm).text(recentLocationSearchTerm);
        offCanvasButtonDiv.append(recentSearchButton);
    }
});
    // Recent Detailed Location
database.ref("Recent Detailed Location").on("child_added", function(childSnapshot) {
    var search = childSnapshot.val().search;
    var detail = childSnapshot.val().detail;
    var searchWithDetail = search + ": " + detail;
    searchWithDetail = searchWithDetail.toLowerCase();
    if (recentLocationSearchTermsArray.indexOf(searchWithDetail) === -1) {
        recentLocationSearchTermsArray.unshift(searchWithDetail);
    }
});

function searchEvent() {
    var eventSearchTerm = "";
    if ($("#search-box").val() != "") {
        eventSearchTerm = $("#search-box").val();
        database.ref("Recent Event").push({search: eventSearchTerm});
        $("#root").empty();
        var resultsContainer = $("<div>").attr("id", "results").addClass("container");
        $("#root").append(navbar, resultsContainer);
        eventSearchTerm = eventSearchTerm.replace(/\s/g, "+");
        ticketMasterCall(eventSearchTerm);
    }
}
function navbarEventSearch() {
    var eventSearchTerm = "";
    if ($("#navbar-search").val() != "") {
        eventSearchTerm = $("#navbar-search").val();
        database.ref("Recent Event").push({search: eventSearchTerm});
        $("#results").empty();
        eventSearchTerm = eventSearchTerm.replace(/\s/g, "+");
        ticketMasterCall(eventSearchTerm);
    }
}
function eventBtn(btnValue) {
    var eventSearchTerm = btnValue;
    eventSearchTerm = eventSearchTerm.replace(/\s/g, "+");
    $("#results").empty();
    ticketMasterCall(eventSearchTerm);
}
function searchLocation() {
    var locationSearchTerm = "";
    if ($("#search-box").val() != "") {
        locationSearchTerm = $("#search-box").val();
        database.ref("Recent Location").push({search: locationSearchTerm});
        $("#root").empty();
        var resultsContainer = $("<div>").attr("id", "results").addClass("container uk-margin-auto");
        $("#root").append(navbar, resultsContainer);
        locationSearchTerm = locationSearchTerm.replace(/\s/g, "+");
        yelpCall(locationSearchTerm);
    }
}
function navbarLocationSearch() {
    var locationSearchTerm = "";
    if ($("#navbar-search").val() != "") {
        locationSearchTerm = $("#navbar-search").val();
        database.ref("Recent Location").push({search: locationSearchTerm});
        $("#results").empty();
        locationSearchTerm = locationSearchTerm.replace(/\s/g, "+");
        yelpCall(locationSearchTerm);
    }
}
function locationBtn(btnValue) {    
    var locationSearchTerm = btnValue;
    locationSearchTerm = locationSearchTerm.replace(/\s/g, "+");
    $("#results").empty();
    yelpCall(locationSearchTerm);
}
function offcanvasYelpSearch() {
    var locationSearchTerm = $("#offcanvasLocationBar").val();
    var locationEventSearchTerm = $("#offcanvasLocationEventBar").val();
    if (locationSearchTerm != "" && locationEventSearchTerm != "") {
        database.ref("Recent Detailed Location").push({search: locationSearchTerm, detail: locationEventSearchTerm});
        $("#results").empty();
        locationSearchTerm = locationSearchTerm.replace(/\s/g, "+");
        locationEventSearchTerm = locationEventSearchTerm.replace(/\s/g, "+");
        modifiedYelpCall(locationSearchTerm, locationEventSearchTerm);
    }

}

$(document).ready(function () {
    masthead.text("NightOut!");
    var searchDiv = $("<div>").append(searchInput, buttonsDiv);
    var landingDiv = $("<div>").addClass("uk-margin-xlarge-top").append(masthead, searchDiv);
    $("#root").append(landingDiv);
    
    $("#event-button").on("click", searchEvent);
    $("#location-button").on("click", searchLocation);
    
    $(document.body).on("click", "#navbar-location-button", navbarLocationSearch);
    $(document.body).on("click", "#navbar-event-button", navbarEventSearch);
    $(document.body).on("click", "#moreSpecificYelpCallButton", offcanvasYelpSearch);
    $(document.body).on("click", ".recent-search-location", function(){locationBtn($(this).text());});
    $(document.body).on("click", ".recent-search-event", function(){eventBtn($(this).text());});

});