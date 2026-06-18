"use strict";

export class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.amount = 0
        this.total = 0;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price.toFixed(2);
    }

    getAmount() {
        return this.amount;
    }

    getTotal() {
        return this.total.toFixed(2);
    }

    add() {
        this.amount += 1;
        this.resetTotal();
    }

    subtract() {
        if (this.amount > 0) {
            this.amount -= 1;
            this.resetTotal();
        }
    }

    resetTotal() {
        this.total = this.price * this.amount;
    }
}