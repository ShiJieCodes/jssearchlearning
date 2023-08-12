let filteredProducts = [...products]; // no diff but is make copy instead of ref

const productsContainer = document.querySelector(".products-container");

const displayProducts = () => {
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
    return;
  }

  productsContainer.innerHTML = filteredProducts
    .map(({ id, title, image, price } = obj) => {
      return `<article class="product" data-id='${id}'>
          <img
            src="${image}"
            alt=""
            class="product-img img"
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">$${price}</span>
          </footer>
        </article>`;
    })
    .join("");
};

displayProducts();

// text filter

const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value;
  filteredProducts = products.filter((stuff) => {
    return stuff.title.toLowerCase().includes(inputValue);
  });
  displayProducts();
});

// Filter buttons

const companiesDOM = document.querySelector(".companies");
const displayButtons = () => {
  const buttons = ["all", ...new Set(products.map((i) => i.company))];
  companiesDOM.innerHTML = buttons
    .map((company) => {
      return `<button class='company-btn' data-id='${company}'>${company}</button>`;
    })
    .join("");
};
displayButtons();

// filter function

companiesDOM.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("company-btn")) {
    if (el.dataset.id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === el.dataset.id;
      });
    }
    searchInput.value = "";
    displayProducts();
  }
});
