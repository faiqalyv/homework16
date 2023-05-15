let addToCartBtns = document.querySelectorAll('.add-to-cart');
let cartBtn = document.querySelector('.b1');
let removeCartElemsBtn = document.querySelector('.b2');
let carr=document.querySelector('.carr')
let a=document.querySelector('.a')
let b=document.querySelector('.b')
let tworow=document.querySelector('#two-row-body')

document.addEventListener('DOMContentLoaded', function () {
    cartBtn.textContent = `Cart (${localStorage.getItem("numOfItems")})`;
}, false);


class CartItem {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
    
    getTotalPrice() {
        return this.quantity * this.price;
    };
}

let orange = new CartItem('Orange', 0, 0.5);
let banana = new CartItem('Banana', 0, 1.22);
let lemon = new CartItem('Lemon', 0, 5);



addToCartBtns.forEach(function(elem) {
    elem.addEventListener("click", function() {
        numOfItems = localStorage.getItem("numOfItems");
        localStorage.setItem("numOfItems", ++numOfItems);
        
        if (elem.id === 'orange'){
            ++orange.quantity;
        } else if (elem.id === 'banana'){
            ++banana.quantity;
        } else if (elem.id === 'lemon'){
            ++lemon.quantity;
        }
        localStorage.setItem("items", JSON.stringify([orange, banana, lemon]));
        
        cartBtn.textContent = `Cart (${numOfItems})`
    });
});



removeCartElemsBtn.addEventListener("click", function(){
    localStorage.setItem("numOfItems", 0);
    orange.quantity = 0;
    banana.quantity = 0;
    lemon.quantity = 0;
    
    localStorage.setItem("items", JSON.stringify([orange, banana, lemon]));
    cartBtn.textContent = `Cart (${localStorage.getItem("numOfItems")})`
});


$('#cart-items-modal').on('show.bs.modal', function (event) {
    var modal = $(this);
    var cartItems = JSON.parse(localStorage.getItem('items'));
    
    var products_html = ''
    
    for (item of cartItems){
        if (item.quantity > 0){
            products_html += `<div class="col-md-3 ml-auto">
            <div class="carr"> 
            <button class="a" type="button">+</button>
            <button class="main" type="button"></button>
            <button class="b" type="button">-</button>
            </div>
            ${item.name} - ${item.quantity} - ${item.quantity * item.price}
            </div>`
        }
    };
    let itemm=0
    console.log(products_html)
    
    var first_row = document.querySelector('#first-row-body');
    
    first_row.insertAdjacentHTML("afterend", products_html)
    
})

