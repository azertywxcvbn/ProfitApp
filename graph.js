
var database = firebase.database();
var graphInfo = database.ref("graph");
var refDate = database.ref("date");
var refPrice = database.ref("price");

function setGrapInfo() {
    refDate.on("value", gotData, errorData);
    function gotData(data) {
        var date = data.val();

        graphInfo.on("value", gotData, errorData);
        function gotData(data) {
            var data = data.val();
            var priceList = [data[0]["price"], data[1]["price"], data[2]["price"], data[3]["price"], data[4]["price"]]
            var dateList = [data[0]["date"], data[1]["date"], data[2]["date"], data[3]["date"], data[4]["date"]]

            if (dateList.indexOf(date)) {
                refPrice.on("value", gotData);
                function gotData(data) {
                    price = data.val()
                    console.log(price)
                    firebase.database().ref('graph/').set({
                        0: {
                            'date': date,
                            'price': price
                        },
                        1: {
                            'date': dateList[0],
                            'price': priceList[0]
                        },
                        2: {
                            'date': dateList[1],
                            'price': priceList[1]
                        },
                        3: {
                            'date': dateList[2],
                            'price': priceList[2]
                        },
                        4: {
                            'date': dateList[3],
                            'price': priceList[3]
                        }

                    });

                }


            };

        }




    }


}


function errorData(err) {
    console.log("error");
    console.log(err);
}





function setGraph() {
    setGrapInfo();
    graphInfo.on("value", gotData, errorData);
    function gotData(data) {
        var data = data.val();

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        var date1 = data[0]["date"];
        var date2 = data[1]["date"];
        var date3 = data[2]["date"];
        var date4 = data[3]["date"];
        var date5 = data[4]["date"];

        var price1 = data[0]["price"];
        var price2 = data[1]["price"];
        var price3 = data[2]["price"];
        var price4 = data[3]["price"];
        var price5 = data[4]["price"];
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Date', 'Price'],
                [date5, Number(price5)],
                [date4, Number(price4)],
                [date3, Number(price3)],
                [date2, Number(price2)],
                [date1, Number(price1)],

            ]);

            var options = {
                colors: ['white'],
                width: 350,
                height: 150,
                curveType: 'function',
                legend: { position: 'bottom' },
                lineWidth: 3,
                backgroundColor: { fill: 'transparent' },
                vAxis: {
                    gridlines: {

                        color: 'transparent'
                    }
                },
                vAxis: {
                    textStyle: { color: 'white' },
                    color: 'white',
                    gridlines: {
                        color: 'transparent'
                    }

                }


            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }

    }
    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}
