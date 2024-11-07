let productData;
document.addEventListener("DOMContentLoaded", async () => {
    await renderProducts();
    listenViewProductBtn();
});

const fetchItems = async () => {
    if (localStorage.getItem("productData")) {
        return JSON.parse(localStorage.getItem("productData"));
    }

    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    localStorage.setItem("productData", JSON.stringify(data));
    return data;
};

const renderProducts = async () => {
    productData = await fetchItems();
    document.querySelector(".product-section").innerHTML = productData.map(
        createProduct,
    ).join("");
};

const listenViewProductBtn = () => {
    buttons = document.querySelectorAll(".product-btn");
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            sessionStorage.setItem("productIndex", index + 1);
            globalThis.location.href = "../views/single-product.html";
        });
    });
};

const createProduct = (item) => `
    <div class="product-container bg-color-2">
        <h2 class="product-title">${item.title}</h2>
        <div class="img-container">
            <img class="product-img" src="${item.image}" alt="product image">
        </div>
        <div class="center-container">
            <button class="btn product-btn">View Product</button>
        </div>
        <p>Codigo: <strong>${item.id}</strong></p>
        <p class="product-desc">${item.description}</p>
        <p class="p-rate">Rating:<strong>${item.rating.rate}</strong></p>
        <p class="p-rate">Amount bought:<strong>${item.rating.count}</strong></p>
        <p class="p-rate">Price:<strong class="product-price">$${item.price}</strong></p>
    </div>`;
