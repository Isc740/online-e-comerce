let productData;
document.addEventListener("DOMContentLoaded", async () => {
    await renderProducts();
    listenViewProductBtn();
});

const renderProducts = async () => {
    productData = await fetchItems();
    let elements = "";
    productData.map((item) => elements += createProduct(item));
    document.querySelector(".product-section").innerHTML += elements;
};

const fetchItems = async () => {
    if (sessionStorage.getItem("productData")) {
        return JSON.parse(sessionStorage.getItem("productData"));
    }
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        sessionStorage.setItem("productData", JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error);
    }
};

const listenViewProductBtn = () => {
    buttons = document.querySelectorAll(".product-btn");
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            sessionStorage.setItem("productIndex", index);
            globalThis.location.href = "../views/single-product.html";
        });
    });
};

const createProduct = (item) => {
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
};
