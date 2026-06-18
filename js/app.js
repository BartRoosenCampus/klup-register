"use strict";
import {Product} from "./classes/Product.js";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered!', reg))
            .catch(err => console.error('Service Worker registration failed:', err));
    });
}

const keyboard = document.getElementById("keyboard");
const overview = document.getElementById("overview");

const products = [
    new Product("Stella", 2.50),
    new Product("Hoegaarden", 2.50),
    new Product("Coca Cola", 2.00),
    new Product("Cola zero", 2.00),
    new Product("Water", 2.00),
    new Product("Bruiswater", 2.00),
    new Product("Koffie", 2.00),
    new Product("Thee", 2.00),
    new Product("Crock Monseigneur", 2.00),
    new Product("Cervela", 2.00),
];

drawTable(products);

function drawTable(products) {
    keyboard.innerHTML = ``;

    for (const product of products) {
        const row = document.createElement("div");
        row.classList.add("product");
        const name = document.createElement("div");
        const price = document.createElement("div");
        const amount = document.createElement("div");
        const total = document.createElement("div");

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
        total.innerText = `€ ${product.getTotal()}`;
        row.appendChild(name);
        row.appendChild(price);
        row.appendChild(amount);
        row.appendChild(total);
        keyboard.append(row);
    }
}

function createOverview() {
    overview.innerHTML = ``;
    let grandTotal = 0.00;
    for (const product of products) {
        if (0 !== product.getAmount()) {
            grandTotal += parseFloat(product.getTotal());
            const row = document.createElement("div");
            row.innerText = `${product.getAmount()} x ${product.getName()} = ${product.getTotal()}`;
            row.classList.add("overviewRow")
            overview.append(row);
        }
    }
    const row = document.createElement("div");
    row.classList.add("totalRow");
    row.classList.add("overviewRow");
    row.innerText = `Totaal: ${grandTotal.toFixed(2)}`;
    overview.append(row);
}
