var yelpCall = function (locationFromSearch) {

    var eventYelp = "steak";
    var locationYelp = locationFromSearch;
    var limitYelp = 9;

    // JavaScript Document
    var queryURL = "https://cors-anywhere.herokuapp.com/";
    var yelpApiUrl = "https://api.yelp.com/v3/businesses/search?";
    var apiKey = "K3fxulpxH74l-AIXKot7PQq5mqsfYt8sStpiNQ7IqWEkH_CxYz74_7G_kRmd2cU1EU37UDN07XzOPsT0fQ01xaQlI53KWs1nbpLV_D_OKAub-bLUptqFxtVPq6GfXHYx";

    $.ajax({
        url: queryURL + yelpApiUrl,
        method: "GET",
        data: {
            "location": locationYelp,
            "term": eventYelp,
            "limit": limitYelp
        },
        headers: {

            "Authorization": `Bearer ${apiKey}`
        }
    }).then(function (data) {
        // Grab the results from the API JSON return
        var totalresults = data.total;
        // Itirate through the JSON array of 'businesses' which was returned by the API
        $.each(data.businesses, function (i, item) {
            // Store each business's object in a variable
            var phone = item.display_phone;
            var image = item.image_url;
            var name = item.name;
            var rating = item.rating;
            var starRate = ""
            for (let index = 0; index < rating; index++) {
                starRate += "⭐";
            }
            // Append our result into our page
            var yelpImg = $("<img uk-cover>").attr("src", image).attr("alt", name);
            // var yelpImgCanvas = $("<canvas>").attr("width", "600px").attr("height", "400px");
            var yelpCardMediaLeft = $("<div>").addClass("uk-card-media-left uk-cover-container").append(yelpImg);
            var yelpCardTitle = $("<h2>").addClass("uk-card-title").text(name);
            var yelpCardText = $("<p>").text(item.location.display_address);
            var yelpCardStarRating = $("<p>").text(starRate);
            var yelpCardBody = $("<div>").addClass("uk-card-body").append(yelpCardTitle, yelpCardText, yelpCardStarRating);
            var bodyDiv = $("<div>").append(yelpCardBody);
            var yelpResultsDiv = $("<div uk-grid>").addClass("uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-margin-auto").append(yelpCardMediaLeft, bodyDiv);
            yelpResultsDiv.css({"width" : "45%"});
            $("#results").append(yelpResultsDiv);
        });

    });

};