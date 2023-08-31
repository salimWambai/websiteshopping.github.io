
let basket = [];


let productsAdd = document.querySelectorAll(".product");


productsAdd.forEach(function (product) {

    let propertySelect = product.querySelector("select");

    propertySelect.addEventListener("change", function () {

        let selectedProperty = propertySelect.value;

        updateProducDetails(product, selectedProperty);
    });


    let addToBasketButton = product.querySelector(".add-to-basket");

    addToBasketButton.addEventListener("click", function () {

        let productId = addToBasketButton.dataset.product;
        let selectedProperty = propertySelect.value
        let productPrice = parseInt(product.querySelector(".price").innerHTML.match(/[+-]?\d+(\.\d+)?/g)[0])

        let productObject = {
            id: productId,
            property: selectedProperty,
            price: productPrice
        };

        basket.push(productObject);

        updateBasketTotalPrice();
    });
});

function updateProducDetails(product, property) {

    let productDescription = product.querySelector(".description");
    let productPrice = product.querySelector(".price");

    if (property == "property1") {
        productDescription.innerHTML = "Product with Property 1";
        productPrice.innerHTML = "$44";
    } else if (property == "property2") {
        productDescription.innerHTML = "Product with Property 2";
        productPrice.innerHTML = "$88";
    } else if (property == "property3") {
        productDescription.innerHTML = "Product with Property 3";
        productPrice.innerHTML = "$111";
    }
    let productIndex = basket.findIndex(p => p.id === product.id && p.property === property);
    if (productIndex !== -1) {
        let newPrice = parseInt(productPrice.innerHTML.substring(7));
        basket[productIndex].price = newPrice;
    }
    updateBasketTotalPrice();
}


function updateBasketTotalPrice() {

    let basketTotal = document.querySelector("#total-cost");
    let deliveryCost = document.querySelector("#delivery-cost");
    let grandTotal = document.querySelector("#grand-total");


    let tablePrice = document.querySelector("#tablePrice tbody");
    tablePrice.innerHTML = "";

    let totalCost = 0;
    basket.forEach(function (product) {

        let newRow = document.createElement("tr");
        newRow.innerHTML = `
    <td>Product ${product.id}</td>
    <td>${product.property}</td>
    <td>$ ${product.price}</td>
    <td>1</td>
    <td>$ ${product.price}</td>
    `;
        tablePrice.appendChild(newRow);

        totalCost += product.price;
    });


    basketTotal.innerHTML = "Total Cost: $" + totalCost;


    let deliveryCostValue = 0;
    if (totalCost < 1000) {
        deliveryCostValue = totalCost * 0.1;
    }
    deliveryCost.innerHTML = "Delivery Cost: $" + deliveryCostValue;


    let grandTotalValue = totalCost + deliveryCostValue;
    grandTotal.innerHTML = "Grand Total: $" + grandTotalValue;
}



let checkoutButton = document.querySelector("#checkout-button");

checkoutButton.addEventListener("click", function (e) {
    e.preventDefault();

    let cardName = document.querySelector("#cardName").value;

    if (cardName == "") {
        alert("Please enter your credit card infos before proceeding with the payment.");
        return;
    }

    let totalCost = 0;
    basket.forEach(function (product) {
        totalCost += parseInt(product.price);
    });

    let deliveryCostValue = 0;
    if (totalCost < 1000) {
        deliveryCostValue = totalCost * 0.1;
    }


    let confirmTotalCost = confirm("Total cost you should pay is  $" + totalCost + " and delivery cost is $" + deliveryCostValue + ". Are you sure you want to continue the process?");
    if (confirmTotalCost) {
        alert("Thank you for your payemnt see you soon!");

        basket = [];

        document.querySelector("#total-cost").innerHTML = "Total Cost: $0";
        document.querySelector("#delivery-cost").innerHTML = "Delivery Cost: $0";
        document.querySelector("#grand-total").innerHTML = "Grand Total: $0";

        document.querySelector("#cardName").value = "";


    } else {
        alert("Transaction cancelled");
        basket = [];

        document.querySelector("#total-cost").innerHTML = "Total Cost: $0";
        document.querySelector("#delivery-cost").innerHTML = "Delivery Cost: $0";
        document.querySelector("#grand-total").innerHTML = "Grand Total: $0";

        document.querySelector("#cardName").value = "";
    }

});

let emptyBasketButton = document.querySelector("#empty-button");

emptyBasketButton.addEventListener("click", function () {
    basket = [];

    document.querySelector("#total-cost").innerHTML = "Total Cost: $0";
    document.querySelector("#delivery-cost").innerHTML = "Delivery Cost: $0";
    document.querySelector("#grand-total").innerHTML = "Grand Total: $0";

    document.querySelector("#cardName").value = "";

});