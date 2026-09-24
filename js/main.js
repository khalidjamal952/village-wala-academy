/* =========================================
   VILLAGE WALA ACADEMY
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        // Change hamburger icon
        if (navLinks.classList.contains("active")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }

    });

}


/* =========================================
   CLOSE MOBILE MENU
   WHEN USER CLICKS NAVIGATION LINK
========================================= */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuBtn) {
            menuBtn.textContent = "☰";
        }

    });

});


/* =========================================
   CLOSE MOBILE MENU
   WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", function (event) {

    if (!menuBtn || !navLinks) {
        return;
    }

    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedMenuButton =
        menuBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

    }

});


/* =========================================
   CURRENT YEAR IN FOOTER
========================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   SCROLL TO TOP
========================================= */

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        document.body.classList.add("show-scroll-top");

    } else {

        document.body.classList.remove("show-scroll-top");

    }

});