document.addEventListener("DOMContentLoaded", () => {
	const productData = JSON.parse(localStorage.getItem("productData"));
	const productIndex = Number.parseInt(sessionStorage.getItem("productIndex"));
	displaySingleProduct(productData, productIndex);
	listenCartBtn(productIndex);
});

const displaySingleProduct = (productData, productIndex) => {
	productIndex--;
	document.querySelector(".single-product").innerHTML = `
		<div class="card mb-3" style="width: 40rem;">
			<div class="row g-0">
				<div class="col-md-5 p-2">
					<img src="${productData[productIndex].image}" class="img-fluid card-img-top mx-auto my-4 rounded-start" alt="product image">
				</div>
				<div class="col-md-7 border">
					<div class="card-body">
						<h5 class="card-title">${productData[productIndex].title}</h5>
						<p class="card-text">${productData[productIndex].description}</p>
						<div class="justify-content-center d-flex">
							<a class="btn btn-success btn-add-cart">add to cart</a>
						</div>
					</div>
					<ul class="list-group list-group-flush text-center">
						<li class="list-group-item text-body-secondary">Rating: ${productData[productIndex].rating.rate}</li>
						<li class="list-group-item text-body-secondary">Amount Bought: ${productData[productIndex].rating.count}</li>
						<li class="list-group-item text-success">Price: <strong>${productData[productIndex].price}</strong></li>
					</ul>
				</div>
			</div>
		</div>`;
};

const listenCartBtn = (productIndex) => {
	document.querySelector(".btn-add-cart").addEventListener("click", () => {
		const cartItems = JSON.parse(localStorage.getItem("cartItems") || "{}");
		if (!(productIndex in cartItems)) {
			cartItems[productIndex] = productIndex;
			Swal.fire({
				title: "Added Product!",
				text: "The product has been added to the cart!",
				icon: "success",
				confirmButtonText: "Return",
			});
		} else {
			Swal.fire({
				title: "Error!",
				text: "The product is on the cart!",
				icon: "error",
				confirmButtonText: "Return",
			});
		}

		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	});
};
