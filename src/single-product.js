document.addEventListener("DOMContentLoaded", () => {
    const productData = JSON.parse(localStorage.getItem("productData"));
    const productIndex = Number.parseInt(
        sessionStorage.getItem("productIndex"),
    );
    displaySingleProduct(productData, productIndex);
    listenCartBtn(productIndex);
});

const listenCartBtn = (productIndex) => {
    document.querySelector(".btn-add-cart").addEventListener("click", () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "{}");
        if (!(productIndex in cartItems)) {
            cartItems[productIndex] = productIndex;
            alert("Se añadió el objeto al carrito!");
        } else {
            alert("El producto ya se encuentra en su carrito.");
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
};

const displaySingleProduct = (productData, productIndex) => {
    productIndex--;
    document.querySelector(".single-product").innerHTML = `
        <div class="product-container single">
            <h2 class="product-title">${productData[productIndex].title}</h2>
            <div class="img-container">
            <img class="product-img" src="${productData[productIndex].image
        }" alt="product image">
            </div>
            <div class="center-container">
                <button class="btn btn-green btn-add-cart">Add to cart</button>
            </div>
            <p>Codigo: <strong>${productData[productIndex].id}</strong></p>
            <p class="product-desc">${productData[productIndex].description}</p>
            <p class="p-rate">Rating:<strong>${productData[productIndex].rating.rate
        }</strong></p>
            <p class="product-amount p-rate">Amount bought:<strong>${productData[productIndex].rating.count
        }</strong></p>
            <p class="p-rate">Price<strong class="product-price">$${productData[productIndex].price
        }</strong></p>
            <div class="center-container">
                <button class="btn btn-black return-btn" onclick="globalThis.location.href='../index.html'">Return</button>
            </div>
        </div>
    `;
};
