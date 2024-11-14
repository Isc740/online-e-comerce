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
	let productData = await fetchItems();
	document.querySelector(".product-section").innerHTML = productData
		.map(createProduct)
		.join("");
};

const listenViewProductBtn = () => {
	buttons = document.querySelectorAll(".product-btn");
	buttons.forEach((button, index) => {
		button.addEventListener("click", () => {
			sessionStorage.setItem("productIndex", index + 1);
			globalThis.location.href = "./views/single-product.html";
		});
	});
};

const createProduct = (item) => `
<div class="card" style="width: 22rem;">
  <div class="fluid">
    <img src="${item.image}" class="product-img card-img-top mx-auto my-4" alt="product image">
  </div>
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text">${item.description}</p>
    <div class="justify-content-center d-flex">
      <a class="btn btn-primary product-btn">View product</a>
    </div>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item text-body-secondary">Rating: ${item.rating.rate}</li>
    <li class="list-group-item text-body-secondary">Amount Bought: ${item.rating.count}</li>
    <li class="list-group-item text-success">Price: <strong>${item.price}</strong></li>
  </ul>

</div>`;
