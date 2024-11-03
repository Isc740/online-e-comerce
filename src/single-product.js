document.addEventListener("DOMContentLoaded", () => {
    const productData = sessionStorage.getItem("productData");
    const productIndex = sessionStorage.getItem("productIndex");
    document.querySelector(".section").innerHTML += `
        <div class="product-container">
            <h2 class="product-title">${productData[productIndex].title}</h2>
            <img class="product-img" src="${productData[productIndex].image
        }" alt="product image">
            <div class="center-container">
                <button class="product-btn">View Product</button>
            </div>
            <p>Codigo: <strong>${productData[productIndex].id}</strong></p>
            <p class="product-desc">${productData[productIndex].description}</p>
            <p class="p-rate">Rating:<strong>${productData[productIndex].rating.rate
        }</strong></p>
            <p class="p-rate">Amount bought:<strong>${productData[productIndex].rating.count
        }</strong></p>
            <p class="p-rate">Price:<strong class="product-price">$${productData[productIndex].price
        }</strong></p>
        </div>`;
});
