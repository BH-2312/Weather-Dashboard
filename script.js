$("document").ready(function () {

    //array containing city names
    var cities = [];
    // This line grabs the city input from the search box

    //This function handles what happens when button is clicked. Row add to left hand side table and weather data displayed//
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        searchCity = $("#searchCity").val().trim();
        var queryUrl1 = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&appid=dc93a678def19d88644d218aac7ed21c"
        console.log(queryUrl1)
        // Adding city from the search box to our array
        cities.push(searchCity);
// running of functions
        renderTable();
        callAPI1(queryUrl1);
        callAPI2(queryUrl2);
    })

    //call API function number 1
    function callAPI1(queryUrl1) {
        $.ajax({
            url: queryUrl1,
            method: "GET"
        }).then(function (data) {
          
            console.log(data);
            console.log(data.city.coord.lat)
            console.log(data.city.coord.lon)
            var latitude = data.city.coord.lat
            var longitude = data.city.coord.lon
            console.log(latitude)
            var queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "+&lon=" + longitude + "&units=metric&appid=dc93a678def19d88644d218aac7ed21c"

        })
        
        function callAPI2 (queryUrl2) {
            $.ajax({
                url: queryUrl2,
                method: "GET"
            }).then(function (data) {
    
                console.log(data);
                //console.log(data.name)
                // //$("#city").text(data.name)
                // $("#country").text(data.sys.country)
                // $("#temp").text(data.main.temp)
                // $("#humid").text(data.main.humidity)
                // $("#wind").text(data.wind.speed)
            })
        }
    }
    // function callAPI2(queryUrl2) {
    //     $.ajax({
    //         url: queryUrl2,
    //         method: "GET"
    //     }).then(function (data) {

    //         console.log(data);
    //         console.log(data.name)
    //         $("#city").text(data.name)
    //         $("#country").text(data.sys.country)
    //         $("#temp").text(data.main.temp)
    //         $("#humid").text(data.main.humidity)
    //         $("#wind").text(data.wind.speed)
    //     })
    // }
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
