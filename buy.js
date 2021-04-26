var refBought = database.ref("bought");

function test() {

    var input = document.querySelector('#inputid').value;
    var price = localStorage.getItem("price");

    var amountNow = localStorage.getItem("shares")
    var boughtNow1 = localStorage.getItem("bought")
    var boughtNow = JSON.parse(boughtNow1)
    console.log(boughtNow)
    var shares = Number(amountNow) + Number(input)
    var now = boughtNow.length

    toDatabase()
    function toDatabase() {
        firebase.database().ref('/').update({

            "amount": shares
        });

        for (i = 0; i < Number(input); i++) {
            console.log("ee")
            now += i
            firebase.database().ref('/bought/' + now).update({
                price: Number(price)

            });
        }

    }
    setUpdateStorage();
    setPriceStorage();
    setDateStorage();
    setSharesStorage();
    setProfitStorage();
    setGrapInfoStorage();
    setBoughtStorage();



}