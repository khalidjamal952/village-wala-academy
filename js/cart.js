/* =========================================
   CART JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const cartItemsContainer =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartLayout =
    document.getElementById("cartLayout");

const cartCount =
    document.getElementById("cartCount");

const cartItemCount =
    document.getElementById("cartItemCount");

const subtotalElement =
    document.getElementById("subtotal");

const discountElement =
    document.getElementById("discount");

const totalElement =
    document.getElementById("total");

const checkoutBtn =
    document.getElementById("checkoutBtn");


/* =========================================
   GET CART
========================================= */

function getCart() {

    const savedCart =
        localStorage.getItem("academyCart");

    if (savedCart) {

        return JSON.parse(savedCart);

    }

    return [];

}


/* =========================================
   SAVE CART
========================================= */

function saveCart(cart) {

    localStorage.setItem(
        "academyCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount(cart) {

    if (cartCount) {

        cartCount.textContent =
            cart.length;

    }

}


/* =========================================
   DISPLAY CART
========================================= */

function displayCart() {

    const cart =
        getCart();


    /* Update navbar count */

    updateCartCount(cart);


    /* Empty cart */

    if (cart.length === 0) {

        emptyCart.style.display =
            "block";

        cartLayout.style.display =
            "none";

        return;

    }


    /* Show cart */

    emptyCart.style.display =
        "none";

    cartLayout.style.display =
        "grid";


    /* Clear old items */

    cartItemsContainer.innerHTML =
        "";


    /* Total variables */

    let subtotal = 0;


    /* Create cart items */

    cart.forEach(function (course, index) {

        subtotal +=
            Number(course.price);


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                ${getCourseShortName(course.title)}

            </div>


            <div class="cart-item-content">

                <h3>
                    ${course.title}
                </h3>

                <p>
                    Village Wala Academy
                </p>

                <button
                    class="remove-cart-btn"
                    data-index="${index}">

                    🗑 Remove

                </button>

            </div>


            <div class="cart-item-price">

                ₹${course.price}

            </div>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    /* =====================================
       DISCOUNT
    ====================================== */

    let discount = 0;


    /*
       Demo discount:
       If subtotal is above ₹1000,
       give ₹100 discount.
    */

    if (subtotal >= 1000) {

        discount = 100;

    }


    /* =====================================
       TOTAL
    ====================================== */

    const total =
        subtotal - discount;


    /* Update UI */

    subtotalElement.textContent =
        `₹${subtotal}`;

    discountElement.textContent =
        `-₹${discount}`;

    totalElement.textContent =
        `₹${total}`;


    /* Item count */

    cartItemCount.textContent =
        `${cart.length} ${
            cart.length === 1
                ? "course"
                : "courses"
        }`;


    /* =====================================
       REMOVE BUTTONS
    ====================================== */

    const removeButtons =
        document.querySelectorAll(
            ".remove-cart-btn"
        );


    removeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        button.dataset.index
                    );


                removeCourse(index);

            }
        );

    });


    /* =====================================
       CHECKOUT
    ====================================== */

    if (checkoutBtn) {

        checkoutBtn.onclick =
            function (event) {

                const currentCart =
                    getCart();


                if (currentCart.length === 0) {

                    event.preventDefault();

                    alert(
                        "Your cart is empty."
                    );

                }

            };

    }

}


/* =========================================
   REMOVE COURSE
========================================= */

function removeCourse(index) {

    const cart =
        getCart();


    /* Remove item */

    cart.splice(index, 1);


    /* Save updated cart */

    saveCart(cart);


    /* Refresh cart */

    displayCart();

}


/* =========================================
   COURSE SHORT NAME
========================================= */

function getCourseShortName(title) {

    if (
        title.includes("HTML")
    ) {

        return "HTML & CSS";

    }


    if (
        title.includes("JavaScript")
    ) {

        return "JavaScript";

    }


    if (
        title.includes("React")
    ) {

        return "React JS";

    }


    if (
        title.includes("Figma")
    ) {

        return "Figma";

    }


    return "Course";

}


/* =========================================
   INITIALIZE CART
========================================= */

displayCart();