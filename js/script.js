const url = "https://www.fronthauk.com/flowerpower/wp-json/wc/store/products";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log("Success", data);
  })
  .catch((error) => {
    console.error("Shit's wrong yo", error);
  });
