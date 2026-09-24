/* =========================================
   COURSE DETAILS JAVASCRIPT
========================================= */


/* =========================================
   COURSE DATA
========================================= */

const courseData = {

    course1: {
        id: "course1",

        title: "HTML & CSS Complete Course",

        category: "Web Development",

        shortDescription:
            "Learn HTML and CSS from beginner to advanced level and build professional websites.",

        longDescription:
            "This complete HTML and CSS course is designed for beginners who want to learn web development from the ground up. You will learn how websites are structured using HTML and how to create beautiful, responsive designs using CSS.",

        price: 499,

        oldPrice: 999,

        rating: "4.9",

        students: "120 students",

        lessons: "25 Lessons",

        duration: "8 Hours",

        preview: "HTML & CSS"

    },


    course2: {
        id: "course2",

        title: "JavaScript Complete Course",

        category: "JavaScript",

        shortDescription:
            "Master JavaScript fundamentals and learn how to create interactive and dynamic websites.",

        longDescription:
            "Learn JavaScript from the fundamentals to practical web development. Understand variables, functions, arrays, objects, DOM manipulation, events and modern JavaScript concepts.",

        price: 699,

        oldPrice: 1499,

        rating: "4.8",

        students: "95 students",

        lessons: "35 Lessons",

        duration: "12 Hours",

        preview: "JavaScript"

    },


    course3: {
        id: "course3",

        title: "React JS Complete Course",

        category: "React JS",

        shortDescription:
            "Learn React JS and build modern, component-based web applications.",

        longDescription:
            "This React JS course takes you from the basics of React to building real-world applications. Learn components, props, state, hooks, events, forms and React project development.",

        price: 999,

        oldPrice: 1999,

        rating: "4.9",

        students: "85 students",

        lessons: "40 Lessons",

        duration: "15 Hours",

        preview: "React JS"

    },


    course4: {
        id: "course4",

        title: "Figma UI/UX Design Course",

        category: "UI/UX Design",

        shortDescription:
            "Learn Figma and create modern UI/UX designs for websites and applications.",

        longDescription:
            "Learn the fundamentals of UI/UX design using Figma. Create wireframes, layouts, components, prototypes and modern user interfaces for real-world projects.",

        price: 599,

        oldPrice: 1199,

        rating: "4.7",

        students: "65 students",

        lessons: "20 Lessons",

        duration: "7 Hours",

        preview: "Figma UI/UX"

    }

};

const adminCourses =
    JSON.parse(localStorage.getItem("adminCourses")) || [];

adminCourses.forEach(function (course) {
    courseData[course.id] = {
        ...courseData[course.id],
        ...course,
        shortDescription:
            course.shortDescription ||
            course.description ||
            "Learn practical skills with Village Wala Academy.",
        longDescription:
            course.longDescription ||
            course.description ||
            "Learn practical skills with Village Wala Academy.",

            rating: course.rating || "New",
            students: course.students || "0 students",
            lessons: course.lessons || "Coming Soon",
            duration: course.duration || "Coming Soon",
            preview: course.preview || course.title,
    };
});

/* =========================================
   GET COURSE ID FROM URL
========================================= */

const urlParams =
    new URLSearchParams(window.location.search);

const courseId =
    urlParams.get("id");


/* =========================================
   GET COURSE
========================================= */

const selectedCourse =
    courseData[courseId];


/* =========================================
   ELEMENTS
========================================= */

const courseTitle =
    document.getElementById("courseTitle");

const courseCategory =
    document.getElementById("courseCategory");

const shortDescription =
    document.getElementById(
        "courseShortDescription"
    );

const longDescription =
    document.getElementById(
        "courseLongDescription"
    );

const coursePrice =
    document.getElementById("coursePrice");

const courseOldPrice =
    document.getElementById("courseOldPrice");

const previewTitle =
    document.getElementById("previewTitle");

const addCartButton =
    document.getElementById(
        "addDetailsCartBtn"
    );

const buyNowButton =
    document.getElementById("buyNowBtn");

const cartCount =
    document.getElementById("cartCount");


/* =========================================
   DISPLAY COURSE
========================================= */

if (selectedCourse) {

    courseTitle.textContent =
        selectedCourse.title;

    courseCategory.textContent =
        selectedCourse.category;

    shortDescription.textContent =
        selectedCourse.shortDescription;

    longDescription.textContent =
        selectedCourse.longDescription;

    coursePrice.textContent =
        `₹${selectedCourse.price}`;

    courseOldPrice.textContent =
        `₹${selectedCourse.oldPrice}`;

    previewTitle.textContent =
        selectedCourse.preview;

}


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

function updateCartCount() {

    const cart =
        getCart();

    if (cartCount) {

        cartCount.textContent =
            cart.length;

    }

}


/* =========================================
   ADD TO CART
========================================= */

if (addCartButton) {

    addCartButton.addEventListener(
        "click",
        function () {

            if (!selectedCourse) {
                return;
            }


            let cart =
                getCart();


            /* Check duplicate */

            const alreadyAdded =
                cart.some(function (item) {

                    return item.id === selectedCourse.id;

                });


            if (alreadyAdded) {

                alert(
                    "This course is already in your cart."
                );

                return;

            }


            /* Add course */

            cart.push({

                id: selectedCourse.id,

                title: selectedCourse.title,

                price: selectedCourse.price

            });


            /* Save */

            saveCart(cart);


            /* Update */

            updateCartCount();


            /* Button */

            addCartButton.textContent =
                "Added ✓";

            addCartButton.disabled = true;


            alert(
                "Course added to cart successfully!"
            );

        }
    );

}


/* =========================================
   BUY NOW
========================================= */

if (buyNowButton) {

    buyNowButton.addEventListener(
        "click",
        function () {

            if (!selectedCourse) {
                return;
            }


            /*
                For now we save the course
                and move to checkout.
            */

            let cart =
                getCart();


            const alreadyAdded =
                cart.some(function (item) {

                    return item.id === selectedCourse.id;

                });


            if (!alreadyAdded) {

                cart.push({

                    id: selectedCourse.id,

                    title: selectedCourse.title,

                    price: selectedCourse.price

                });

            }


            saveCart(cart);


            window.location.href =
                "checkout.html";

        }
    );

}




/* =========================================
   INITIAL CART COUNT
========================================= */

updateCartCount();


