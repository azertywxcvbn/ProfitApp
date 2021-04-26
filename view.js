function setViewHtml() {
    var bought = localStorage.getItem("boughtDict");
    var data = JSON.parse(bought)
    var result = "";
    for (i in data) {
        result += `
        <tr>
            <td>€${data[i]["price"]}</td>
            <td>${data[i]["amount"]}x</td>
         
        </tr>`;
    }
    console.log(result)
    let table = document.querySelector("table")
    table.innerHTML += result;
}
