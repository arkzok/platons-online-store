'use strict'

const CART_NAME = 'cart'
const cartAddTo = document.querySelectorAll('button.cart-add-to')

checkProductInCart()
cartCount()

cartAddTo.forEach(btn => {
    btn.addEventListener('click', event => {
        addToCart(event)
        checkProductInCart()
        cartCount()
    })
})

document.querySelector('.cart-open').addEventListener('click', renderCart)

document.getElementById('clear-cart').addEventListener('click', () => {
    clearCart()
    renderCart()
    checkProductInCart()
    cartCount()
})

function setCartData(data) {
    localStorage.setItem(CART_NAME, JSON.stringify(data))
    return false
}

function getCartData() {
    return JSON.parse(localStorage.getItem(CART_NAME))
}

function clearCart() {
    localStorage.removeItem(CART_NAME)
}

function addToCart(event) {
    const btn = event.target
    const cartData = getCartData() || {}
    btn.disabled = true

    cartData[btn.dataset.product_id] = {
        title: btn.parentElement.querySelector('.card-title').textContent,
        price: +btn.parentElement.querySelector('.card-price').textContent,
        image: btn.parentElement.parentElement.querySelector('img').src
    }

    btn.disabled = setCartData(cartData)
}

function deleteProduct(event) {
    const btn = event.target
    btn.disabled = true
    const cartData = getCartData()
    delete cartData[btn.dataset.product_id]
    btn.disabled = setCartData(cartData)
    renderCart()
    checkProductInCart()
    cartCount()
}

function checkProductInCart() {
    const cartData = getCartData()

    cartAddTo.forEach(btn => {
        if (cartData && cartData.hasOwnProperty(btn.dataset.product_id)) {
            btn.className = 'btn btn-success cart-add-to'
            btn.textContent = 'In cart'
        } else {
            btn.className = 'btn btn-primary cart-add-to'
            btn.textContent = 'Add to cart'
        }
    })
}

function renderCart() {
    const cartData = getCartData()
    let totalPrice = 0
    let cartContent = ''

    if (!cartData || !Object.keys(cartData).length) {
        cartContent = '<h1 class="modal-title fs-5 text-center">Cart is empty</h1>'
    } else {
        cartContent = '<table class="table"><tbody>'

        for (const productID in cartData) {
            const product = cartData[productID]
            totalPrice += product.price
            cartContent += `
                <tr class="text-center">
                    <td class="cart-img-box">
                        <img class="cart-img" src="${product.image}" alt="${product.title}">
                    </td>
                    <td>${product.title}</td>
                    <td>$${product.price}</td>
                    <td>
                        <button data-product_id="${productID}" class="btn btn-danger" onclick="deleteProduct(event)">
                            Delete
                        </button>
                    </td>
                </tr>`
        }
        
        cartContent += `</tbody></table><div>Total Price: $${totalPrice}</div>`
    }

    document.getElementById('cart-body').innerHTML = cartContent
    console.log(cartData)
}

function cartCount() {
    const cartData = getCartData()

    document.getElementById('product-count').textContent = !cartData || !Object.keys(cartData).length ? '' : Object.keys(cartData).length
}