
"use strict";

/*
=========================================================
 RANJOS CAPITAL — PREMIUM FASHION STORE
 Currency: Kenyan Shillings (KSh)
 WhatsApp orders: +254 745 303867
 Instagram: @maliksam.0_
=========================================================
*/

const WHATSAPP_NUMBER = "254745303867";
const INSTAGRAM_URL = "https://www.instagram.com/maliksam.0_/";
const CART_STORAGE_KEY = "ranjos_capital_cart_v2";
const WISHLIST_STORAGE_KEY = "ranjos_capital_wishlist_v1";
const MAX_ITEM_QUANTITY = 99;

/* =====================================================
   PRODUCT CATALOGUE
   Change names, prices, sizes and image paths to match
   your real products. Photos belong in the images folder.
===================================================== */

const products = [
  {
    id: 1,
    name: "Oversized T-Shirt",
    category: "Men",
    type: "T-Shirts",
    price: 850,
    image: "images/product-01.jpg",
    tag: "BESTSELLER",
    description: "An everyday essential with a relaxed streetwear fit. Style it with denim, cargos or your favourite sneakers.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 2,
    name: "Graphic T-Shirt",
    category: "Men",
    type: "T-Shirts",
    price: 950,
    image: "images/product-02.jpg",
    tag: "POPULAR",
    description: "Bring character to your everyday rotation with a graphic tee made for casual outfits and modern streetwear.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 3,
    name: "Cargo Pants",
    category: "Men",
    type: "Trousers",
    price: 1800,
    image: "images/product-03.jpg",
    tag: "",
    description: "A utility-inspired silhouette combining everyday comfort with a confident streetwear look.",
    sizes: ["28", "30", "32", "34", "36", "38"]
  },
  {
    id: 4,
    name: "Straight-Leg Denim",
    category: "Men",
    type: "Jeans",
    price: 2000,
    image: "images/product-04.jpg",
    tag: "",
    description: "A versatile denim essential designed to work with tees, shirts, hoodies and sneakers.",
    sizes: ["28", "30", "32", "34", "36", "38"]
  },
  {
    id: 5,
    name: "Women's Fitted Top",
    category: "Women",
    type: "Tops",
    price: 750,
    image: "images/product-05.jpg",
    tag: "",
    description: "A clean, versatile top that works on its own or layered into your everyday look.",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "Two-Piece Set",
    category: "Women",
    type: "Matching Sets",
    price: 2200,
    image: "images/product-06.jpg",
    tag: "STYLE PICK",
    description: "A coordinated look that makes getting dressed easier. Confirm the included pieces and colours before ordering.",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 7,
    name: "Wide-Leg Trousers",
    category: "Women",
    type: "Trousers",
    price: 1700,
    image: "images/product-07.jpg",
    tag: "",
    description: "Relaxed proportions and a clean silhouette for versatile everyday styling.",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 8,
    name: "Denim Jacket",
    category: "Women",
    type: "Jackets",
    price: 2500,
    image: "images/product-08.jpg",
    tag: "",
    description: "A classic layer for cooler evenings, casual outfits and denim-inspired looks.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 9,
    name: "Retro Low-Top Sneakers",
    category: "Sneakers",
    type: "Footwear",
    price: 2800,
    image: "images/product-09.jpg",
    tag: "POPULAR",
    description: "A versatile low-top silhouette to bring your everyday outfits together.",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"]
  },
  {
    id: 10,
    name: "Everyday Running Sneakers",
    category: "Sneakers",
    type: "Footwear",
    price: 3000,
    image: "images/product-10.jpg",
    tag: "",
    description: "A sporty-inspired sneaker for everyday outfits and casual streetwear looks.",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"]
  },
  {
    id: 11,
    name: "Crossbody Bag",
    category: "Accessories",
    type: "Bags",
    price: 1200,
    image: "images/product-11.jpg",
    tag: "",
    description: "A practical finishing touch for carrying your daily essentials.",
    sizes: ["One Size"]
  },
  {
    id: 12,
    name: "Everyday Cap",
    category: "Accessories",
    type: "Headwear",
    price: 650,
    image: "images/product-12.jpg",
    tag: "",
    description: "An easy accessory to complete casual outfits and everyday streetwear.",
    sizes: ["One Size"]
  },
  {
    id: 13,
    name: "Statement Jacket",
    category: "Outerwear",
    type: "Jackets",
    price: 2800,
    image: "images/product-13.jpg",
    tag: "NEW ARRIVAL",
    description: "A standout outer layer for building stronger everyday outfits. Confirm available colours and sizes before ordering.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 14,
    name: "Full Suit Short",
    category: "Formalwear",
    type: "Suits & Sets",
    price: 3500,
    image: "images/product-14.jpg",
    tag: "NEW ARRIVAL",
    description: "A coordinated suit-short look for occasions, events and warm-weather styling. Confirm the included pieces and available sizes before ordering.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  }
];

/* =====================================================
   APPLICATION STATE
===================================================== */

const state = {
  category: "All",
  search: "",
  sort: "featured",
  cart: [],
  wishlist: [],
  modalProductId: null,
  modalSize: "",
  modalQuantity: 1
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [
  ...root.querySelectorAll(selector)
];

/* =====================================================
   DOM REFERENCES
===================================================== */

const productGrid = $("#product-grid");
const resultsCount = $("#results-count");
const emptyState = $("#empty-state");
const filterBar = $("#filter-bar");
const searchPanel = $("#search-panel");
const searchInput = $("#product-search");
const sortSelect = $("#sort-products");
const overlay = $("#overlay");
const cartDrawer = $("#cart-drawer");
const cartItems = $("#cart-items");
const cartEmpty = $("#cart-empty");
const cartFooter = $("#cart-footer");
const cartCount = $("#cart-count");
const drawerCount = $("#drawer-count");
const cartSubtotal = $("#cart-subtotal");
const productModal = $("#product-modal");
const modalContent = $("#modal-content");

/* =====================================================
   GENERAL UTILITIES
===================================================== */

function formatPrice(amount) {
  return "KSh " + Number(amount).toLocaleString("en-KE");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function getProduct(id) {
  return products.find(product => product.id === Number(id));
}

function safeReadStorage(key, fallback = []) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function safeWriteStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn("Browser storage is unavailable.");
  }
}

function saveCart() {
  safeWriteStorage(CART_STORAGE_KEY, state.cart);
}

function saveWishlist() {
  safeWriteStorage(WISHLIST_STORAGE_KEY, state.wishlist);
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function focusElement(selector) {
  const element = $(selector);
  if (element) element.focus();
}

/* =====================================================
   CART AND WISHLIST STORAGE
===================================================== */

function loadCart() {
  const saved = safeReadStorage(CART_STORAGE_KEY, []);

  if (!Array.isArray(saved)) return [];

  return saved.reduce((validItems, item) => {
    const product = getProduct(item.id);
    const quantity = Number(item.quantity);

    if (
      !product ||
      !product.sizes.includes(item.size) ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return validItems;
    }

    const existing = validItems.find(entry =>
      entry.id === product.id && entry.size === item.size
    );

    if (existing) {
      existing.quantity = Math.min(
        MAX_ITEM_QUANTITY,
        existing.quantity + quantity
      );
    } else {
      validItems.push({
        id: product.id,
        size: item.size,
        quantity: Math.min(quantity, MAX_ITEM_QUANTITY)
      });
    }

    return validItems;
  }, []);
}

function loadWishlist() {
  const saved = safeReadStorage(WISHLIST_STORAGE_KEY, []);

  if (!Array.isArray(saved)) return [];

  return [...new Set(
    saved.map(Number).filter(id => Boolean(getProduct(id)))
  )];
}

function isWishlisted(productId) {
  return state.wishlist.includes(Number(productId));
}

function toggleWishlist(productId) {
  const id = Number(productId);

  if (!getProduct(id)) return;

  if (isWishlisted(id)) {
    state.wishlist = state.wishlist.filter(item => item !== id);
    showToast("Removed from your wishlist.");
  } else {
    state.wishlist.push(id);
    showToast("Added to your wishlist.");
  }

  saveWishlist();
  renderProducts();
  updateWishlistButtons();
}

function updateWishlistButtons() {
  $$("[data-wishlist]").forEach(button => {
    const selected = isWishlisted(button.dataset.wishlist);

    button.classList.toggle("is-wishlisted", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.setAttribute(
      "aria-label",
      selected ? "Remove from wishlist" : "Add to wishlist"
    );

    const icon = $(".wishlist-icon", button);
    if (icon) icon.textContent = selected ? "♥" : "♡";
  });

  setText("#wishlist-count", String(state.wishlist.length));
}

/* =====================================================
   PRODUCT FILTERING AND SORTING
===================================================== */

function getVisibleProducts() {
  let visible = [...products];

  if (state.category !== "All") {
    visible = visible.filter(product =>
      product.category === state.category
    );
  }

  if (state.search.trim()) {
    const query = state.search.trim().toLowerCase();

    visible = visible.filter(product => {
      const searchable = [
        product.name,
        product.category,
        product.type,
        product.description,
        product.tag
      ].join(" ").toLowerCase();

      return searchable.includes(query);
    });
  }

  switch (state.sort) {
    case "price-low":
      visible.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      visible.sort((a, b) => b.price - a.price);
      break;

    case "name":
      visible.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "newest":
      visible.sort((a, b) => b.id - a.id);
      break;

    case "featured":
    default:
      visible.sort((a, b) => a.id - b.id);
      break;
  }

  return visible;
}

/* =====================================================
   PRODUCT IMAGE FALLBACKS
===================================================== */

function attachImageFallback(image, placeholder) {
  if (!image) return;

  image.addEventListener("error", () => {
    image.hidden = true;

    if (placeholder) {
      placeholder.hidden = false;
      placeholder.classList.add("show");
    }
  }, { once: true });
}

/* =====================================================
   PREMIUM PRODUCT GRID
===================================================== */

function renderProducts() {
  if (!productGrid) return;

  const visible = getVisibleProducts();

  if (resultsCount) {
    resultsCount.textContent =
      `${visible.length} ${visible.length === 1 ? "product" : "products"}`;
  }

  productGrid.hidden = visible.length === 0;

  if (emptyState) {
    emptyState.hidden = visible.length !== 0;
  }

  productGrid.innerHTML = visible.map(product => {
    const isNew = product.tag === "NEW ARRIVAL";
    const selected = isWishlisted(product.id);

    return `
      <article
        class="product-card ${isNew ? "is-new" : ""}"
        data-product-id="${product.id}"
      >
        <div
          class="product-image-wrap"
          data-open-product="${product.id}"
          role="button"
          tabindex="0"
          aria-label="View ${escapeHTML(product.name)}"
        >
          ${
            product.tag
              ? `<span class="product-tag ${isNew ? "new-tag" : ""}">
                   ${escapeHTML(product.tag)}
                 </span>`
              : ""
          }

          <button
            class="wishlist-button ${selected ? "is-wishlisted" : ""}"
            type="button"
            data-wishlist="${product.id}"
            aria-label="${selected ? "Remove from wishlist" : "Add to wishlist"}"
            aria-pressed="${selected}"
          >
            <span class="wishlist-icon">${selected ? "♥" : "♡"}</span>
          </button>

          <img
            class="product-image"
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
          >

          <div class="product-placeholder">
            <span class="placeholder-mark">R</span>
            <strong>${escapeHTML(product.name)}</strong>
            <small>
              Add your photo at<br>
              ${escapeHTML(product.image)}
            </small>
          </div>

          <button
            class="quick-add"
            type="button"
            data-quick-add="${product.id}"
          >
            QUICK VIEW <span aria-hidden="true">+</span>
          </button>
        </div>

        <div class="product-info">
          <span class="product-category">
            ${escapeHTML(product.category)} / ${escapeHTML(product.type)}
          </span>

          <div class="product-title-line">
            <h3 class="product-title">${escapeHTML(product.name)}</h3>

            <button
              class="product-open"
              type="button"
              data-open-product="${product.id}"
              aria-label="View ${escapeHTML(product.name)}"
            >
              ↗
            </button>
          </div>

          <div class="product-price">${formatPrice(product.price)}</div>
        </div>
      </article>
    `;
  }).join("");

  $$(".product-image", productGrid).forEach(image => {
    attachImageFallback(
      image,
      image.parentElement.querySelector(".product-placeholder")
    );
  });

  updateWishlistButtons();
}

function setCategory(category) {
  state.category = category;

  $$(".filter-button").forEach(button => {
    const active = button.dataset.filter === category;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderProducts();
}

/* =====================================================
   SEARCH AND CATEGORY NAVIGATION
===================================================== */

function openSearch() {
  if (!searchPanel || !searchInput) return;

  searchPanel.classList.toggle("open");

  if (searchPanel.classList.contains("open")) {
    searchInput.focus();
    searchPanel.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
}

function resetProducts() {
  state.category = "All";
  state.search = "";
  state.sort = "featured";

  if (searchInput) searchInput.value = "";
  if (sortSelect) sortSelect.value = "featured";

  setCategory("All");
}

/* =====================================================
   TOAST NOTIFICATIONS
===================================================== */

let toastTimer;

function showToast(message) {
  let toast = $("#store-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "store-toast";
    toast.className = "store-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* =====================================================
   CART CALCULATIONS
===================================================== */

function getCartQuantity() {
  return state.cart.reduce((total, item) =>
    total + item.quantity, 0
  );
}

function getCartSubtotal() {
  return state.cart.reduce((total, item) => {
    const product = getProduct(item.id);

    return total + (
      product ? product.price * item.quantity : 0
    );
  }, 0);
}

/* =====================================================
   CART DISPLAY
===================================================== */

function renderCart() {
  if (!cartItems) return;

  const quantity = getCartQuantity();
  const subtotal = getCartSubtotal();

  if (cartCount) cartCount.textContent = quantity;
  if (drawerCount) drawerCount.textContent = `(${quantity})`;

  if (cartSubtotal) {
    cartSubtotal.textContent = formatPrice(subtotal);
  }

  if (cartEmpty) {
    cartEmpty.hidden = state.cart.length > 0;
  }

  if (cartFooter) {
    cartFooter.hidden = state.cart.length === 0;
  }

  cartItems.innerHTML = state.cart.map((item, index) => {
    const product = getProduct(item.id);

    if (!product) return "";

    return `
      <article class="cart-item">
        <div class="cart-image-wrap">
          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
          >

          <div class="cart-item-placeholder" hidden>R</div>
        </div>

        <div class="cart-item-details">
          <h3>${escapeHTML(product.name)}</h3>
          <p>Size: ${escapeHTML(item.size)}</p>

          <div class="cart-item-price">
            ${formatPrice(product.price * item.quantity)}
          </div>

          <div class="quantity-control">
            <button
              type="button"
              data-cart-change="${index}"
              data-change="-1"
              aria-label="Decrease quantity"
            >−</button>

            <span aria-label="Quantity">${item.quantity}</span>

            <button
              type="button"
              data-cart-change="${index}"
              data-change="1"
              aria-label="Increase quantity"
              ${item.quantity >= MAX_ITEM_QUANTITY ? "disabled" : ""}
            >+</button>
          </div>
        </div>

        <button
          type="button"
          class="remove-item"
          data-remove-item="${index}"
          aria-label="Remove ${escapeHTML(product.name)}"
        >×</button>
      </article>
    `;
  }).join("");

  $$(".cart-item img", cartItems).forEach(image => {
    attachImageFallback(
      image,
      image.parentElement.querySelector(".cart-item-placeholder")
    );
  });

  saveCart();
}

/* =====================================================
   DRAWER AND MODAL CONTROLS
===================================================== */

function syncOverlay() {
  if (!overlay) return;

  const visible =
    Boolean(cartDrawer?.classList.contains("open")) ||
    Boolean(productModal?.classList.contains("open"));

  overlay.classList.toggle("visible", visible);
  document.body.classList.toggle("no-scroll", visible);
}

function openCart() {
  closeProductModal();

  if (!cartDrawer) return;

  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");

  syncOverlay();
}

function closeCart() {
  if (!cartDrawer) return;

  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");

  syncOverlay();
}

/* =====================================================
   PRODUCT QUICK VIEW
===================================================== */

function openProductModal(id) {
  const product = getProduct(id);

  if (!product || !modalContent || !productModal) return;

  closeCart();

  state.modalProductId = product.id;
  state.modalSize = "";
  state.modalQuantity = 1;

  modalContent.innerHTML = `
    <div class="modal-product-layout">
      <div class="modal-product-image-wrap">
        <img
          class="modal-product-image"
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
        >

        <div class="modal-image-placeholder" hidden>
          <span class="placeholder-mark">R</span>
          <strong>${escapeHTML(product.name)}</strong>
          <small>${escapeHTML(product.image)}</small>
        </div>
      </div>

      <div class="modal-product-info">
        <span class="eyebrow">
          ${escapeHTML(product.category)} / ${escapeHTML(product.type)}
        </span>

        <h2>${escapeHTML(product.name)}</h2>

        <div class="modal-product-price">
          ${formatPrice(product.price)}
        </div>

        <p class="modal-product-description">
          ${escapeHTML(product.description)}
        </p>

        <span class="modal-label">SELECT YOUR SIZE</span>

        <div class="size-options">
          ${product.sizes.map(size => `
            <button
              class="size-option"
              type="button"
              data-size="${escapeHTML(size)}"
              aria-pressed="false"
            >${escapeHTML(size)}</button>
          `).join("")}
        </div>

        <span class="modal-label">QUANTITY</span>

        <div class="modal-quantity">
          <button
            type="button"
            data-modal-quantity="-1"
            aria-label="Decrease quantity"
          >−</button>

          <span id="modal-quantity-value">1</span>

          <button
            type="button"
            data-modal-quantity="1"
            aria-label="Increase quantity"
          >+</button>
        </div>

        <button
          class="button button-dark modal-add-button"
          id="modal-add-to-cart"
          type="button"
        >
          ADD TO BAG — ${formatPrice(product.price)}
        </button>

        <p class="modal-note">
          Availability, colours, sizing, delivery fees and payment
          details will be confirmed with Ranjos Capital on WhatsApp.
        </p>
      </div>
    </div>
  `;

  const image = $(".modal-product-image", modalContent);

  attachImageFallback(
    image,
    $(".modal-image-placeholder", modalContent)
  );

  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");

  syncOverlay();
}

function closeProductModal() {
  if (!productModal) return;

  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");

  state.modalProductId = null;
  state.modalSize = "";
  state.modalQuantity = 1;

  syncOverlay();
}

function updateModalButton() {
  const product = getProduct(state.modalProductId);
  const button = $("#modal-add-to-cart");

  if (!product || !button) return;

  button.textContent =
    `ADD TO BAG — ${formatPrice(product.price * state.modalQuantity)}`;

  setText("#modal-quantity-value", String(state.modalQuantity));
}

/* =====================================================
   ADD PRODUCTS TO CART
===================================================== */

function addToCart(productId, size, quantity = 1) {
  const product = getProduct(productId);

  if (!product) return;

  if (!product.sizes.includes(size)) {
    openProductModal(product.id);
    showToast("Please select your size first.");
    return;
  }

  const safeQuantity = Math.max(
    1,
    Math.min(MAX_ITEM_QUANTITY, Number(quantity) || 1)
  );

  const existing = state.cart.find(item =>
    item.id === product.id && item.size === size
  );

  if (existing) {
    existing.quantity = Math.min(
      MAX_ITEM_QUANTITY,
      existing.quantity + safeQuantity
    );
  } else {
    state.cart.push({
      id: product.id,
      size,
      quantity: safeQuantity
    });
  }

  saveCart();
  renderCart();
  closeProductModal();

  showToast(`${product.name} added to your bag.`);
  openCart();
}

/* =====================================================
   CART QUANTITY AND REMOVAL
===================================================== */

function changeCartQuantity(index, amount) {
  const item = state.cart[index];

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    state.cart.splice(index, 1);
  } else {
    item.quantity = Math.min(
      MAX_ITEM_QUANTITY,
      item.quantity
    );
  }

  renderCart();
}

function removeCartItem(index) {
  if (!state.cart[index]) return;

  const product = getProduct(state.cart[index].id);

  state.cart.splice(index, 1);
  renderCart();

  showToast(
    product ? `${product.name} removed from your bag.` :
      "Item removed from your bag."
  );
}

/* =====================================================
   WHATSAPP CHECKOUT
===================================================== */

function buildWhatsAppMessage() {
  const lines = [
    "HELLO RANJOS CAPITAL 👋",
    "I'd like to place an order from your online store.",
    "",
    "MY ORDER",
    "────────────────────"
  ];

  state.cart.forEach((item, index) => {
    const product = getProduct(item.id);

    if (!product) return;

    lines.push(
      `${index + 1}. ${product.name}`,
      `   Size: ${item.size}`,
      `   Quantity: ${item.quantity}`,
      `   Unit price: ${formatPrice(product.price)}`,
      `   Line total: ${formatPrice(product.price * item.quantity)}`,
      ""
    );
  });

  lines.push(
    "────────────────────",
    `SUBTOTAL: ${formatPrice(getCartSubtotal())}`,
    "",
    "Please confirm:",
    "• Product availability",
    "• Available colours, if applicable",
    "• Delivery fee and estimated delivery time",
    "• Payment instructions",
    "",
    "Thank you!",
    "Sent from the Ranjos Capital online store."
  );

  return lines.join("\n");
}

function checkoutOnWhatsApp() {
  if (!state.cart.length) {
    showToast("Your shopping bag is empty.");
    return;
  }

  const message = buildWhatsAppMessage();

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const whatsappWindow = window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

  if (!whatsappWindow) {
    // Useful fallback when the browser blocks pop-up windows.
    window.location.href = url;
  }

  // The order is NOT cleared here. The customer may still need
  // to press Send in WhatsApp and confirm details with Malik.
}

/* =====================================================
   MOBILE NAVIGATION
===================================================== */

function closeMobileMenu() {
  const nav = $("#mobile-nav");
  const toggle = $("#mobile-menu-toggle");

  if (nav) nav.classList.remove("open");

  if (toggle) {
    toggle.textContent = "☰";
    toggle.setAttribute("aria-expanded", "false");
  }
}

function toggleMobileMenu() {
  const nav = $("#mobile-nav");
  const toggle = $("#mobile-menu-toggle");

  if (!nav) return;

  const isOpen = nav.classList.toggle("open");

  if (toggle) {
    toggle.textContent = isOpen ? "×" : "☰";
    toggle.setAttribute("aria-expanded", String(isOpen));
  }
}

/* =====================================================
   OPTIONAL NEWSLETTER FORM
   This only provides a front-end confirmation. It does
   not subscribe anyone without a connected email service.
===================================================== */

function handleNewsletterSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const emailInput = $("input[type='email']", form);

  if (!emailInput || !emailInput.value.trim()) {
    showToast("Please enter your email address.");
    return;
  }

  showToast("Thanks! Newsletter signup needs an email service to go live.");
  form.reset();
}

/* =====================================================
   OPTIONAL BACK-TO-TOP BUTTON
===================================================== */

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =====================================================
   EVENT LISTENERS
===================================================== */

function bindEvents() {
  // Search
  $("#search-toggle")?.addEventListener("click", openSearch);

  searchInput?.addEventListener("input", () => {
    state.search = searchInput.value;
    renderProducts();
  });

  $("#clear-search")?.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = "";
      state.search = "";
      renderProducts();
      searchInput.focus();
    }
  });

  // Sorting
  sortSelect?.addEventListener("change", () => {
    state.sort = sortSelect.value;
    renderProducts();
  });

  // Category filters
  filterBar?.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");

    if (button) setCategory(button.dataset.filter);
  });

  $$("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      setCategory(button.dataset.category);

      $("#shop")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  $$("[data-nav-category]").forEach(link => {
    link.addEventListener("click", () => {
      setCategory(link.dataset.navCategory);
      closeMobileMenu();
    });
  });

  $("#reset-products")?.addEventListener("click", resetProducts);

  // Mobile menu
  $("#mobile-menu-toggle")?.addEventListener(
    "click",
    toggleMobileMenu
  );

  // Cart controls
  $("#open-cart")?.addEventListener("click", openCart);
  $("#close-cart")?.addEventListener("click", closeCart);
  $("#continue-shopping")?.addEventListener("click", closeCart);
  $("#continue-shopping-bottom")?.addEventListener("click", closeCart);
  $("#checkout-button")?.addEventListener(
    "click",
    checkoutOnWhatsApp
  );

  // Modal controls
  $("#close-modal")?.addEventListener("click", closeProductModal);

  overlay?.addEventListener("click", () => {
    closeCart();
    closeProductModal();
  });

  // Product grid: quick view, wishlist and product details
  productGrid?.addEventListener("click", event => {
    const wishlistButton = event.target.closest("[data-wishlist]");

    if (wishlistButton) {
      event.stopPropagation();
      toggleWishlist(wishlistButton.dataset.wishlist);
      return;
    }

    const quickAdd = event.target.closest("[data-quick-add]");

    if (quickAdd) {
      event.stopPropagation();
      openProductModal(quickAdd.dataset.quickAdd);
      return;
    }

    const openButton = event.target.closest("[data-open-product]");

    if (openButton) {
      openProductModal(openButton.dataset.openProduct);
    }
  });

  // Keyboard accessibility for product image cards
  productGrid?.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const target = event.target.closest("[data-open-product]");

    if (target && target.tagName !== "BUTTON") {
      event.preventDefault();
      openProductModal(target.dataset.openProduct);
    }
  });

  // Product modal controls
  modalContent?.addEventListener("click", event => {
    const sizeButton = event.target.closest("[data-size]");

    if (sizeButton) {
      state.modalSize = sizeButton.dataset.size;

      $$(".size-option", modalContent).forEach(button => {
        const selected = button === sizeButton;

        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });

      return;
    }

    const quantityButton = event.target.closest("[data-modal-quantity]");

    if (quantityButton) {
      const change = Number(quantityButton.dataset.modalQuantity);

      state.modalQuantity = Math.max(
        1,
        Math.min(
          MAX_ITEM_QUANTITY,
          state.modalQuantity + change
        )
      );

      updateModalButton();
      return;
    }

    if (event.target.closest("#modal-add-to-cart")) {
      if (!state.modalSize) {
        showToast("Select your size before adding to your bag.");
        return;
      }

      addToCart(
        state.modalProductId,
        state.modalSize,
        state.modalQuantity
      );
    }
  });

  // Cart item controls
  cartItems?.addEventListener("click", event => {
    const changeButton = event.target.closest("[data-cart-change]");

    if (changeButton) {
      changeCartQuantity(
        Number(changeButton.dataset.cartChange),
        Number(changeButton.dataset.change)
      );
      return;
    }

    const removeButton = event.target.closest("[data-remove-item]");

    if (removeButton) {
      removeCartItem(Number(removeButton.dataset.removeItem));
    }
  });

  // Newsletter (only if a form with this ID exists)
  $("#newsletter-form")?.addEventListener(
    "submit",
    handleNewsletterSubmit
  );

  // Back to top (only if this button exists)
  $("#back-to-top")?.addEventListener("click", scrollToTop);

  // Escape key closes overlays and mobile navigation
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeCart();
      closeProductModal();
      closeMobileMenu();
    }
  });

  // Keep navigation closed after selecting a mobile link
  $$("#mobile-nav a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Instagram links use the configured profile
  $$('a[data-instagram-link]').forEach(link => {
    link.href = INSTAGRAM_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

/* =====================================================
   INITIALIZE STORE
===================================================== */

function init() {
  // Load saved customer choices
  state.cart = loadCart();
  state.wishlist = loadWishlist();

  // Draw the initial store
  renderProducts();
  renderCart();
  updateWishlistButtons();

  // Dynamic copyright year
  setText("#current-year", String(new Date().getFullYear()));

  // Ensure the cart and modal begin closed
  cartDrawer?.classList.remove("open");
  productModal?.classList.remove("open");

  cartDrawer?.setAttribute("aria-hidden", "true");
  productModal?.setAttribute("aria-hidden", "true");

  syncOverlay();
  bindEvents();

  // Apply current Instagram link to any marked link
  $$('a[data-instagram-link]').forEach(link => {
    link.href = INSTAGRAM_URL;
  });

  console.info("Ranjos Capital premium store initialized.");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
