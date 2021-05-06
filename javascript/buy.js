var refBought = database.ref("bought");


function buyShare() {

    var input = document.querySelector('#inputid').value;
    var price = localStorage.getItem("price");

    var amountNow = localStorage.getItem("shares")
    var boughtNow1 = localStorage.getItem("bought")
    var boughtNow = JSON.parse(boughtNow1)

    var shares = Number(amountNow) + Number(input)
    var now = boughtNow.length
    console.log(now)

    toDatabase()
    function toDatabase() {
        firebase.database().ref('/').update({

            "amount": shares
        });

        for (i = 0; i < Number(input); i++) {
            now += i
            firebase.database().ref('/bought/' + now).update({
                price: Number(price)

            });
        }

    }
    setUpdateStorage();
    setSharesStorage();
    setProfitStorage();
    setBoughtStorage();
    // window.location.replace('bought.html');



}