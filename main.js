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
var refUpdate = database.ref("update");
var graphInfo = database.ref("graph");

var ref = database.ref("/");
var datafile = "not";



function isUpdate() {
    var update = localStorage.getItem("update");
    var updateDate = new Date("1970-01-01 " + update);
    var currentDate = new Date();
    if (update == null) {
        setDateStorage()
    }
    if (updateDate.getHours() + 4 <= currentDate.getHours()) {
        return true;
    }
    return false;
}


function setUpdateStorage() {
    var currentDate = new Date();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    localStorage.setItem("update", time);


}

function setGrapInfoStorage() {
    graphInfo.on("value", gotData, errorData);
    function gotData(data) {
        var data = data.val();
        localStorage.setItem("graphInfo", JSON.stringify(data));


    }
    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}



function arrowRotation() {
    var profit = localStorage.getItem("profit")
    profit = Number(profit)

    if (profit > 0) {
        document.getElementById("arrowId").className = "rotateup";
        document.getElementById("arrowId").src = "img/arrowup.png";
    }
    else {
        document.getElementById("arrowId").className = "rotatedown";
        document.getElementById("arrowId").src = "img/arrowdown.png";
    }
}

function setProfitStorage() {
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

                profit = price * shares - total.toFixed(2);
                localStorage.setItem("profit", profit.toFixed(2));


            }
        }

    }


}

function setSharesStorage() {

    refShares.on("value", gotData, errorData);
    function gotData(data) {
        var shares = data.val();
        localStorage.setItem("shares", shares);
    }
    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}


function setDateStorage() {

    refDate.on("value", gotData, errorData);
    function gotData(data) {
        var date = data.val();
        localStorage.setItem("date", date);


    }
    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}


function setPriceStorage() {
    refPrice.on("value", gotData, errorData);
    function gotData(data) {
        price = data.val();
        localStorage.setItem("price", price);

    }

    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}

function setBoughtStorage() {
    refBought.on("value", gotData, errorData);
    function gotData(data) {
        var bought = data.val();
        localStorage.setItem("bought", JSON.stringify(bought));
    }
    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}

function buyicon() {
    var x = document.getElementById("buyId");
    var buy = document.getElementById("buynavId");
    var home = document.getElementById("homenavId");
    var view = document.getElementById("viewnavId");


    var darkermenu = document.getElementById("darkermenu1");


    if (x.style.display === "block") {
        x.style.animation = "buydown 0.3s";
        setTimeout(set, 250);
        function set() {
            x.style.display = "none";
            darkermenu.style.display = "none";
            buy.style.filter = "";
            x.style.animation = "buyup 0.3s";
        }
    } else {
        x.style.display = "block";
        darkermenu.style.display = "block";
        buy.style.filter = "invert(100%) sepia(100%) saturate(13%) hue-rotate(237deg) brightness(104%) contrast(104%)";

    }
}

function usericon() {
    var x = document.getElementById("menuId");
    var body2 = document.getElementById("bodyId");
    var body = document.getElementById("body");
    var darkermenu = document.getElementById("darkermenu");
    var menuId = document.getElementById("menuId");

    if (x.style.display === "block") {
        menuId.style.animation = "menudown 0.3s";
        setTimeout(set, 250);
        function set() {
            x.style.display = "none";
            darkermenu.style.display = "none";
            body.style.overflow = "";
            menuId.style.animation = "menuup 0.3s";
        }
    } else {
        x.style.display = "block";
        darkermenu.style.display = "block";
        body.style.overflow = "hidden";
    }
}

function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

function equalsArray(value, array) {
    for (let i in array) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}


function groupBoughtStorage() {

    var array = JSON.parse(localStorage.getItem("bought"));
    var dict = [];
    var arrayLoop = [];
    for (let i in array) {
        var iValue = array[i];
        if (!equalsArray(iValue, arrayLoop)) {


            var iCount = getOccurrence(array, iValue)
            dict.push({
                price: iValue,
                amount: iCount
            });
            arrayLoop.push(iValue);
        }
    }

    localStorage.setItem("boughtDict", JSON.stringify(dict));
}





function setHtml(page) {

    if (page == "index") {
        arrowRotation();
        setGraphHtml();

        document.getElementById("profitId").innerHTML = "Profit: €" + localStorage.getItem("profit");
        document.getElementById("sharesId").innerHTML = "Shares: " + localStorage.getItem("shares");
        document.getElementById("priceId").innerHTML = "Current price: €" + localStorage.getItem("price");
        document.getElementById("dateId").innerHTML = "Updated: " + localStorage.getItem("date");
        document.getElementById("updateId").innerHTML = "Last updated: " + localStorage.getItem("update");
        document.getElementById("buyinfo").innerHTML = "Current price: € " + localStorage.getItem("price");
    }
    else {
        setViewHtml()
        document.getElementById("updateId").innerHTML = "Last updated: " + localStorage.getItem("update");
        document.getElementById("buyinfo").innerHTML = "Current price: € " + localStorage.getItem("price");
    }



}


function isMissing() {
    if (localStorage.getItem("bought") == null || localStorage.getItem("profit") == null || localStorage.getItem("shares") == null || localStorage.getItem("price") == null || localStorage.getItem("date") == null || localStorage.getItem("graphInfo") == null || localStorage.getItem("update") == null) {
        return true

    }
    return false

}


function setUp(page) {


    if (isUpdate() || isMissing()) {
        setUpdateStorage();
        setPriceStorage();
        setDateStorage();
        setSharesStorage();
        setProfitStorage();
        setGrapInfoStorage();
        setBoughtStorage();
    }
    groupBoughtStorage()
    setHtml(page);
}