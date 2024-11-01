let cachedData;

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
})

async function fetchItems() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function renderProducts() {
    cachedData = await fetchItems();
    let elements = "";
    cachedData.map(item => elements += createProduct(item));
    document.querySelector(".product-section").innerHTML += elements;

    listenViewProduct();
}

function listenViewProduct() {
    buttons = document.querySelectorAll(".product-btn");
    buttons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            console.log(index);
        })
    });
}

function createSingleProduct(data, index) {
    document.geti
    createProduct(data[index]);
    document.querySelector(".product-section") += `
            <div class="center-container">
                <button class="return-btn" onclick="fetchItems()">Return</button>
            </div>
        </div>
    `;
} 

function createProduct(item) {
    return  `
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
    `
}