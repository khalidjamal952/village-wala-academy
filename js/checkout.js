/* =========================================
   CHECKOUT JAVASCRIPT
========================================= */

/* =========================================
   ELEMENTS
========================================= */

const checkoutForm = document.getElementById("checkoutForm");

const checkoutItems = document.getElementById("checkoutItems");

const checkoutSubtotal = document.getElementById("checkoutSubtotal");

const checkoutDiscount = document.getElementById("checkoutDiscount");

const checkoutTotal = document.getElementById("checkoutTotal");

const cartCount = document.getElementById("cartCount");

/* =========================================
   GET CART
========================================= */

function getCart() {
  const savedCart = localStorage.getItem("academyCart");

  if (savedCart) {
    return JSON.parse(savedCart);
  }

  return [];
}

/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount(cart) {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

/* =========================================
   DISPLAY CHECKOUT ITEMS
========================================= */

function displayCheckout() {
  const cart = getCart();

  /* Update navbar cart count */

  updateCartCount(cart);

  /* Clear previous items */

  checkoutItems.innerHTML = "";

  /* Empty cart */

  if (cart.length === 0) {
    checkoutItems.innerHTML = `

            <div class="empty-checkout">

                <p>
                    Your cart is empty.
                </p>

                <a
                    href="courses.html">

                    Browse Courses

                </a>

            </div>

        `;

    checkoutSubtotal.textContent = "₹0";

    checkoutDiscount.textContent = "-₹0";

    checkoutTotal.textContent = "₹0";

    return;
  }

  /* =====================================
       CALCULATE SUBTOTAL
    ====================================== */

  let subtotal = 0;

  cart.forEach(function (course) {
    subtotal += Number(course.price);

    const item = document.createElement("div");

    item.className = "checkout-item";

    item.innerHTML = `

            <div class="checkout-item-title">

                ${course.title}

            </div>

            <div class="checkout-item-price">

                ₹${course.price}

            </div>

        `;

    checkoutItems.appendChild(item);
  });

  /* =====================================
       DISCOUNT
    ====================================== */

  let discount = 0;

  if (subtotal >= 1000) {
    discount = 100;
  }

  /* =====================================
       TOTAL
    ====================================== */

  const total = subtotal - discount;

  /* =====================================
       UPDATE UI
    ====================================== */

  checkoutSubtotal.textContent = `₹${subtotal}`;

  checkoutDiscount.textContent = `-₹${discount}`;

  checkoutTotal.textContent = `₹${total}`;
}

/* =========================================
   FORM SUBMISSION
========================================= */

if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    /* Get cart */

    const cart = getCart();

    /* Check cart */

    if (cart.length === 0) {
      alert("Your cart is empty. Please add a course first.");

      return;
    }

    /* =================================
               GET FORM DATA
            ================================= */

    const fullName = document.getElementById("fullName").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const terms = document.getElementById("terms").checked;

    /* =================================
               BASIC VALIDATION
            ================================= */

    if (fullName.length < 3) {
      alert("Please enter a valid full name.");

      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");

      return;
    }

    if (phone.length < 10) {
      alert("Please enter a valid phone number.");

      return;
    }

    if (!terms) {
      alert("Please accept the terms and conditions.");

      return;
    }

    /* =================================
               PAYMENT METHOD
            ================================= */

    const selectedPayment = document.querySelector(
      'input[name="payment"]:checked',
    );

    const paymentMethod = selectedPayment ? selectedPayment.value : "online";

    /* =================================
               CALCULATE ORDER
            ================================= */

    let subtotal = 0;

    cart.forEach(function (course) {
      subtotal += Number(course.price);
    });

    let discount = 0;

    if (subtotal >= 1000) {
      discount = 100;
    }

    const total = subtotal - discount;

    /* =================================
               CREATE ORDER
            ================================= */

    const order = {
      orderId: "VWA" + Date.now(),

      customer: {
        name: fullName,

        email: email,

        phone: phone,
      },

      courses: cart,

      subtotal: subtotal,

      discount: discount,

      total: total,

      paymentMethod: paymentMethod,

      orderDate: new Date().toISOString(),

      status: "Pending",
    };

    /* =================================
               SAVE ORDER
            ================================= */

    localStorage.setItem("lastOrder", JSON.stringify(order));

     // =========================================
// SAVE ALL PURCHASED COURSES
// =========================================

const savedPurchasedCourses =
  JSON.parse(
    localStorage.getItem("purchasedCourses")
  ) || [];

cart.forEach(function (course) {

  const alreadyPurchased =
    savedPurchasedCourses.some(function (savedCourse) {
      return savedCourse.id === course.id;
    });

  if (!alreadyPurchased) {
    savedPurchasedCourses.push(course);
  }

});

localStorage.setItem(
  "purchasedCourses",
  JSON.stringify(savedPurchasedCourses)
);


    /* =================================
               CLEAR CART
            ================================= */

    localStorage.removeItem("academyCart");

    /* =================================
               SUCCESS
            ================================= */

    alert("Order placed successfully!");

    /* =================================
               GO TO DASHBOARD
            ================================= */

    window.location.href = "dashboard.html";
  });
}

/* =========================================
   INITIALIZE
========================================= */

displayCheckout();
