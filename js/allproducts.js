const url = "https://www.fronthauk.com/flowerpower/wp-json/wc/store/products";
const sortMenu = document.querySelector("#options");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    listProducts(data);
    // console.log(data);
    sortMenu.addEventListener("change", (e) => {
      sortProducts(data, e);
    });
  })
  .catch((error) => {
    console.error("Shit's wrong yo", error);
  });

function listProducts(products) {
  const out = document.querySelector("ul.products__list");
  let newHtml = "";
  for (product of products) {
    let images = product.images[0];
    let idCheck = product.id ? "product.html?id=" + product.id : "#";
    let imageSrc = images.src || "./media/bouquets.jpg";
    let imageAlt = images.alt || "No alt text found sry";
    let name = product.name || "Plastic Flowers";
    let price = (product.prices.currency_symbol || "$$") + (product.prices.price || "900");

    newHtml += `
    <li class="products__item">
      <a class="products__link" href="${idCheck}">
        <img src="${imageSrc}" alt="${imageAlt}" width="324" height="324" />
        <h2 class="products__title">${name}</h2>
        <span class="products__price">${price}</span>
      </a>
      <a href="${idCheck}" class="products__button">
        View More
      </a>
    </li>`;
  }
  out.innerHTML = newHtml;
}
function sortProducts(products, event) {
  const sortValue = event.target.value;
  if (sortValue === "default") listProducts(products);
  else if (sortValue === "name") {
    let cloneProducts = [...products];
    cloneProducts.sort((a, b) => {
      let first = a.name.toLowerCase();
      let second = b.name.toLowerCase();
      if (first < second) return -1;
      if (first > second) return 1;
      return 0;
    });
    // console.log(cloneProducts);
    listProducts(cloneProducts);
  } else if (sortValue === "price") {
    let cloneProducts = [...products];
    cloneProducts.sort((a, b) => a.prices.price - b.prices.price);
    listProducts(cloneProducts);
  }
}

console.log(document.querySelector("#options").value);
