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
    new Product("Coka Cola", 2.00),
    new Product("Cola zero", 2.00),
    new Product("Water", 2.00),
    new Product("Bruiswater", 2.00),
    new Product("Koffie", 2.00),
    new Product("Thee", 2.00),
    new Product("Crock Monseigneur", 2.00),
];

for (const [key, product] of products.entries()) {
    const div = document.createElement("div");
    div.classList.add("product");
    const left = document.createElement("div");
    const center = document.createElement("div");
    const right = document.createElement("div");

    left.dataset.id = `product_${key}`;
    right.id = `product_${key}`;
    left.innerText = product.getName();

    left.addEventListener("click", () => {
        const element = document.getElementById(left.dataset.id)
        let amount = parseInt(element.innerText);
        amount ++;
        element.innerText = amount;
    });

    right.addEventListener("click", () => {
        let amount = parseInt(right.innerText);
        if (0 !== amount) amount --;
        right.innerText = amount;
    });

    center.innerText = `€ ${product.getPrice()}`;
    right.innerText = 0;
    div.appendChild(left);
    div.appendChild(center);
    div.appendChild(right);
    keyboard.append(div);
}
