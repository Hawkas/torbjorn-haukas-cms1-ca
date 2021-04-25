const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("id");

const url = `https://www.fronthauk.com/flowerpower/wp-json/wc/store/products/${id}`;
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    listProduct(data);
    console.log(data);
  })
  .catch((error) => {
    console.error("Shit's wrong yo", error);
  });

function listProduct(product) {
  const out = document.querySelector(".single-product");

  let images = product.images[0];
  let imageSrc = images.src || "./media/bouquets.jpg";
  let imageAlt = images.alt || "No alt text found sry";
  let name = product.name || "Plastic Flowers";
  let price = (product.prices.currency_symbol || "$$") + (product.prices.price || "900");
  let stock = product.is_in_stock ? "yes" : "no";
  let shortDesc = product.short_description.replace(/(<([^>]+)>)/gi, "");
  let longDesc = product.description.replace(/(<([^>]+)>)/gi, "");
  // Snippet on how to strip HTML tags with regex is 'borrowed' from here: https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
  document.title = `${name + " - Flower Power"}`;
  let newHtml = "";
  newHtml += `
    <div class="single-product__topblock">
        <div class="single-product__imagewrap">
            <img src="${imageSrc}" 
            alt="${imageAlt}" 
            class="single-product__image" />
        </div>
        <div class="single-product__text">
        <h1 class="single-product__title">${name}</h1>
        <div class="single-product__stats">
            <p class="single-product__price">${price}</p>
            <p class="single-product__instock">In stock: <span id="${stock}"></span></p>
        </div>
        <p class="single-product__shortdesc">${shortDesc}</p>
        </div>
    </div>
    <div class="single-product__bottomblock">
        <h2>Description</h2>
        <p>
        ${longDesc}
        </p>
  </div>`;
  out.innerHTML = newHtml;
}
