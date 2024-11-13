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

  document.querySelector(".cart-container").innerHTML = cartProducts
    .map((product) => createCartProduct(product))
    .join("");
};

const listenRemoveCartItem = (productData, cartItems) => {
  document.querySelector(".cart-container").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-remove-cart")) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
        const productId = e.target.dataset.productId;
        delete cartItems[productId];

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
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
