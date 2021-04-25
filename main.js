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

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



function isUpdate() {
    var update = getCookie("update")
    var updateDate = new Date("1970-01-01 " + update)
    var currentDate = new Date();
    if (update == null) {
        setDateCookies()
    }
    if (updateDate.getHours() + 4 <= currentDate.getHours()) {
        return true;
    }
    return false;
}


function setUpdateCookies() {
    var currentDate = new Date();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    document.cookie = "update=" + time;

}

function setGrapInfoCookies() {
    graphInfo.on("value", gotData, errorData);
    function gotData(data) {
        var data = data.val();
        document.cookie = "graphInfo=" + JSON.stringify(data);
    }
    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}



function arrowRotation() {
    var profit = getCookie("profit")
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

function setProfitCookies() {
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
                console.log("eeee")
                document.cookie = "profit=" + profit.toFixed(2);

            }
        }

    }


}

function setSharesCookies() {

    refShares.on("value", gotData, errorData);
    function gotData(data) {
        var shares = data.val();

        document.cookie = "shares=" + shares;
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


function setDateCookies() {

    refDate.on("value", gotData, errorData);
    function gotData(data) {
        var date = data.val();
        document.cookie = "date=" + date;

    }
    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}




function setPriceCookies() {
    refPrice.on("value", gotData, errorData);
    function gotData(data) {
        price = data.val();
        document.cookie = "price=" + price;
    }

    function errorData(err) {
        console.log("error");
        console.log(err);
    }
}


function setHtml(page) {

    if (page == "index") {
        arrowRotation()
        setGraphHtml()

        document.getElementById("profitId").innerHTML = "Profit: €" + getCookie("profit");
        document.getElementById("sharesId").innerHTML = "Shares: " + getCookie("shares");
        document.getElementById("priceId").innerHTML = "Current price: €" + getCookie("price");
        document.getElementById("dateId").innerHTML = "Updated: " + getCookie("date");
        document.getElementById("dateId").innerHTML = "Updated: " + getCookie("date");
        document.getElementById("updateId").innerHTML = "Last updated: " + getCookie("update");
        document.getElementById("buyinfo").innerHTML = "Current price: € " + getCookie("price");
    }
    else {
        document.getElementById("updateId").innerHTML = "Last updated: " + getCookie("update");
        document.getElementById("buyinfo").innerHTML = "Current price: € " + getCookie("price");
    }


}


function isMissing() {
    if (getCookie("profit") == "" || getCookie("shares") == "" || getCookie("price") == "" || getCookie("date") == "" || getCookie("graphInfo") == "" || getCookie("update") == "") {
        return true

    }
    return false

}


function setUp(page) {
    if (isUpdate() || isMissing()) {
        setUpdateCookies()
        setPriceCookies()
        setDateCookies()
        setSharesCookies()
        setProfitCookies()
        setGrapInfoCookies()
    }


    setHtml(page)






}