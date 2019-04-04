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
            var id = item.id;
            var alias = item.alias;
            var phone = item.display_phone;
            var image = item.image_url;
            var name = item.name;
            var rating = item.rating;
            var reviewcount = item.review_count;
            var address = item.location.address1;
            var city = item.location.city;
            var state = item.location.state;
            var zipcode = item.location.zip_code;
            // Append our result into our page
            $("#results").append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');
        });

    });

};