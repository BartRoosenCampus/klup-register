"use strict";
import {Product} from "./classes/Product.js";
import {Storage} from "./classes/Storage.js";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered!', reg))
            .catch(err => console.error('Service Worker registration failed:', err));
    });
}

const keyboard = document.getElementById("keyboard");
const overview = document.getElementById("overview");
const btnShowOverview = document.getElementById("show-overview");
const btnShowMenu = document.getElementById("show-menu");
const btnReset = document.getElementById("reset");

const storage = new Storage();
btnShowOverview.addEventListener("click", () => {
    toggleView("overview");
});
btnShowMenu.addEventListener("click", () => {
    toggleView("keyboard");
});

btnReset.addEventListener("click", () => {
    storage.reset();
});



let products = storage.get();

if (null === products) {
    products = [
        new Product("Stella", 2.50),
        new Product("Hoegaarden", 2.50),
        new Product("Coca Cola", 2.00),
        new Product("Cola zero", 2.00),
        new Product("Fanta Lemon", 2.00),
        new Product("Fanta Orange", 2.00),
        new Product("Shweppes tonic", 2.00),
        new Product("Shweppes agrum", 2.00),
        new Product("Ice tea", 2.00),
        new Product("Ice tea peche", 2.00),
        new Product("Rode wijn", 3.00),
        new Product("Witte wijn", 3.00),
        new Product("Rose wijn", 3.00),
        new Product("Cava", 6.00),
        new Product("Water", 2.00),
        new Product("Bruiswater", 2.00),
        new Product("Koffie", 2.00),
        new Product("Thee", 2.00),
        new Product("Crock Monseigneur", 2.00),
        new Product("Cervela", 2.00),
    ];
}

drawTable(products);
createOverview();
toggleView("keyboard")

function drawTable(products) {
    keyboard.innerHTML = ``;

    for (const product of products) {
        const row = document.createElement("div");
        row.classList.add("product");
        const name = document.createElement("div");
        const price = document.createElement("div");
        const amount = document.createElement("div");

        name.innerText = product.getName();
        name.addEventListener("click", () => {
            product.add();
            drawTable(products);
            createOverview();
        });

        amount.addEventListener("click", () => {
            product.subtract();
            drawTable(products);
            createOverview();
        });

        price.innerText = `€ ${product.getPrice()}`;
        amount.innerText = product.getAmount();
        row.appendChild(name);
        row.appendChild(price);
        row.appendChild(amount);
        keyboard.append(row);
    }
    storage.set(products);
}

function createOverview() {
    overview.innerHTML = ``;
    let grandTotal = 0.00;
    for (const product of products) {
        if (0 !== product.getAmount()) {
            grandTotal += parseFloat(product.getTotal());
            const row = document.createElement("div");
            const left = document.createElement("div");
            const right = document.createElement("div");
            row.classList.add("overviewRow");
            left.innerText = `${product.getAmount()} x ${product.getName()}`;
            right.innerText = `= ${product.getTotal()}€`;
            row.append(left);
            row.append(right);
            overview.append(row);
        }
    }
    const row = document.createElement("div");
    const left = document.createElement("div");
    const right = document.createElement("div");
    row.classList.add("totalRow");
    row.classList.add("overviewRow");
    left.innerText = `Totaal:`;
    right.innerText = `= ${grandTotal.toFixed(2)}€`;
    row.append(left);
    row.append(right);
    overview.append(row);
}

function toggleView(id) {
    const views = document.getElementsByClassName("views");

    for (const view of views) {
        view.style.display = "none";
    }

    if (id === "overview") {
        overview.style.display = "block";
    }

    if (id === "keyboard") {
        keyboard.style.display = "block";
    }
}


