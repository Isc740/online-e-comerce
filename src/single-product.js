document.addEventListener("DOMContentLoaded", () => {
    const productData = JSON.parse(localStorage.getItem("productData"));
    const productIndex = Number.parseInt(
        sessionStorage.getItem("productIndex"),
    );
    displaySingleProduct(productData, productIndex);
    listenCartBtn(productIndex);
});

const displaySingleProduct = (productData, productIndex) => {
    productIndex--;
    document.querySelector(".single-product").innerHTML = `
        <div class="product-container single bg-color-2">
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

const listenCartBtn = (productIndex) => {
    document.querySelector(".btn-add-cart").addEventListener("click", () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "{}");
        if (!(productIndex in cartItems)) {
            cartItems[productIndex] = productIndex;
            Swal.fire({
                title: 'Added Product!',
                text: 'The product has been added to the cart!',
                icon: 'success',
                confirmButtonText: 'Return'
              })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'The product is on the cart!',
                icon: 'error',
                confirmButtonText: 'Return'
              })
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
};
