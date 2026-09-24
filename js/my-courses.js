// ==========================================
// Village Wala Academy
// My Courses JavaScript
// ==========================================

// ==========================================
// LOGIN PROTECTION
// ==========================================

const isLoggedIn = localStorage.getItem("studentLoggedIn");

if (isLoggedIn !== "true") {
  alert("Please login to access your courses.");

  window.location.href = "login.html";
}

// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");

  if (!cartCount) return;

  const cart = JSON.parse(localStorage.getItem("academyCart")) || [];

  cartCount.textContent = cart.length;
}

updateCartCount();

// ==========================================
// COURSE DATA
// ==========================================

const courseData = {
  course1: {
    title: "HTML & CSS Complete Course",
    category: "Web Development",
    description:
      "Learn HTML, CSS and responsive web design from beginner to advanced level.",
    preview: "HTML & CSS",
  },

  course2: {
    title: "JavaScript Complete Course",
    category: "JavaScript",
    description:
      "Learn JavaScript fundamentals, DOM manipulation and interactive web development.",
    preview: "JavaScript",
  },

  course3: {
    title: "React JS Complete Course",
    category: "React JS",
    description:
      "Learn React components, props, state, hooks and modern React development.",
    preview: "React JS",
  },

  course4: {
    title: "Figma UI/UX Design Course",
    category: "UI/UX Design",
    description: "Learn Figma and create modern UI/UX designs and prototypes.",
    preview: "Figma",
  },
};
const adminCourses =
  JSON.parse(localStorage.getItem("adminCourses")) || [];

adminCourses.forEach(function (course) {
  courseData[course.id] = {
    title: course.title,
    category: course.category,
    description:
      course.description ||
      "Learn practical skills with Village Wala Academy.",
   preview: course.title.split(" ")[0]
  };
});
// ==========================================
// GET LAST ORDER
// ==========================================

const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
// ==========================================
// ALL PURCHASED COURSES
// ==========================================

const purchasedCourses =
  JSON.parse(
    localStorage.getItem("purchasedCourses")
  ) || [];


// ==========================================
// ELEMENTS
// ==========================================

const coursesGrid = document.getElementById("myCoursesGrid");

const emptyState = document.getElementById("myCoursesEmpty");

// ==========================================
// CHECK PURCHASED COURSES
// ==========================================

if (
  !purchasedCourses ||
  purchasedCourses.length === 0
) {

  if (coursesGrid) {
    coursesGrid.innerHTML = "";
  }

  if (emptyState) {
    emptyState.style.display = "block";
  }

} else {

  if (emptyState) {
    emptyState.style.display = "none";
  }

  renderMyCourses(purchasedCourses);
}

// ==========================================
// RENDER MY COURSES
// ==========================================

function renderMyCourses(purchasedCourses) {
  if (!coursesGrid) return;

  coursesGrid.innerHTML = "";

  purchasedCourses.forEach(function (course) {
    const data = courseData[course.id];

    if (!data) return;

    // ======================================
    // GET LECTURE PROGRESS
    // ======================================

    const progressKey = "lectureProgress_" + course.id;

    const completedLectures =
      JSON.parse(localStorage.getItem(progressKey)) || [];

    // Current demo course has 5 lectures

   const totalLectures = 5;

let progress = Math.round(
  (completedLectures.length / totalLectures) * 100
);

let nextLectureIndex = 0;

while (completedLectures.includes(nextLectureIndex)) {
  nextLectureIndex++;
}

if (progress > 100) {
  progress = 100;
}

    
    // ======================================
    // CARD
    // ======================================

    const card = document.createElement("article");

    card.className = "my-course-card";

    card.innerHTML = `

            <div class="my-course-thumbnail">
                ${data.preview}
            </div>


            <div class="my-course-content">

                <span class="my-course-category">
                    ${data.category}
                </span>


                <h3>
                    ${data.title}
                </h3>


                <p>
                    ${data.description}
                </p>


                <div class="course-progress">

                    <div class="progress-header">

                        <span>
                            Course Progress
                        </span>

                        <strong>
                            ${progress}%
                        </strong>

                    </div>


                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width: ${progress}%"
                        ></div>

                    </div>

                </div>


                <a
                    href="lecture.html?id=${course.id}&lecture=${nextLectureIndex}"
                    class="my-course-btn"
                >
                    ${progress >= 100 ? "Review Course" : "Continue Learning"}
                </a>

            </div>

        `;

    coursesGrid.appendChild(card);
  });
}

// ==========================================
// LOGOUT
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("studentLoggedIn");

    alert("You have been logged out successfully.");

    window.location.href = "login.html";
  });
}
