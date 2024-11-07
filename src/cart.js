document.addEventListener("DOMContentLoaded", () => {
    productData = JSON.parse(localStorage.getItem("productData"));
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "{}");

    if (Object.keys(cartItems).length === 0) {
        return;
    }

    renderCartProducts(productData, cartItems);
    listenRemoveCartItem(productData, cartItems);
});

const renderCartProducts = (productData, cartItems) => {
    const cartProducts = productData.filter((product) =>
        product.id in cartItems
    );

    document.querySelector(".cart-container").innerHTML = cartProducts.map(
        (product) => createCartProduct(product),
    ).join("");
};

const listenRemoveCartItem = (productData, cartItems) => {
    document.querySelector(".cart-container").addEventListener(
        "click",
        (e) => {
            if (e.target.classList.contains("btn-remove-cart")) {
                const productId = e.target.dataset.productId;
                console.log("Removing product with ID:", productId);
                delete cartItems[productId];
                console.log("Updated cartItems:", cartItems);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                renderCartProducts(productData, cartItems);
            }
        },
    );
};

const createCartProduct = (product) => `
        <div class="cart-product-container ">
            <img class="product-img cart-img" src="${product.image}" alt="product image">
            <h2 class="product-title">${product.title}</h2>
            <p class="p-rate">Price: <strong class="product-price"> $${product.price}</strong></p>
            <div class="center-container">
                <button class="btn btn-red btn-remove-cart" data-product-id="${product.id}">Remove</button>
            </div>
        </div>
    `;
