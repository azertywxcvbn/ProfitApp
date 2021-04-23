var firebaseConfig = {
    apiKey: "AIzaSyBJ--FrCWSM9_FK7qCbiwZ3pqeLEw47lik",
    authDomain: "profitapp-71c26.firebaseapp.com",
    databaseURL: "https://profitapp-71c26-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "profitapp-71c26",
    storageBucket: "profitapp-71c26.appspot.com",
    messagingSenderId: "1099104634089",
    appId: "1:1099104634089:web:ae636630c7645b97571c78",
    measurementId: "G-K57LH481HY"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
var refDate = database.ref("date");
var refPrice = database.ref("price");
var refShares = database.ref("amount");
var refBought = database.ref("bought");

var ref = database.ref("/");
var datafile = "not";




function setDatafile() {
    ref.on("value", gotData);
    function gotData(data) {
        datafile = data.val()
    }
}


function reload() {

    console.log("")
}


function setProfitHtml() {
    refPrice.on("value", gotData);
    function gotData(data) {
        price = data.val()

        refShares.on("value", gotData);
        function gotData(data) {
            shares = data.val()

            refBought.on("value", gotData);
            function gotData(data) {
                bought = data.val()
                total = sum = bought.reduce((a, b) => {
                    return a + b;
                });;

                profit = price * shares - total.toFixed(2)
                document.getElementById("profitId").innerHTML = "Your profit: €" + profit.toFixed(2);
                if (profit > 0) {
                    document.getElementById("arrowId").className = "rotateup";
                    document.getElementById("arrowId").src = "img/arrowup.png";
                }
                else {
                    document.getElementById("arrowId").className = "rotatedown";
                    document.getElementById("arrowId").src = "img/arrowdown.png";
                }
            }
        }

    }




}

function setSharesHtml() {

    refShares.on("value", gotData, errorData);
    function gotData(data) {
        var shares = data.val();

        document.getElementById("sharesId").innerHTML = "Shares: " + shares;
    }
    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}


function setDateHtml() {

    refDate.on("value", gotData, errorData);
    function gotData(data) {
        var date = data.val();
        document.getElementById("dateId").innerHTML = "Last update: " + date;
    }
    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}




function setPriceHtml() {
    refPrice.on("value", gotData, errorData);
    function gotData(data) {
        price = data.val();
        document.getElementById("priceId").innerHTML = "Current Price: €" + price;
    }

    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}



function getPrice() {
    return datafile["price"]

}





function setUp() {
    setDatafile()
    setPriceHtml()
    setDateHtml()
    setSharesHtml()
    setProfitHtml()




}