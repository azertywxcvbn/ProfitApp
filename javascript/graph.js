function setGraphHtml() {

    var mydata = localStorage.getItem("graphInfo")

    if (mydata !== "") {

        var data = JSON.parse(mydata)
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
                colors: ['#AF8FE9'],
                width: 350,
                height: 150,
                pointSize: 8,

                curveType: 'function',
                legend: { position: 'bottom', textStyle: { color: 'white' } },
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
                    },


                }


            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }
    }



}


