document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});

let productData;

async function fetchItems() {
    if (productData) {
        return productData;
    }

    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function renderProducts() {
    productData = await fetchItems();
    console.log(productData);
    let elements = "";
    productData.map((item) => elements += createProduct(item));
    document.querySelector(".product-section").innerHTML += elements;
    listenViewProduct();
}

function listenViewProduct() {
    buttons = document.querySelectorAll(".product-btn");
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            sessionStorage.setItem("productIndex", index);
            sessionStorage.setItem("productData", productData);
            globalThis.location.href = "../views/single-product.html";
        });
    });
}

function createProduct(item) {
    return `
    <div class="product-container">
            <h2 class="product-title">${item.title}</h2>
            <img class="product-img" src="${item.image}" alt="product image">
            <div class="center-container">
                <button class="product-btn">View Product</button>
            </div>
            <p>Codigo: <strong>${item.id}</strong></p>
            <p class="product-desc">${item.description}</p>
            <p class="p-rate">Rating:<strong>${item.rating.rate}</strong></p>
            <p class="p-rate">Amount bought:<strong>${item.rating.count}</strong></p>
            <p class="p-rate">Price:<strong class="product-price">$${item.price}</strong></p>
        </div>
    `;
}
