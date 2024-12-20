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
	const cartProducts = productData.filter((product) => product.id in cartItems);

	const tableBody = document.querySelector(".cart-table-body");
	tableBody.innerHTML = "";

	cartProducts.forEach((product) => {
		const row = document.createElement("tr");
		row.innerHTML = `
            <th scope="row"><img src="${product.image}" class="cart-product-img" alt="product image" width="50"></th>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td class=""><button class="btn btn-danger btn-remove-cart" data-product-id="${product.id}">Remove</button></td>
        `;
		tableBody.appendChild(row);
	});

	//document.querySelector(".cart-container").innerHTML = cartProducts
	//	.map((product) => createCartProduct(product))
	//	.join("");
};

const listenRemoveCartItem = (productData, cartItems) => {
	document.querySelector(".cart-table-body").addEventListener("click", (e) => {
		if (e.target.classList.contains("btn-remove-cart")) {
			Swal.fire({
				title: "Are you sure?",
				text: "The product will be removed from the cart!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, remove it!",
			}).then((result) => {
				if (result.isConfirmed) {
					const productId = e.target.dataset.productId;
					delete cartItems[productId];

					Swal.fire({
						title: "Deleted!",
						text: "Your product has been removed.",
						icon: "success",
					});
				}
				localStorage.setItem("cartItems", JSON.stringify(cartItems));
				renderCartProducts(productData, cartItems);
			});
		}
	});
};

const createCartProduct = (product) => `
        <div class="cart-product-container">
            <div class="cart-product-left">
                <img class="product-img cart-img" src="${product.image}" alt="product image">
                <h4 class="product-title">${product.title}</h2>
            </div>
            <div class="cart-product-left cart-product-div">
                <h5 class="p-rate">Price:<br> <strong class="product-price">$${product.price}</strong></h3>
                <button class="btn btn-danger btn-remove-cart" data-product-id="${product.id}">Remove</button>
            </div>
        </div>
    `;
