/* =========================================================
   VILLAGE WALA ACADEMY
   COURSES PAGE JAVASCRIPT
   ========================================================= */

/* =========================================================
   STORAGE KEYS
   ========================================================= */

const CART_KEY = "academyCart";
const ADMIN_COURSES_KEY = "adminCourses";

/* =========================================================
   DEFAULT COURSE DATA
   ========================================================= */

const defaultCourses = [
  {
    id: "course1",
    title: "HTML & CSS Complete Course",
    category: "web",
    categoryName: "Web Development",
    level: "Beginner",
    instructor: "Village Wala Academy",
    rating: "4.9",
    reviews: 120,
    lessons: 25,
    duration: "8 Hours",
    price: 499,
    oldPrice: 999,
    imageText: "HTML & CSS",
    description:
      "Learn HTML and CSS from beginner to advanced level and build responsive websites.",
  },

  {
    id: "course2",
    title: "JavaScript Complete Course",
    category: "javascript",
    categoryName: "JavaScript",
    level: "Intermediate",
    instructor: "Village Wala Academy",
    rating: "4.8",
    reviews: 95,
    lessons: 35,
    duration: "12 Hours",
    price: 699,
    oldPrice: 1499,
    imageText: "JavaScript",
    description:
      "Learn JavaScript fundamentals, DOM, events, functions and practical projects.",
  },

  {
    id: "course3",
    title: "React JS Complete Course",
    category: "react",
    categoryName: "React JS",
    level: "Advanced",
    instructor: "Village Wala Academy",
    rating: "4.9",
    reviews: 85,
    lessons: 40,
    duration: "15 Hours",
    price: 999,
    oldPrice: 1999,
    imageText: "React JS",
    description:
      "Learn React JS and build modern interactive web applications.",
  },

  {
    id: "course4",
    title: "Figma UI/UX Design Course",
    category: "design",
    categoryName: "UI/UX Design",
    level: "Beginner",
    instructor: "Village Wala Academy",
    rating: "4.7",
    reviews: 65,
    lessons: 20,
    duration: "7 Hours",
    price: 599,
    oldPrice: 1199,
    imageText: "Figma UI/UX",
    description:
      "Learn Figma and create professional UI/UX designs and prototypes.",
  },
];

/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const courseSearch = document.getElementById("courseSearch");

const coursesGrid = document.getElementById("coursesGrid");

const noResults = document.getElementById("noResults");

const filterButtons = document.querySelectorAll(".filter-btn");

const cartCount = document.getElementById("cartCount");

/* =========================================================
   SELECTED CATEGORY
   ========================================================= */

let selectedCategory = "all";

/* =========================================================
   CATEGORY NAME HELPER
   ========================================================= */

function getCategoryName(category) {
  const categoryNames = {
    web: "Web Development",
    javascript: "JavaScript",
    react: "React JS",
    design: "UI/UX Design",
  };

  return categoryNames[category] || "Course";
}

/* =========================================================
   GET DEFAULT COURSE
   ========================================================= */

function getDefaultCourse(courseId) {
  return defaultCourses.find(function (course) {
    return course.id === courseId;
  });
}

/* =========================================================
   GET COURSES FROM LOCAL STORAGE
   ========================================================= */
 function normalizeCategory(category) {
    const value = String(category || "").trim().toLowerCase();

    if (
        value === "web development" ||
        value === "web" ||
        value === "web-development"
    ) {
        return "web";
    }

    if (
        value === "javascript" ||
        value === "java script"
    ) {
        return "javascript";
    }

    if (
        value === "react" ||
        value === "react js" ||
        value === "reactjs"
    ) {
        return "react";
    }

    if (
        value === "design" ||
        value === "ui/ux design" ||
        value === "ui ux design"
    ) {
        return "design";
    }

    return "web";
}


function getCourses() {
  const savedData = localStorage.getItem(ADMIN_COURSES_KEY);

  /* -----------------------------------------
       No admin data
       Use default 4 courses
       ----------------------------------------- */

  if (!savedData) {
    return defaultCourses;
  }

  try {
    const savedCourses = JSON.parse(savedData);

    if (!Array.isArray(savedCourses) || savedCourses.length === 0) {
      return defaultCourses;
    }

    /* -----------------------------------------
           Convert admin course data into
           complete student course data
           ----------------------------------------- */

    return savedCourses.map(function (course) {
      const defaultCourse = getDefaultCourse(course.id);

      const normalizedCategory = normalizeCategory(
        course.category || (defaultCourse ? defaultCourse.category : "web"),
      );

      return {
        id: course.id || "course-" + Date.now(),

        title: course.title || "Untitled Course",

        category: normalizedCategory,

        categoryName:
          course.categoryName ||
          (defaultCourse
            ? defaultCourse.categoryName
            : getCategoryName(normalizedCategory)),

        level:
          course.level || (defaultCourse ? defaultCourse.level : "Beginner"),

        instructor:
          course.instructor ||
          (defaultCourse ? defaultCourse.instructor : "Village Wala Academy"),

        rating: course.rating || (defaultCourse ? defaultCourse.rating : "4.8"),

        reviews: course.reviews || (defaultCourse ? defaultCourse.reviews : 0),

        lessons: course.lessons || (defaultCourse ? defaultCourse.lessons : 0),

        duration:
          course.duration ||
          (defaultCourse ? defaultCourse.duration : "0 Hours"),

        price: Number(course.price) || 0,

        oldPrice:
          Number(course.oldPrice) ||
          (defaultCourse ? defaultCourse.oldPrice : 0),

        imageText:
          course.imageText ||
          (defaultCourse ? defaultCourse.imageText : course.title),

        description:
          course.description ||
          (defaultCourse
            ? defaultCourse.description
            : "Learn practical skills with Village Wala Academy."),
      };
    });
  } catch (error) {
    console.error("Error reading adminCourses:", error);

    return defaultCourses;
  }
}

/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   GET CART
   ========================================================= */

function getCart() {
  const savedCart = localStorage.getItem(CART_KEY);

  if (!savedCart) {
    return [];
  }

  try {
    const cart = JSON.parse(savedCart);

    if (Array.isArray(cart)) {
      return cart;
    }

    return [];
  } catch (error) {
    console.error("Error reading cart:", error);

    return [];
  }
}

/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* =========================================================
   UPDATE CART COUNT
   ========================================================= */

function updateCartCount() {
  if (!cartCount) {
    return;
  }

  const cart = getCart();

  cartCount.textContent = cart.length;
}

/* =========================================================
   CHECK COURSE IN CART
   ========================================================= */

function isCourseInCart(courseId) {
  const cart = getCart();

  return cart.some(function (item) {
    return item.id === courseId;
  });
}

/* =========================================================
   CREATE COURSE CARD
   ========================================================= */

function createCourseCard(course) {
  const price = Number(course.price) || 0;

  const oldPrice = Number(course.oldPrice) || 0;

  const category = course.category || "web";

  const categoryName = course.categoryName || getCategoryName(category);

  const inCart = isCourseInCart(course.id);

  return `

        <div
            class="course-card"
            data-category="${escapeHTML(category)}"
            data-title="${escapeHTML(course.title)}"
        >

            <div class="course-image">

                <div class="course-placeholder">

                    ${escapeHTML(course.imageText || course.title)}

                </div>

                <span class="course-level">

                    ${escapeHTML(course.level || "Beginner")}

                </span>

            </div>


            <div class="course-content">

                <span class="course-category">

                    ${escapeHTML(categoryName)}

                </span>


                <h3>

                    ${escapeHTML(course.title)}

                </h3>


                <p class="instructor">

                    By ${escapeHTML(
                      course.instructor || "Village Wala Academy",
                    )}

                </p>


                <div class="course-rating">

                    ⭐⭐⭐⭐⭐

                    <span>

                        ${escapeHTML(course.rating || "4.8")}

                        (${escapeHTML(course.reviews || 0)})

                    </span>

                </div>


                <div class="course-info">

                    <span>

                        📚 ${escapeHTML(course.lessons || 0)}
                        Lessons

                    </span>


                    <span>

                        ⏱ ${escapeHTML(course.duration || "0 Hours")}

                    </span>

                </div>


                <div class="course-price">

                    <strong>

                        ₹${price}

                    </strong>


                    ${
                      oldPrice > 0
                        ? `
                                <del>
                                    ₹${oldPrice}
                                </del>
                              `
                        : ""
                    }

                </div>


                <div class="course-buttons">

                    <button
                        type="button"
                        class="add-cart-btn ${inCart ? "added" : ""}"
                        data-id="${escapeHTML(course.id)}"
                        ${inCart ? "disabled" : ""}
                    >

                        ${inCart ? "Added ✓" : "Add to Cart"}

                    </button>


                    <a
                        href="course-details.html?id=${encodeURIComponent(
                          course.id,
                        )}"
                        class="details-btn"
                    >

                        View Details

                    </a>

                </div>

            </div>

        </div>

    `;
}

/* =========================================================
   RENDER COURSES
   ========================================================= */

function renderCourses() {
  if (!coursesGrid) {
    return;
  }

  const courses = getCourses();

  const searchValue = courseSearch
    ? courseSearch.value.toLowerCase().trim()
    : "";

  const filteredCourses = courses.filter(function (course) {
    const title = String(course.title || "").toLowerCase();

    const category = String(course.category || "").toLowerCase();

    const categoryName = String(course.categoryName || "").toLowerCase();

    const description = String(course.description || "").toLowerCase();

    /* SEARCH */

    const matchesSearch =
      searchValue === "" ||
      title.includes(searchValue) ||
      category.includes(searchValue) ||
      categoryName.includes(searchValue) ||
      description.includes(searchValue);

    /* CATEGORY */

    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  /* NO RESULT */

  if (filteredCourses.length === 0) {
    coursesGrid.innerHTML = "";

    if (noResults) {
      noResults.style.display = "block";
    }

    return;
  }

  /* HIDE NO RESULT */

  if (noResults) {
    noResults.style.display = "none";
  }

  /* SHOW COURSES */

  coursesGrid.innerHTML = filteredCourses
    .map(function (course) {
      return createCourseCard(course);
    })
    .join("");

  /* RE-ATTACH CART BUTTONS */

  attachCartEvents();
}

/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(courseId, button) {
  const courses = getCourses();

  const course = courses.find(function (item) {
    return item.id === courseId;
  });

  if (!course) {
    alert("Course not found.");

    return;
  }

  let cart = getCart();

  /* -----------------------------------------
       DUPLICATE CHECK
       ----------------------------------------- */

  const alreadyAdded = cart.some(function (item) {
    return item.id === courseId;
  });

  if (alreadyAdded) {
    alert("This course is already in your cart.");

    updateCartCount();

    return;
  }

  /* -----------------------------------------
       ADD COURSE
       ----------------------------------------- */

  cart.push({
    id: course.id,

    title: course.title,

    price: Number(course.price) || 0,

    oldPrice: Number(course.oldPrice) || 0,

    category: course.category,

    categoryName: course.categoryName,

    description: course.description,

    instructor: course.instructor,

    lessons: course.lessons,

    duration: course.duration,
  });

  /* -----------------------------------------
       SAVE
       ----------------------------------------- */

  saveCart(cart);

  /* -----------------------------------------
       UPDATE CART COUNT
       ----------------------------------------- */

  updateCartCount();

  /* -----------------------------------------
       BUTTON
       ----------------------------------------- */

  if (button) {
    button.textContent = "Added ✓";

    button.disabled = true;

    button.classList.add("added");
  }

  alert("Course added to cart successfully.");
}

/* =========================================================
   ATTACH CART BUTTON EVENTS
   ========================================================= */

function attachCartEvents() {
  const addCartButtons = document.querySelectorAll(".add-cart-btn");

  addCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const courseId = this.dataset.id;

      addToCart(courseId, this);
    });
  });
}

/* =========================================================
   SEARCH EVENT
   ========================================================= */

if (courseSearch) {
  courseSearch.addEventListener("input", function () {
    renderCourses();
  });
}

/* =========================================================
   CATEGORY FILTER EVENTS
   ========================================================= */

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    /* Remove active */

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    /* Add active */

    this.classList.add("active");

    /* Selected category */

    selectedCategory = this.dataset.category || "all";

    /* Render */

    renderCourses();
  });
});

/* =========================================================
   INITIAL LOAD
   ========================================================= */

updateCartCount();

renderCourses();

/* =========================================================
   STORAGE CHANGE
   ========================================================= */

window.addEventListener("storage", function (event) {
  /* Admin courses changed */

  if (event.key === ADMIN_COURSES_KEY) {
    renderCourses();
  }

  /* Cart changed */

  if (event.key === CART_KEY) {
    updateCartCount();

    renderCourses();
  }
});

/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    updateCartCount();

    renderCourses();
  }
});

/* =========================================================
   CUSTOM ADMIN COURSE UPDATE EVENT
   ========================================================= */

window.addEventListener("adminCoursesUpdated", function () {
  renderCourses();
});
