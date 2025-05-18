// === script.js ===

const API_BASE = "/api";

// SEND OTP (placeholder, no backend integration yet)
function sendOTP() {
  const email = document.getElementById('email').value;
  if (!email) {
    alert("Please enter your email.");
    return;
  }
  document.getElementById('loader').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('status').innerText = "OTP sent to " + email;
    document.getElementById('otp-section').style.display = "block";
  }, 1500);
}

// LOGIN FORM OTP check (placeholder)
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const otp = document.getElementById('otp').value;
      if (otp === "123456") {
        const email = document.getElementById('email').value;
        localStorage.setItem("userEmail", email);
        window.location.href = "home.html";
      } else {
        alert("Invalid OTP");
      }
    });
  }

  // Dark mode on load
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.querySelectorAll('.card').forEach(el => el.classList.add('dark-card'));
  }
});

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  document.querySelectorAll('.card').forEach(el => el.classList.toggle('dark-card'));
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

// CART functions (localStorage based)
function updateCartCount() {
  const email = localStorage.getItem("userEmail");
  if (!email) return;
  const cart = JSON.parse(localStorage.getItem("cart_" + email)) || [];
  $("#cart-count").text(cart.length);
}

function addToCart(product) {
  const email = localStorage.getItem("userEmail");
  if (!email) return alert("Please log in first.");
  let cart = JSON.parse(localStorage.getItem("cart_" + email)) || [];
  cart.push(product);
  localStorage.setItem("cart_" + email, JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart.`);
}

function loadCartPage() {
  const email = localStorage.getItem("userEmail");
  if (!email) return;
  const cart = JSON.parse(localStorage.getItem("cart_" + email)) || [];
  const $cartItems = $("#cart-items");
  const $empty = $("#cart-empty");
  const $summary = $("#cart-summary");
  const $total = $("#cart-total");

  if (cart.length === 0) {
    $cartItems.hide();
    $summary.hide();
    $empty.show();
    return;
  }

  let total = 0;
  $cartItems.empty();
  cart.forEach((item, index) => {
    const card = $(`
      <div class="card">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <p><strong>Condition:</strong> ${item.condition}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
      </div>
    `);
    $cartItems.append(card);
    total += parseFloat(item.price.replace('$', ''));
  });

  $total.text(total.toFixed(2));
  $empty.hide();
  $cartItems.show();
  $summary.show();
}

$(document).on("click", ".remove-item", function () {
  const index = $(this).data("index");
  const email = localStorage.getItem("userEmail");
  let cart = JSON.parse(localStorage.getItem("cart_" + email)) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart_" + email, JSON.stringify(cart));
  loadCartPage();
  updateCartCount();
});

$(document).ready(function () {
  updateCartCount();
});

// Show checkout form
$(document).on("click", "#checkout-button", function () {
  $("#checkout-form").slideDown();
});

// PLACE ORDER — send to backend!
$(document).on("click", "#place-order", function () {
  const name = $("#checkout-name").val().trim();
  const address = $("#checkout-address").val().trim();
  const email = localStorage.getItem("userEmail");

  if (!name || !address) {
    alert("Please enter your name and address.");
    return;
  }

  // Unique order ID
  const orderId = "ORD" + Math.floor(Math.random() * 1000000);

  // Cart items from localStorage (still local)
  const cart = JSON.parse(localStorage.getItem("cart_" + email)) || [];

  const orderData = {
    userEmail: email,
    orderId,
    name,
    address,
    items: cart,
    date: new Date().toISOString(),
    placedAt: new Date().toISOString()
  };

  $.ajax({
    url: `${API_BASE}/auth/order`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(orderData),
    success: function () {
      // Clear cart and form
      localStorage.removeItem("cart_" + email);
      updateCartCount();
      $("#checkout-name").val('');
      $("#checkout-address").val('');
      alert("Order placed successfully! Confirmation sent to your email.");
      window.location.href = "account.html";
    },
    error: function (xhr, status, error) {
      alert("Order failed: " + error);
    }
  });
});

let allProducts = [];

$(document).ready(function () {
  updateCartCount();

  // 🔍 Fetch all products once
  $.get("/api/products", function (data) {
    allProducts = data;
  });

  // 🔍 Live search suggestions
  $("#search-bar").on("input", function () {
    const input = $(this).val().toLowerCase();
    const suggestions = $("#suggestions").empty();
    if (!input) return;

    const matches = allProducts.filter(p =>
      p.name.toLowerCase().includes(input)
    );

    matches.forEach(match => {
      const item = $(`<div class="suggestion-item">${match.name}</div>`);
      item.on("click", function () {
        // Redirect to appropriate category page
        window.location.href = `${match.category}.html?product=${encodeURIComponent(match.name)}`;
      });
      suggestions.append(item);
    });
  });

  // 🔍 Close suggestions on outside click
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#search-bar, #suggestions").length) {
      $("#suggestions").empty();
    }
  });
});



// Account page — load user & orders from backend
function loadAccountPage() {
  const email = localStorage.getItem("userEmail");
  if (!email) return;

  $.get(`${API_BASE}/auth/user/${email}`, function (data) {
    if (!data || !data.user) {
      $("#user-info").html(`<p>No user data found.</p>`);
      $("#order-history").html(`<p>No order history found.</p>`);
    } else {
      const user = data.user;
      $("#user-email").text(user.email);
      $("#edit-name").val(user.name || "");
      $("#edit-address").val(user.address || "");

      const orders = data.orders || [];
      if (orders.length === 0) {
        $("#order-history").html(`<p>No order history found.</p>`);
      } else {
        let html = "";
        orders.forEach(order => {
          html += `<p>📦 Order ${order.orderId} – ${new Date(order.date).toLocaleString()}</p>`;
        });
        $("#order-history").html(html);
      }
    }
  });
}

// Save updated user info to backend
$("#save-info").on("click", function () {
  const email = localStorage.getItem("userEmail");
  const name = $("#edit-name").val().trim();
  const address = $("#edit-address").val().trim();
  if (!email || !name || !address) return alert("All fields required.");

  $.ajax({
    url: `${API_BASE}/auth/user/${email}`,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify({ name, address }),
    success: function () {
      alert("Profile updated!");
    },
    error: function () {
      alert("Update failed.");
    }
  });
});

// On account.html load
$(document).ready(function () {
  if (window.location.pathname.includes("account.html")) {
    loadAccountPage();
  }
});
