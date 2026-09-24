// ==========================================
// Village Wala Academy
// Student Dashboard JavaScript
// ==========================================

// ==========================================
// LOGIN PROTECTION
// ==========================================

const isLoggedIn = localStorage.getItem("studentLoggedIn");

if (isLoggedIn !== "true") {
  alert("Please login to access your dashboard.");

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
// STUDENT PROFILE
// ==========================================

const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};

// Student Name

const studentName = document.getElementById("studentName");

if (studentName) {
  studentName.textContent = profile.name || "Student";
}

// ==========================================
// COURSE DATA
// ==========================================

const courseData = {
  course1: {
    title: "HTML & CSS Complete Course",
  },

  course2: {
    title: "JavaScript Complete Course",
  },

  course3: {
    title: "React JS Complete Course",
  },

  course4: {
    title: "Figma UI/UX Design Course",
  },
};

// ==========================================
// ADMIN COURSE CONNECTION
// ==========================================

const adminCourses =
  JSON.parse(localStorage.getItem("adminCourses")) || [];

adminCourses.forEach(function (course) {

  courseData[course.id] = {
    title: course.title,
  };

});

// ==========================================
// GET LAST ORDER
// ==========================================

const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));

// ==========================================
// PURCHASED COURSES
// ==========================================

let purchasedCourses =
  JSON.parse(
    localStorage.getItem("purchasedCourses")
  ) || [];

// Keep previous/latest purchased courses also
if (
  purchasedCourses.length === 0 &&
  lastOrder &&
  Array.isArray(lastOrder.courses)
) {
  purchasedCourses = lastOrder.courses;

  localStorage.setItem(
    "purchasedCourses",
    JSON.stringify(purchasedCourses)
  );
}
// ==========================================
// TOTAL COURSES
// ==========================================

const totalCourses = document.getElementById("totalCourses");

if (totalCourses) {
  totalCourses.textContent = purchasedCourses.length;
}

// ==========================================
// CONTINUE LEARNING
// ==========================================

const continueLearningGrid =
  document.querySelector(".continue-learning-grid");

if (continueLearningGrid) {

  continueLearningGrid.innerHTML = "";

  if (purchasedCourses.length === 0) {

    continueLearningGrid.innerHTML = `
      <div class="learning-card">
        <div class="learning-content">
          <span>My Courses</span>
          <h3>No courses yet</h3>
          <p>
            Purchase a course to start learning.
          </p>
          <a href="courses.html" class="dashboard-btn">
            Browse Courses
          </a>
        </div>
      </div>
    `;

  } else {

    purchasedCourses.forEach(function (course) {

      const courseInfo =
        courseData[course.id] || course;

      const title =
        courseInfo.title ||
        course.title ||
        "Course";

      const category =
        courseInfo.category ||
        course.category ||
        "Learning";

      const iconText =
        title.split(" ")[0];
        const progressKey =
  "lectureProgress_" + course.id;

const progress =
  JSON.parse(
    localStorage.getItem(progressKey)
  ) || [];

const completedLessons =
  progress.length;

  let nextLectureIndex = 0;

while (progress.includes(nextLectureIndex)) {
  nextLectureIndex++;
}

const totalLessons = 5;

const progressPercent =
  Math.min(
    Math.round(
      (completedLessons / totalLessons) * 100
    ),
    100
  );

      const learningCard =
        document.createElement("article");

      learningCard.className =
        "learning-card";

      learningCard.innerHTML = `
        <div class="learning-icon">
          ${iconText}
        </div>

        <div class="learning-content">

          <span>${category}</span>

          <h3>${title}</h3>

            <p>
  Progress: ${completedLessons} / ${totalLessons} lectures
  (${progressPercent}% completed)
</p>

<div class="learning-progress">
  <div
    class="learning-progress-bar"
    style="width: ${progressPercent}%"
  ></div>
</div>

          <a
           href="lecture.html?id=${course.id}&lecture=${nextLectureIndex}"
            class="dashboard-btn"
          >
            Continue Learning
          </a>

        </div>
      `;

      continueLearningGrid.appendChild(
        learningCard
      );

    });
  }
}

// ==========================================
// COURSE PROGRESS
// ==========================================

let progressCoursesCount = 0;

let completedCoursesCount = 0;

purchasedCourses.forEach(function (course) {
  const progressKey = "lectureProgress_" + course.id;

  const progress = JSON.parse(localStorage.getItem(progressKey)) || [];

  const completedLessons = progress.length;

  // 5 demo lectures per course

  if (completedLessons > 0 && completedLessons < 5) {
    progressCoursesCount++;
  }

  if (completedLessons >= 5) {
    completedCoursesCount++;
  }
});

// ==========================================
// UPDATE PROGRESS STATS
// ==========================================

const progressCourses = document.getElementById("progressCourses");

if (progressCourses) {
  progressCourses.textContent = progressCoursesCount;
}

const completedCourses = document.getElementById("completedCourses");

if (completedCourses) {
  completedCourses.textContent = completedCoursesCount;
}

// ==========================================
// CERTIFICATE COUNT
// ==========================================

const certificateCount = document.getElementById("certificateCount");

if (certificateCount) {
  certificateCount.textContent = completedCoursesCount;
}

// ==========================================
// RECENT ORDERS
// ==========================================

const ordersTableBody = document.getElementById("ordersTableBody");

if (ordersTableBody) {
  ordersTableBody.innerHTML = "";

  if (!lastOrder) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td colspan="5">
                No orders found.
            </td>
        `;

    ordersTableBody.appendChild(row);
  } else {
    const row = document.createElement("tr");

    const orderDate = new Date(lastOrder.orderDate).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );

    const courseNames = lastOrder.courses
      .map(function (course) {
        return course.title;
      })
      .join(", ");

    row.innerHTML = `

            <td>
                ${lastOrder.orderId || "-"}
            </td>

            <td>
                ${orderDate}
            </td>

            <td>
                ${courseNames || "-"}
            </td>

            <td>
                ₹${lastOrder.total || 0}
            </td>

            <td>
                <span class="order-status">
                    ${lastOrder.status || "Pending"}
                </span>
            </td>

        `;

    ordersTableBody.appendChild(row);
  }
}

// ==========================================
// LOGOUT FUNCTION
// ==========================================

function logoutStudent() {
  localStorage.removeItem("studentLoggedIn");

  alert("You have been logged out successfully.");

  window.location.href = "login.html";
}

// ==========================================
// LOGOUT BUTTON
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("studentLoggedIn");

    alert("You have been logged out successfully.");

    window.location.href = "login.html";
  });
}
