$("document").ready(function () {

    //array containing city names
    var cities = [];
    //dates for 5 day forecast
    $("#day1").text(moment().add(1, 'd').format("MMM Do YYYY"));
    $("#day2").text(moment().add(2, 'd').format("MMM Do YYYY"));
    $("#day3").text(moment().add(3, 'd').format("MMM Do YYYY"));
    $("#day4").text(moment().add(4, 'd').format("MMM Do YYYY"));
    $("#day5").text(moment().add(5, 'd').format("MMM Do YYYY"));

    //This function handles what happens when button is clicked. Row add to left hand side table and weather data displayed//
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        $("#searchCity").text(localStorage.getItem('city'));
        searchCity = $("#searchCity").val().trim();
        //storage of last search
        localStorage.setItem('city', searchCity);
        //document.querySelector("#searchCity").textContent = localStorage.getItem('city');
        //URL for 1st AJAX call
        var queryUrl1 = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&appid=dc93a678def19d88644d218aac7ed21c"
        console.log(queryUrl1)
        // Adding city from the search box to our array
        cities.push(searchCity);
        // running of functions
        renderTable();
        callAPI1(queryUrl1);
    })

    //call API function number 1
    function callAPI1(queryUrl1) {
        //1st ajax call
        $.ajax({
            url: queryUrl1,
            method: "GET"
        }).then(function (response1) {
            console.log(response1);
            console.log(response1.city.coord.lat);
            console.log(response1.city.coord.lon);
            var latitude = response1.city.coord.lat;
            var longitude = response1.city.coord.lon;
            console.log(latitude);
            console.log(longitude);
            var queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=dc93a678def19d88644d218aac7ed21c";
            $("#city").text(response1.city.name);
            $("#country").text(response1.city.country);
            $("#today").text(moment().format("MMM Do YYYY"));
            console.log(moment().add(7, 'd').format("MMM Do YYYY"));
            // 2nd ajax call
            $.ajax({
                url: queryUrl2,
                method: "GET"
            }).then(function (response2) {
                var icon = ( src= "http://openweathermap.org/img/w/" + response2.current.weather[0].icon + ".png>")
                console.log(response2.current.weather[0].icon)
                console.log(icon);
                $("#iconCurrent").html(icon);
                console.log(response2);
                //for current conditions
                $("#temp").text(response2.current.temp + "°C");
                $("#humid").text(response2.current.humidity + "%");
                $("#wind").text(response2.current.wind_speed + "km/h");
                var uv = response2.current.uvi;
                $("#uv").text(uv);
                console.log(typeof(uv));
                console.log(uv <= 3)

                // uv index colours
                if (uv <= 3) {
                    $("#uv").addClass("green");
                }
                else if (uv <= 7) {
                    $("#uv").addClass("gold");
                }
                else if (uv > 7) {
                    $("#uv").addClass("red");
                };

                // for 5 day forecast
                $("#temp1").text(response2.daily[1].temp.max + "°C");
                $("#temp2").text(response2.daily[2].temp.max + "°C")
                $("#temp3").text(response2.daily[3].temp.max + "°C")
                $("#temp4").text(response2.daily[4].temp.max + "°C")
                $("#temp5").text(response2.daily[5].temp.max + "°C")
                $("#hum1").text(response2.daily[1].humidity + "%")
                $("#hum2").text(response2.daily[2].humidity + "%")
                $("#hum3").text(response2.daily[3].humidity + "%")
                $("#hum4").text(response2.daily[4].humidity + "%")
                $("#hum5").text(response2.daily[5].humidity + "%")

            })
        })
    }

    function clear() {
        $(".forecast").empty();
    }
    // Function for saving prev searches on left hand side
    function renderTable() {

        // Deleting the cities prior to adding new cities (this is necessary otherwise will have repeat cities)
        $("tbody").empty();

        // Looping through the array of cities
        for (var i = 0; i < cities.length; i++) {
            // adding row to table for each city in the array
            var a = $("<tr>");
            // Adding a data-attribute
            a.attr("data-name", cities[i]);
            // adding the name of the city in the row
            a.text(cities[i]);
            // Adding the row to the tbody
            $("tbody").prepend(a);
        }
    }
});
