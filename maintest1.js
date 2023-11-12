// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open cart
cartIcon.onclick = () => {
    cart.classList.add('active');
}

// Close cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}


// Cart working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Making Function
function ready() {
    // Remove Items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }

    // Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged);
    }

    // Add To Cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }

    // Buy Button
    document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click', buyButtonClicked);
}

// Buy Button
function buyButtonClicked() {
    // alert('Your order is placed');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// Remove Items from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add To Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = parseFloat(shopProducts.getElementsByClassName('price')[0].innerText.replace('$', ''));
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

    addProductToUpdateTotal(title, price, productImg);
    updateTotal();
}

function addProductToUpdateTotal(title, price, productImg) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            // alert('You have already added this item to the cart');
            return;
        }
    }

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    // Updated cartShopBoxContent to include dynamic data
    var cartShopBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">
                ${title}
            </div>
            <div class="cart-price">
                $${price.toFixed(2)}
            </div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- Remove cart -->
        <i class="ti ti-trash cart-remove"></i>
    `;

    cartShopBox.innerHTML = cartShopBoxContent;

    // Add event listeners to the new cart item
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    // Add the cart box to the cart content
    cartItems.appendChild(cartShopBox);

    // Update the total
    updateTotal();

    // alert('Item added to cart.');
}

// Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    // If price contains cents value, round to 2 decimal places
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = '$' + total.toFixed(2);
}


// Tengo un problema con el cart (el carrito de compras no desaparece)
// https://www.youtube.com/watch?v=18Jvyp60Vbg&t=1626s&ab_channel=CarpoolVenom









