// ==========================================
// ADMIN AUTHENTICATION & DASHBOARD
// ==========================================

// ==========================================
// CART COUNT
// ==========================================

// ================= ADMIN SESSION PROTECTION =================

if (
  document.querySelector(".admin-main") &&
  localStorage.getItem("adminLoggedIn") !== "true"
) {
  window.location.href = "admin-login.html";
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");

  if (!cartCount) return;

  const cart = JSON.parse(localStorage.getItem("academyCart")) || [];

  cartCount.textContent = cart.length;
}

updateCartCount();

// ==========================================
// ADMIN SETUP
// ==========================================

const adminSetupForm = document.getElementById("adminSetupForm");

if (adminSetupForm) {
  adminSetupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("adminSetupName").value.trim();

    const email = document
      .getElementById("adminSetupEmail")
      .value.trim()
      .toLowerCase();

    const password = document.getElementById("adminSetupPassword").value;

    const confirmPassword = document.getElementById(
      "adminConfirmPassword",
    ).value;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");

      return;
    }

    // Email validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");

      return;
    }

    // Password length

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");

      return;
    }

    // Password match

    if (password !== confirmPassword) {
      alert("Passwords do not match.");

      return;
    }

    // ==========================================
    // CHECK EXISTING ADMIN
    // ==========================================

    const existingAdmin = localStorage.getItem("adminAccount");

    if (existingAdmin) {
      alert("An admin account already exists. Please use Admin Login.");

      window.location.href = "admin-login.html";

      return;
    }

    // ==========================================
    // CREATE ADMIN ACCOUNT
    // ==========================================

    const adminAccount = {
      name: name,

      email: email,

      password: password,
    };

    localStorage.setItem("adminAccount", JSON.stringify(adminAccount));

    // ==========================================
    // SUCCESS
    // ==========================================

    alert("Admin account created successfully!");

    window.location.href = "admin-login.html";
  });
}

// ==========================================
// ADMIN LOGIN
// ==========================================

const adminLoginForm = document.getElementById("adminLoginForm");

if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document
      .getElementById("adminEmail")
      .value.trim()
      .toLowerCase();

    const password = document.getElementById("adminPassword").value;

    const rememberMe = document.getElementById("adminRemember");

    // ==========================================
    // BASIC VALIDATION
    // ==========================================

    if (!email || !password) {
      alert("Please enter email and password.");

      return;
    }

    // ==========================================
    // GET ADMIN ACCOUNT
    // ==========================================

    const storedAdmin = localStorage.getItem("adminAccount");

    if (!storedAdmin) {
      alert("No admin account found. Please create an admin account first.");

      window.location.href = "admin-setup.html";

      return;
    }

    const adminAccount = JSON.parse(storedAdmin);

    // ==========================================
    // LOGIN CHECK
    // ==========================================

    if (email !== adminAccount.email || password !== adminAccount.password) {
      alert("Invalid admin email or password.");

      return;
    }

    // ==========================================
    // LOGIN SUCCESS
    // ==========================================

    localStorage.setItem("adminLoggedIn", "true");

    // Remember Me

    if (rememberMe && rememberMe.checked) {
      localStorage.setItem("adminRememberMe", "true");
    } else {
      localStorage.removeItem("adminRememberMe");
    }

    alert("Admin login successful!");

    window.location.href = "admin.html";
  });
}

// ==========================================
// ADMIN DASHBOARD PROTECTION
// ==========================================

const adminPage = document.querySelector(".admin-main");

if (adminPage) {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

  if (isAdminLoggedIn !== "true") {
    alert("Please login as admin first.");

    window.location.href = "admin-login.html";
  }
}

// ==========================================
// ADMIN DASHBOARD DATA
// ==========================================

if (adminPage) {
  // ==========================================
  // COURSE DATA
  // ==========================================

  const courses = [
    {
      id: "course1",
      title: "HTML & CSS Complete Course",
      price: 499,
    },

    {
      id: "course2",
      title: "JavaScript Complete Course",
      price: 699,
    },

    {
      id: "course3",
      title: "React JS Complete Course",
      price: 999,
    },

    {
      id: "course4",
      title: "Figma UI/UX Design Course",
      price: 599,
    },
  ];

  // ==========================================
  // STUDENTS
  // ==========================================

  const studentAccount = localStorage.getItem("studentAccount");

  const totalStudents = studentAccount ? 1 : 0;

  // ==========================================
  // COURSES
  // ==========================================

  // const totalCourses = courses.length;
  const savedAdminCourses =
    JSON.parse(localStorage.getItem("adminCourses")) || [];

  const totalCourses =
    savedAdminCourses.length > 0 ? savedAdminCourses.length : courses.length;

  // ==========================================
  // LAST ORDER
  // ==========================================

  const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));

  const totalOrders = lastOrder ? 1 : 0;

  const totalRevenue = lastOrder ? Number(lastOrder.total) || 0 : 0;

  const totalLiveClasses =
    JSON.parse(localStorage.getItem("adminLiveClasses")) || [];

  const liveClassesCount = totalLiveClasses.length;

  if (document.getElementById("totalLiveClasses")) {
    document.getElementById("totalLiveClasses").textContent = liveClassesCount;
  }

  // ==========================================
  // UPDATE STATISTICS
  // ==========================================

  const totalStudentsElement = document.getElementById("totalStudents");

  const totalCoursesElement = document.getElementById("totalCourses");

  const totalOrdersElement = document.getElementById("totalOrders");

  const totalRevenueElement = document.getElementById("totalRevenue");

  const totalLiveClassesElement = document.getElementById("totalLiveClasses");

  if (totalStudentsElement) {
    totalStudentsElement.textContent = totalStudents;
  }

  if (totalCoursesElement) {
    totalCoursesElement.textContent = totalCourses;
  }

  if (totalOrdersElement) {
    totalOrdersElement.textContent = totalOrders;
  }

  if (totalRevenueElement) {
    totalRevenueElement.textContent = `₹${totalRevenue}`;
  }

  if (totalLiveClassesElement) {
    totalLiveClassesElement.textContent = liveClassesCount;
  }

  // ==========================================
  // RECENT ORDERS
  // ==========================================

  const ordersTableBody = document.getElementById("ordersTableBody");

  if (ordersTableBody) {
    ordersTableBody.innerHTML = "";

    if (!lastOrder) {
      ordersTableBody.innerHTML = `

                <tr>

                    <td colspan="6">

                        No orders found.

                    </td>

                </tr>

            `;
    } else {
      const courseNames = lastOrder.courses
        .map((course) => course.title)
        .join(", ");

      const customerName = lastOrder.customer?.name || "Unknown";

      const customerEmail = lastOrder.customer?.email || "N/A";

      const orderDate = lastOrder.orderDate
        ? new Date(lastOrder.orderDate).toLocaleDateString()
        : "N/A";

      const status = lastOrder.status || "Pending";

      ordersTableBody.innerHTML = `

                <tr>

                    <td>
                        ${lastOrder.orderId}
                    </td>

                    <td>
                        ${customerName}
                    </td>

                    <td>
                        ${customerEmail}
                    </td>

                    <td>
                        ${courseNames}
                    </td>

                    <td>
                        ₹${lastOrder.total}
                    </td>

                    <td>
                        ${status}
                    </td>

                </tr>

            `;
    }
  }
}

// ==========================================
// ADMIN LOGOUT
// ==========================================

const adminLogoutBtn = document.getElementById("adminLogoutBtn");

if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener("click", function () {
    localStorage.removeItem("adminLoggedIn");

    localStorage.removeItem("adminRememberMe");

    alert("Admin logged out successfully.");

    window.location.href = "admin-login.html";
  });
}

// ==========================================
// ADMIN COURSE MANAGEMENT
// ==========================================

const addCourseBtn = document.getElementById("addCourseBtn");

const courseFormContainer = document.getElementById("courseFormContainer");

const courseForm = document.getElementById("courseForm");

const cancelCourseBtn = document.getElementById("cancelCourseBtn");

const adminCourseGrid = document.getElementById("adminCourseGrid");

const adminCourseCount = document.getElementById("adminCourseCount");

const courseFormTitle = document.getElementById("courseFormTitle");

// ==========================================
// COURSE STORAGE
// ==========================================

const defaultAdminCourses = [
  {
    id: "course1",
    title: "HTML & CSS Complete Course",
    category: "Web Development",
    price: 499,
    oldPrice: 999,
    description:
      "Learn HTML and CSS from beginner to advanced level and build professional websites.",
  },

  {
    id: "course2",
    title: "JavaScript Complete Course",
    category: "JavaScript",
    price: 699,
    oldPrice: 1499,
    description:
      "Master JavaScript fundamentals and create interactive and dynamic websites.",
  },

  {
    id: "course3",
    title: "React JS Complete Course",
    category: "React JS",
    price: 999,
    oldPrice: 1999,
    description:
      "Learn React JS and build modern component-based web applications.",
  },

  {
    id: "course4",
    title: "Figma UI/UX Design Course",
    category: "UI/UX Design",
    price: 599,
    oldPrice: 1199,
    description:
      "Learn Figma and create modern UI/UX designs for websites and applications.",
  },
];

let adminCourses = JSON.parse(localStorage.getItem("adminCourses"));

// First time setup

if (!adminCourses) {
  adminCourses = defaultAdminCourses;

  localStorage.setItem("adminCourses", JSON.stringify(adminCourses));
}

// ==========================================
// RENDER COURSES
// ==========================================

function renderAdminCourses() {
  if (!adminCourseGrid) return;

  adminCourseGrid.innerHTML = "";

  if (adminCourses.length === 0) {
    adminCourseGrid.innerHTML = `

            <div class="admin-empty-course">

                <h3>
                    No Courses Found
                </h3>

                <p>
                    Click "Add New Course" to create
                    your first course.
                </p>

            </div>

        `;
  }

  adminCourses.forEach(function (course) {
    const courseCard = document.createElement("div");

    courseCard.className = "admin-course-card";

    courseCard.innerHTML = `

            <div class="admin-course-card-content">

                <span class="admin-course-category">
                    ${course.category}
                </span>

                <h3>
                    ${course.title}
                </h3>

                <p>
                    ${course.description}
                </p>

                <div class="admin-course-price">

                    <strong>
                        ₹${course.price}
                    </strong>

                    ${course.oldPrice ? `<del>₹${course.oldPrice}</del>` : ""}

                </div>

            </div>


            <div class="admin-course-actions">

                <button
                    type="button"
                    class="admin-edit-course"
                    data-id="${course.id}"
                >
                    Edit
                </button>
                  <button
                        type="button"
                        class="admin-manage-lectures"
                        data-id="${course.id}">
                        Manage Lectures
                   </button>
                <button
                    type="button"
                    class="admin-delete-course"
                    data-id="${course.id}"
                >
                    Delete
                </button>

            </div>

        `;

    adminCourseGrid.appendChild(courseCard);
  });

  if (adminCourseCount) {
    adminCourseCount.textContent = `${adminCourses.length} Course${
      adminCourses.length !== 1 ? "s" : ""
    }`;
  }

  // ==========================================
  // EDIT BUTTONS
  // ==========================================

  document.querySelectorAll(".admin-edit-course").forEach(function (button) {
    button.addEventListener("click", function () {
      editCourse(this.dataset.id);
    });
  });

  // ==========================================
  // MANAGE LECTURES BUTTONS
  // ==========================================

  document
    .querySelectorAll(".admin-manage-lectures")
    .forEach(function (button) {
      button.addEventListener("click", function () {
        const courseId = this.dataset.id;

        alert("Manage Lectures: " + courseId);
      });
    });
  document
    .querySelectorAll(".admin-manage-lectures")
    .forEach(function (button) {
      button.addEventListener("click", function () {
        const courseId = this.dataset.id;

        const course = adminCourses.find(function (item) {
          return item.id === courseId;
        });

        if (!course) {
          alert("Course not found.");
          return;
        }

        // Show lecture management section
        const lectureManagement = document.getElementById("lectureManagement");

        lectureManagement.style.display = "block";

        // Course name
        const lectureCourseName = document.getElementById("lectureCourseName");

        lectureCourseName.textContent = "Manage lectures for: " + course.title;

        // Store selected course ID
        document.getElementById("lectureCourseId").value = courseId;

        // Reset lecture form
        document.getElementById("lectureForm").reset();

        document.getElementById("lectureCourseId").value = courseId;
        // Render existing lectures
        renderAdminLectures(courseId);

        //  change for title
        document.getElementById("lectureFormTitle").textContent =
          "Add New Lecture";

        document.getElementById("saveLectureBtn").textContent = "Add Lecture";

        // Scroll to lecture manager
        lectureManagement.scrollIntoView({
          behavior: "smooth",
        });
      });
    });

  // ==========================================
  // LECTURE FORM SUBMIT
  // ==========================================

  const lectureForm = document.getElementById("lectureForm");

  if (lectureForm) {
    lectureForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const courseId = document.getElementById("lectureCourseId").value;

      const lectureId = document.getElementById("lectureId").value;

      const lectureTitle = document.getElementById("lectureTitle").value.trim();

      const lectureDuration = document
        .getElementById("lectureDuration")
        .value.trim();

      const lectureVideo = document.getElementById("lectureVideo").value.trim();

      // Check fields

      if (!courseId || !lectureTitle || !lectureDuration || !lectureVideo) {
        alert("Please fill all lecture fields.");

        return;
      }

      // Find course

      const courseIndex = adminCourses.findIndex(function (course) {
        return course.id === courseId;
      });

      if (courseIndex === -1) {
        alert("Course not found.");

        return;
      }

      // Make sure lectures array exists

      if (!Array.isArray(adminCourses[courseIndex].lectures)) {
        adminCourses[courseIndex].lectures = [];
      }

      // ==========================================
      // UPDATE EXISTING LECTURE
      // ==========================================

      if (lectureId) {
        const lectureIndex = adminCourses[courseIndex].lectures.findIndex(
          function (lecture) {
            return lecture.id === lectureId;
          },
        );

        if (lectureIndex === -1) {
          alert("Lecture not found.");

          return;
        }

        adminCourses[courseIndex].lectures[lectureIndex] = {
          id: lectureId,

          title: lectureTitle,

          duration: lectureDuration,

          video: lectureVideo,
        };

        localStorage.setItem("adminCourses", JSON.stringify(adminCourses));

        alert("Lecture updated successfully!");
      }

      // ==========================================
      // ADD NEW LECTURE
      // ==========================================
      else {
        const newLecture = {
          id: "lecture_" + Date.now(),

          title: lectureTitle,

          duration: lectureDuration,

          video: lectureVideo,
        };

        adminCourses[courseIndex].lectures.push(newLecture);

        localStorage.setItem("adminCourses", JSON.stringify(adminCourses));

        alert("Lecture added successfully!");
      }

      // ==========================================
      // RESET FORM
      // ==========================================

      lectureForm.reset();

      document.getElementById("lectureId").value = "";

      document.getElementById("lectureCourseId").value = courseId;

      document.getElementById("lectureFormTitle").textContent =
        "Add New Lecture";

      document.getElementById("saveLectureBtn").textContent = "Add Lecture";

      // Refresh lecture list

      renderAdminLectures(courseId);
    });
  }

  // ==========================================
  // RENDER LECTURES
  // ==========================================

  function renderAdminLectures(courseId) {
    const lectureGrid = document.getElementById("adminLectureGrid");

    const lectureCount = document.getElementById("adminLectureCount");

    if (!lectureGrid || !lectureCount) {
      return;
    }

    const course = adminCourses.find(function (item) {
      return item.id === courseId;
    });

    if (!course) {
      lectureGrid.innerHTML = "";
      lectureCount.textContent = "0 Lectures";
      return;
    }

    const lectures = Array.isArray(course.lectures) ? course.lectures : [];

    lectureCount.textContent =
      lectures.length + (lectures.length === 1 ? " Lecture" : " Lectures");

    if (lectures.length === 0) {
      lectureGrid.innerHTML = `
      <div class="admin-empty-state">
        <div class="admin-empty-icon">🎥</div>
        <h3>No Lectures Found</h3>
        <p>Add your first lecture for this course.</p>
      </div>
    `;

      return;
    }

    lectureGrid.innerHTML = lectures
      .map(function (lecture, index) {
        return `
        <div class="admin-course-card">

          <div class="admin-course-card-content">

            <span class="admin-label">
              LECTURE ${index + 1}
            </span>

            <h3>${lecture.title}</h3>

            <p>
              Duration: ${lecture.duration}
            </p>

          </div>

          <div class="admin-course-actions">

            <button
              type="button"
              class="admin-edit-lecture"
              data-course-id="${courseId}"
              data-lecture-id="${lecture.id}"
            >
              Edit
            </button>

            <button
              type="button"
              class="admin-delete-lecture"
              data-course-id="${courseId}"
              data-lecture-id="${lecture.id}"
            >
              Delete
            </button>

          </div>

        </div>
      `;
      })
      .join("");
  }

  // ==========================================
  // DELETE BUTTONS
  // ==========================================

  document.querySelectorAll(".admin-delete-course").forEach(function (button) {
    button.addEventListener("click", function () {
      deleteCourse(this.dataset.id);
    });
  });

  // ==========================================
  // DELETE LECTURE
  // ==========================================

  document.addEventListener("click", function (event) {
    if (!event.target.classList.contains("admin-delete-lecture")) {
      return;
    }

    const courseId = event.target.dataset.courseId;
    const lectureId = event.target.dataset.lectureId;

    const courseIndex = adminCourses.findIndex(function (course) {
      return course.id === courseId;
    });

    if (courseIndex === -1) {
      alert("Course not found.");
      return;
    }

    const confirmed = confirm("Are you sure you want to delete this lecture?");

    if (!confirmed) {
      return;
    }

    adminCourses[courseIndex].lectures = adminCourses[
      courseIndex
    ].lectures.filter(function (lecture) {
      return lecture.id !== lectureId;
    });

    localStorage.setItem("adminCourses", JSON.stringify(adminCourses));

    renderAdminLectures(courseId);

    alert("Lecture deleted successfully!");
  });
}

// ==========================================
// EDIT LECTURE
// ==========================================

document.addEventListener("click", function (event) {
  if (!event.target.classList.contains("admin-edit-lecture")) {
    return;
  }

  const courseId = event.target.dataset.courseId;

  const lectureId = event.target.dataset.lectureId;

  const course = adminCourses.find(function (course) {
    return course.id === courseId;
  });

  if (!course) {
    alert("Course not found.");
    return;
  }

  const lecture = course.lectures.find(function (lecture) {
    return lecture.id === lectureId;
  });

  if (!lecture) {
    alert("Lecture not found.");
    return;
  }

  document.getElementById("lectureCourseId").value = courseId;

  document.getElementById("lectureId").value = lectureId;

  document.getElementById("lectureTitle").value = lecture.title;

  document.getElementById("lectureDuration").value = lecture.duration;

  document.getElementById("lectureVideo").value = lecture.video;

  document.getElementById("lectureFormTitle").textContent = "Edit Lecture";

  document.getElementById("saveLectureBtn").textContent = "Update Lecture";

  document.getElementById("lectureFormContainer").scrollIntoView({
    behavior: "smooth",
  });
});

// ==========================================
// OPEN ADD COURSE FORM
// ==========================================

if (addCourseBtn) {
  addCourseBtn.addEventListener("click", function () {
    courseForm.reset();

    document.getElementById("courseId").value = "";

    courseFormTitle.textContent = "Add New Course";

    courseFormContainer.style.display = "block";

    courseFormContainer.scrollIntoView({
      behavior: "smooth",
    });
  });
}

// ==========================================
// CANCEL COURSE FORM
// ==========================================

if (cancelCourseBtn) {
  cancelCourseBtn.addEventListener("click", function () {
    courseForm.reset();

    document.getElementById("courseId").value = "";

    courseFormContainer.style.display = "none";
  });
}

// ==========================================
// SAVE COURSE
// ==========================================

if (courseForm) {
  courseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("courseId").value;

    const title = document.getElementById("courseTitle").value.trim();

    const category = document.getElementById("courseCategory").value;

    const price = Number(document.getElementById("coursePrice").value);

    const oldPrice =
      Number(document.getElementById("courseOldPrice").value) || 0;

    const description = document
      .getElementById("courseDescription")
      .value.trim();

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!title || !category || !description || price < 0) {
      alert("Please fill all required fields.");

      return;
    }

    // ==========================================
    // EDIT COURSE
    // ==========================================

    if (id) {
      const courseIndex = adminCourses.findIndex((course) => course.id === id);

      if (courseIndex !== -1) {
        adminCourses[courseIndex] = {
          ...adminCourses[courseIndex],

          title: title,

          category: category,

          price: price,

          oldPrice: oldPrice,

          description: description,
        };
      }

      alert("Course updated successfully!");
    }

    // ==========================================
    // ADD COURSE
    // ==========================================
    else {
      const newCourse = {
        id: "course_" + Date.now(),

        title: title,

        category: category,

        price: price,

        oldPrice: oldPrice,

        description: description,
        lectures: [],
      };

      adminCourses.push(newCourse);

      alert("Course added successfully!");
    }

    // ==========================================
    // SAVE
    // ==========================================

    localStorage.setItem("adminCourses", JSON.stringify(adminCourses));

    // Reset form

    courseForm.reset();

    document.getElementById("courseId").value = "";

    courseFormContainer.style.display = "none";

    renderAdminCourses();
  });
}

// ==========================================
// EDIT COURSE FUNCTION
// ==========================================

function editCourse(courseId) {
  const course = adminCourses.find((item) => item.id === courseId);

  if (!course) return;

  document.getElementById("courseId").value = course.id;

  document.getElementById("courseTitle").value = course.title;

  document.getElementById("courseCategory").value = course.category;

  document.getElementById("coursePrice").value = course.price;

  document.getElementById("courseOldPrice").value = course.oldPrice || "";

  document.getElementById("courseDescription").value = course.description;

  courseFormTitle.textContent = "Edit Course";

  courseFormContainer.style.display = "block";

  courseFormContainer.scrollIntoView({
    behavior: "smooth",
  });
}

// ==========================================
// DELETE COURSE FUNCTION
// ==========================================

function deleteCourse(courseId) {
  const course = adminCourses.find((item) => item.id === courseId);

  if (!course) return;

  const confirmDelete = confirm(
    `Are you sure you want to delete "${course.title}"?`,
  );

  if (!confirmDelete) return;

  adminCourses = adminCourses.filter((item) => item.id !== courseId);

  localStorage.setItem("adminCourses", JSON.stringify(adminCourses));

  alert("Course deleted successfully!");

  renderAdminCourses();
}

// ==========================================
// INITIAL RENDER
// ==========================================

if (adminCourseGrid) {
  renderAdminCourses();
}

// ==========================================
// ADMIN STUDENT MANAGEMENT
// ==========================================

const studentsTableBody = document.getElementById("studentsTableBody");

const studentSearch = document.getElementById("studentSearch");

const adminStudentCount = document.getElementById("adminStudentCount");

const adminStudentEmpty = document.getElementById("adminStudentEmpty");

const studentDetailsModal = document.getElementById("studentDetailsModal");

const studentDetails = document.getElementById("studentDetails");

const closeStudentModal = document.getElementById("closeStudentModal");

const closeStudentModalBtn = document.getElementById("closeStudentModalBtn");

// ==========================================
// GET STUDENT DATA
// ==========================================

function getAdminStudents() {
  const account = JSON.parse(localStorage.getItem("studentAccount"));

  const profile = JSON.parse(localStorage.getItem("studentProfile"));

  const order = JSON.parse(localStorage.getItem("lastOrder"));

  if (!account) {
    return [];
  }

  const purchasedCourses =
    order && Array.isArray(order.courses) ? order.courses : [];

  return [
    {
      name: profile?.name || account.name || "Student",

      email: profile?.email || account.email || "N/A",

      phone: profile?.phone || "",

      city: profile?.city || "",

      bio: profile?.bio || "",

      courses: purchasedCourses,

      status: "Active",

      registeredDate: "Available after backend integration",
    },
  ];
}

// ==========================================
// RENDER STUDENTS
// ==========================================

function renderAdminStudents(searchText = "") {
  if (!studentsTableBody) return;

  const students = getAdminStudents();

  const search = searchText.trim().toLowerCase();

  const filteredStudents = students.filter(function (student) {
    return (
      student.name.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search)
    );
  });

  studentsTableBody.innerHTML = "";

  // Student count

  if (adminStudentCount) {
    adminStudentCount.textContent = `${filteredStudents.length} Student${
      filteredStudents.length !== 1 ? "s" : ""
    }`;
  }

  // Empty state

  if (filteredStudents.length === 0) {
    if (adminStudentEmpty) {
      adminStudentEmpty.style.display = "block";
    }

    return;
  }

  if (adminStudentEmpty) {
    adminStudentEmpty.style.display = "none";
  }

  // ==========================================
  // CREATE TABLE ROWS
  // ==========================================

  filteredStudents.forEach(function (student, index) {
    const row = document.createElement("tr");

    const courseCount = student.courses.length;

    row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>
                <strong>
                    ${student.name}
                </strong>
            </td>

            <td>
                ${student.email}
            </td>

            <td>
                ${student.phone ? student.phone : "Not added"}
            </td>

            <td>
                ${courseCount}
            </td>

            <td>

                <span class="student-status active">
                    ${student.status}
                </span>

            </td>

            <td>

                <button
                    type="button"
                    class="student-view-btn"
                    data-email="${student.email}"
                >
                    View
                </button>

            </td>

        `;

    studentsTableBody.appendChild(row);
  });

  // ==========================================
  // VIEW BUTTONS
  // ==========================================

  document.querySelectorAll(".student-view-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      showStudentDetails(this.dataset.email);
    });
  });
}

// ==========================================
// SHOW STUDENT DETAILS
// ==========================================

function showStudentDetails(email) {
  const students = getAdminStudents();

  const student = students.find(function (item) {
    return item.email === email;
  });

  if (!student || !studentDetailsModal) {
    return;
  }

  const courseNames =
    student.courses.length > 0
      ? student.courses.map((course) => course.title).join(", ")
      : "No courses purchased";

  studentDetails.innerHTML = `

        <div class="student-detail-item">

            <span class="student-detail-label">
                Name
            </span>

            <span class="student-detail-value">
                ${student.name}
            </span>

        </div>


        <div class="student-detail-item">

            <span class="student-detail-label">
                Email
            </span>

            <span class="student-detail-value">
                ${student.email}
            </span>

        </div>


        <div class="student-detail-item">

            <span class="student-detail-label">
                Phone
            </span>

            <span class="student-detail-value">
                ${student.phone || "Not added"}
            </span>

        </div>


        <div class="student-detail-item">

            <span class="student-detail-label">
                City
            </span>

            <span class="student-detail-value">
                ${student.city || "Not added"}
            </span>

        </div>


        <div class="student-detail-item">

            <span class="student-detail-label">
                Purchased Courses
            </span>

            <span class="student-detail-value">
                ${student.courses.length}
            </span>

        </div>


        <div class="student-detail-item">

            <span class="student-detail-label">
                Courses
            </span>

            <span class="student-detail-value">
                ${courseNames}
            </span>

        </div>


        <div class="student-detail-item">

            <span class="student-detail-label">
                Status
            </span>

            <span class="student-detail-value">
                ${student.status}
            </span>

        </div>

    `;

  studentDetailsModal.style.display = "flex";
}

// ==========================================
// CLOSE STUDENT MODAL
// ==========================================

function closeStudentDetailsModal() {
  if (studentDetailsModal) {
    studentDetailsModal.style.display = "none";
  }
}

if (closeStudentModal) {
  closeStudentModal.addEventListener("click", closeStudentDetailsModal);
}

if (closeStudentModalBtn) {
  closeStudentModalBtn.addEventListener("click", closeStudentDetailsModal);
}

// Close modal by clicking outside

if (studentDetailsModal) {
  studentDetailsModal.addEventListener("click", function (event) {
    if (event.target === studentDetailsModal) {
      closeStudentDetailsModal();
    }
  });
}

// ==========================================
// SEARCH STUDENTS
// ==========================================

if (studentSearch) {
  studentSearch.addEventListener("input", function () {
    renderAdminStudents(this.value);
  });
}

// ==========================================
// INITIAL STUDENT RENDER
// ==========================================

if (studentsTableBody) {
  renderAdminStudents();
}

// ==========================================
// ADMIN ORDER MANAGEMENT
// ==========================================

const adminOrdersTableBody = document.getElementById("adminOrdersTableBody");

const orderSearch = document.getElementById("orderSearch");

const orderStatusFilter = document.getElementById("orderStatusFilter");

const adminOrderCount = document.getElementById("adminOrderCount");

const adminOrderEmpty = document.getElementById("adminOrderEmpty");

const orderDetailsModal = document.getElementById("orderDetailsModal");

const adminOrderDetails = document.getElementById("adminOrderDetails");

const closeOrderModal = document.getElementById("closeOrderModal");

const closeOrderModalBtn = document.getElementById("closeOrderModalBtn");

// ==========================================
// GET ORDERS
// ==========================================

function getAdminOrders() {
  const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));

  if (!lastOrder) {
    return [];
  }

  return [lastOrder];
}

// ==========================================
// GET STATUS CLASS
// ==========================================

function getOrderStatusClass(status) {
  const normalizedStatus = String(status || "Pending").toLowerCase();

  if (normalizedStatus === "paid") {
    return "paid";
  }

  if (normalizedStatus === "cancelled") {
    return "cancelled";
  }

  return "pending";
}

// ==========================================
// RENDER ORDERS
// ==========================================

function renderAdminOrders() {
  if (!adminOrdersTableBody) {
    return;
  }

  const orders = getAdminOrders();

  const searchText = orderSearch ? orderSearch.value.trim().toLowerCase() : "";

  const selectedStatus = orderStatusFilter ? orderStatusFilter.value : "all";

  const filteredOrders = orders.filter(function (order) {
    const customerName = order.customer?.name || "";

    const customerEmail = order.customer?.email || "";

    const orderId = order.orderId || "";

    const status = order.status || "Pending";

    const matchesSearch =
      orderId.toLowerCase().includes(searchText) ||
      customerName.toLowerCase().includes(searchText) ||
      customerEmail.toLowerCase().includes(searchText);

    const matchesStatus = selectedStatus === "all" || status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  adminOrdersTableBody.innerHTML = "";

  // ==========================================
  // ORDER COUNT
  // ==========================================

  if (adminOrderCount) {
    adminOrderCount.textContent = `${filteredOrders.length} Order${
      filteredOrders.length !== 1 ? "s" : ""
    }`;
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (filteredOrders.length === 0) {
    if (adminOrderEmpty) {
      adminOrderEmpty.style.display = "block";
    }

    return;
  }

  if (adminOrderEmpty) {
    adminOrderEmpty.style.display = "none";
  }

  // ==========================================
  // ORDER ROWS
  // ==========================================

  filteredOrders.forEach(function (order, index) {
    const row = document.createElement("tr");

    const customerName = order.customer?.name || "Unknown";

    const customerEmail = order.customer?.email || "N/A";

    const paymentMethod = order.paymentMethod || "N/A";

    const status = order.status || "Pending";

    const amount = Number(order.total) || 0;

    const orderDate = order.orderDate
      ? new Date(order.orderDate).toLocaleDateString()
      : "N/A";

    const courses = Array.isArray(order.courses) ? order.courses : [];

    const courseNames =
      courses.length > 0
        ? courses.map((course) => course.title).join(", ")
        : "No course";

    row.innerHTML = `

                <td>
                    ${index + 1}
                </td>


                <td>
                    ${order.orderId || "N/A"}
                </td>


                <td>

                    <strong>
                        ${customerName}
                    </strong>

                    <small style="
                        display:block;
                        margin-top:4px;
                        color:#888;
                    ">
                        ${customerEmail}
                    </small>

                </td>


                <td>
                    ${courseNames}
                </td>


                <td>
                    ₹${amount}
                </td>


                <td>

                    <span class="admin-payment-method">
                        ${paymentMethod}
                    </span>

                </td>


                <td>
                    ${orderDate}
                </td>


                <td>

                    <span class="order-status ${getOrderStatusClass(status)}">
                        ${status}
                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="order-view-btn"
                        data-order-id="${order.orderId}"
                    >
                        View
                    </button>

                </td>

            `;

    adminOrdersTableBody.appendChild(row);
  });

  // ==========================================
  // VIEW BUTTONS
  // ==========================================

  document.querySelectorAll(".order-view-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      showOrderDetails(this.dataset.orderId);
    });
  });
}

// ==========================================
// SHOW ORDER DETAILS
// ==========================================

function showOrderDetails(orderId) {
  const orders = getAdminOrders();

  const order = orders.find(function (item) {
    return item.orderId === orderId;
  });

  if (!order || !orderDetailsModal || !adminOrderDetails) {
    return;
  }

  const customerName = order.customer?.name || "Unknown";

  const customerEmail = order.customer?.email || "N/A";

  const customerPhone = order.customer?.phone || "Not added";

  const paymentMethod = order.paymentMethod || "N/A";

  const status = order.status || "Pending";

  const orderDate = order.orderDate
    ? new Date(order.orderDate).toLocaleString()
    : "N/A";

  const courses = Array.isArray(order.courses) ? order.courses : [];

  const courseList =
    courses.length > 0
      ? courses
          .map((course) => `${course.title} - ₹${course.price}`)
          .join("<br>")
      : "No courses";

  const subtotal = Number(order.subtotal) || 0;

  const discount = Number(order.discount) || 0;

  const total = Number(order.total) || 0;

  adminOrderDetails.innerHTML = `

        <div class="order-detail-item">

            <span class="order-detail-label">
                Order ID
            </span>

            <span class="order-detail-value">
                ${order.orderId || "N/A"}
            </span>

        </div>


        <div class="order-detail-item">

            <span class="order-detail-label">
                Student Name
            </span>

            <span class="order-detail-value">
                ${customerName}
            </span>

        </div>


        <div class="order-detail-item">

            <span class="order-detail-label">
                Email
            </span>

            <span class="order-detail-value">
                ${customerEmail}
            </span>

        </div>


        <div class="order-detail-item">

            <span class="order-detail-label">
                Phone
            </span>

            <span class="order-detail-value">
                ${customerPhone}
            </span>

        </div>


        <div class="order-detail-item">

            <span class="order-detail-label">
                Courses
            </span>

            <span class="order-detail-value">
                ${courseList}
            </span>

        </div>


        <div class="order-detail-item">

            <span class="order-detail-label">
                Subtotal
            </span>

            <span class="order-detail-value">
                ₹${subtotal}
            </span>

        </div>


        <div class="order-detail-item">

            <span class="order-detail-label">
                Discount
            </span>

            <span class="order-detail-value">
                ₹${discount}
            </span>

        </div>


        <div class="order-detail-item">

            <span class="order-detail-label">
                Total Amount
            </span>

            <span class="order-detail-value">
                ₹${total}
            </span>

        </div>


        <div class="order-detail-item">

            <span class="order-detail-label">
                Payment Method
            </span>

            <span class="order-detail-value">
                ${paymentMethod}
            </span>

        </div>


        <div class="order-detail-item">

            <span class="order-detail-label">
                Order Date
            </span>

            <span class="order-detail-value">
                ${orderDate}
            </span>

        </div>


        <div class="order-detail-item">

            <span class="order-detail-label">
                Status
            </span>

            <span class="order-detail-value">

                <span class="order-status ${getOrderStatusClass(status)}">
                    ${status}
                </span>

            </span>

        </div>

    `;

  orderDetailsModal.style.display = "flex";
}

// ==========================================
// CLOSE ORDER MODAL
// ==========================================

function closeOrderDetailsModal() {
  if (orderDetailsModal) {
    orderDetailsModal.style.display = "none";
  }
}

if (closeOrderModal) {
  closeOrderModal.addEventListener("click", closeOrderDetailsModal);
}

if (closeOrderModalBtn) {
  closeOrderModalBtn.addEventListener("click", closeOrderDetailsModal);
}

// ==========================================
// CLOSE BY CLICKING OUTSIDE
// ==========================================

if (orderDetailsModal) {
  orderDetailsModal.addEventListener("click", function (event) {
    if (event.target === orderDetailsModal) {
      closeOrderDetailsModal();
    }
  });
}

// ==========================================
// SEARCH
// ==========================================

if (orderSearch) {
  orderSearch.addEventListener("input", function () {
    renderAdminOrders();
  });
}

// ==========================================
// STATUS FILTER
// ==========================================

if (orderStatusFilter) {
  orderStatusFilter.addEventListener("change", function () {
    renderAdminOrders();
  });
}

// ==========================================
// INITIAL RENDER
// ==========================================

if (adminOrdersTableBody) {
  renderAdminOrders();
}

/* =========================================================
   LIVE CLASS MANAGEMENT
========================================================= */

const LIVE_CLASS_STORAGE_KEY = "adminLiveClasses";

/* =========================
   DEFAULT LIVE CLASSES
========================= */

const defaultAdminLiveClasses = [
  {
    id: "live1",
    title: "JavaScript DOM & Events",
    description:
      "Learn DOM manipulation and JavaScript events with practical examples.",
    instructor: "Village Wala Instructor",
    date: "2026-09-23",
    time: "18:30",
    duration: "60 Minutes",
    status: "live",
    joinLink: "#",
  },

  {
    id: "live2",
    title: "React JS Components",
    description: "Understand React components and build reusable UI elements.",
    instructor: "Village Wala Instructor",
    date: "2026-09-24",
    time: "19:00",
    duration: "60 Minutes",
    status: "upcoming",
    joinLink: "#",
  },

  {
    id: "live3",
    title: "HTML & CSS Project",
    description:
      "Build a professional responsive portfolio website from scratch.",
    instructor: "Village Wala Instructor",
    date: "2026-09-25",
    time: "18:00",
    duration: "90 Minutes",
    status: "upcoming",
    joinLink: "#",
  },
];

/* =========================
   GET LIVE CLASSES
========================= */

function getAdminLiveClasses() {
  const storedClasses = localStorage.getItem(LIVE_CLASS_STORAGE_KEY);

  if (storedClasses) {
    try {
      return JSON.parse(storedClasses);
    } catch (error) {
      console.error("Unable to read live class data:", error);
    }
  }

  localStorage.setItem(
    LIVE_CLASS_STORAGE_KEY,
    JSON.stringify(defaultAdminLiveClasses),
  );

  return [...defaultAdminLiveClasses];
}

/* =========================
   SAVE LIVE CLASSES
========================= */

function saveAdminLiveClasses(classes) {
  localStorage.setItem(LIVE_CLASS_STORAGE_KEY, JSON.stringify(classes));
}

/* =========================
   DOM ELEMENTS
========================= */

const addLiveClassBtn = document.getElementById("addLiveClassBtn");

const liveClassFormContainer = document.getElementById(
  "liveClassFormContainer",
);

const liveClassForm = document.getElementById("liveClassForm");

const liveClassId = document.getElementById("liveClassId");

const liveClassFormTitle = document.getElementById("liveClassFormTitle");

const liveClassTitle = document.getElementById("liveClassTitle");

const liveClassInstructor = document.getElementById("liveClassInstructor");

const liveClassDate = document.getElementById("liveClassDate");

const liveClassTime = document.getElementById("liveClassTime");

const liveClassDuration = document.getElementById("liveClassDuration");

const liveClassStatus = document.getElementById("liveClassStatus");

const liveClassJoinLink = document.getElementById("liveClassJoinLink");

const liveClassDescription = document.getElementById("liveClassDescription");

const cancelLiveClassBtn = document.getElementById("cancelLiveClassBtn");

const liveClassSearch = document.getElementById("liveClassSearch");

const liveClassFilter = document.getElementById("liveClassFilter");

const adminLiveClassGrid = document.getElementById("adminLiveClassGrid");

const adminLiveClassCount = document.getElementById("adminLiveClassCount");

const adminLiveClassEmpty = document.getElementById("adminLiveClassEmpty");

/* =========================
   RENDER LIVE CLASSES
========================= */

function renderAdminLiveClasses() {
  if (!adminLiveClassGrid) {
    return;
  }

  const allClasses = getAdminLiveClasses();

  const searchText = liveClassSearch
    ? liveClassSearch.value.trim().toLowerCase()
    : "";

  const filterStatus = liveClassFilter ? liveClassFilter.value : "all";

  const filteredClasses = allClasses.filter((liveClass) => {
    const matchesSearch =
      liveClass.title.toLowerCase().includes(searchText) ||
      liveClass.instructor.toLowerCase().includes(searchText);

    const matchesStatus =
      filterStatus === "all" || liveClass.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  adminLiveClassGrid.innerHTML = "";

  /* =========================
       COUNT
    ========================= */

  if (adminLiveClassCount) {
    adminLiveClassCount.textContent = `${filteredClasses.length} ${
      filteredClasses.length === 1 ? "Class" : "Classes"
    }`;
  }

  /* =========================
       EMPTY STATE
    ========================= */

  if (filteredClasses.length === 0) {
    adminLiveClassGrid.style.display = "none";

    if (adminLiveClassEmpty) {
      adminLiveClassEmpty.style.display = "block";
    }

    return;
  }

  adminLiveClassGrid.style.display = "grid";

  if (adminLiveClassEmpty) {
    adminLiveClassEmpty.style.display = "none";
  }

  /* =========================
       CREATE CARDS
    ========================= */

  filteredClasses.forEach((liveClass) => {
    const card = document.createElement("div");

    card.className = "admin-live-card";

    const formattedDate = formatLiveClassDate(liveClass.date);

    const formattedStatus = getLiveClassStatusText(liveClass.status);

    card.innerHTML = `

            <div class="admin-live-card-top">

                <div class="admin-live-icon">
                    🎥
                </div>

                <span class="admin-live-status ${liveClass.status}">
                    ${formattedStatus}
                </span>

            </div>


            <h3>
                ${escapeLiveClassHTML(liveClass.title)}
            </h3>


            <p class="admin-live-description">
                ${escapeLiveClassHTML(liveClass.description)}
            </p>


            <div class="admin-live-info">

                <div class="admin-live-info-item">

                    <span class="admin-live-info-icon">
                        👨‍🏫
                    </span>

                    <span>
                        ${escapeLiveClassHTML(liveClass.instructor)}
                    </span>

                </div>


                <div class="admin-live-info-item">

                    <span class="admin-live-info-icon">
                        📅
                    </span>

                    <span>
                        ${formattedDate}
                    </span>

                </div>


                <div class="admin-live-info-item">

                    <span class="admin-live-info-icon">
                        🕐
                    </span>

                    <span>
                        ${escapeLiveClassHTML(liveClass.time)}
                    </span>

                </div>


                <div class="admin-live-info-item">

                    <span class="admin-live-info-icon">
                        ⏱️
                    </span>

                    <span>
                        ${escapeLiveClassHTML(liveClass.duration)}
                    </span>

                </div>

            </div>


            <div class="admin-live-actions">

                <button
                    type="button"
                    class="admin-live-edit-btn"
                    data-action="edit"
                    data-id="${liveClass.id}"
                >
                    ✏️ Edit
                </button>


                <button
                    type="button"
                    class="admin-live-delete-btn"
                    data-action="delete"
                    data-id="${liveClass.id}"
                >
                    🗑️ Delete
                </button>

            </div>

        `;

    adminLiveClassGrid.appendChild(card);
  });
}

/* =========================
   FORMAT DATE
========================= */

function formatLiveClassDate(dateString) {
  if (!dateString) {
    return "Date not added";
  }

  const date = new Date(dateString + "T00:00:00");

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* =========================
   STATUS TEXT
========================= */

function getLiveClassStatusText(status) {
  if (status === "live") {
    return "Live";
  }

  if (status === "upcoming") {
    return "Upcoming";
  }

  if (status === "past") {
    return "Past";
  }

  return "Upcoming";
}

/* =========================
   ESCAPE HTML
========================= */

function escapeLiveClassHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================
   OPEN ADD FORM
========================= */

function openAddLiveClassForm() {
  if (!liveClassFormContainer) {
    return;
  }

  liveClassForm.reset();

  if (liveClassId) {
    liveClassId.value = "";
  }

  if (liveClassFormTitle) {
    liveClassFormTitle.textContent = "Add New Live Class";
  }

  if (liveClassStatus) {
    liveClassStatus.value = "upcoming";
  }

  liveClassFormContainer.style.display = "block";

  liveClassFormContainer.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/* =========================
   OPEN EDIT FORM
========================= */

function openEditLiveClassForm(id) {
  const classes = getAdminLiveClasses();

  const liveClass = classes.find((item) => item.id === id);

  if (!liveClass) {
    return;
  }

  if (liveClassFormContainer) {
    liveClassFormContainer.style.display = "block";
  }

  if (liveClassFormTitle) {
    liveClassFormTitle.textContent = "Edit Live Class";
  }

  if (liveClassId) {
    liveClassId.value = liveClass.id;
  }

  if (liveClassTitle) {
    liveClassTitle.value = liveClass.title;
  }

  if (liveClassInstructor) {
    liveClassInstructor.value = liveClass.instructor;
  }

  if (liveClassDate) {
    liveClassDate.value = liveClass.date;
  }

  if (liveClassTime) {
    liveClassTime.value = liveClass.time;
  }

  if (liveClassDuration) {
    liveClassDuration.value = liveClass.duration;
  }

  if (liveClassStatus) {
    liveClassStatus.value = liveClass.status;
  }

  if (liveClassJoinLink) {
    liveClassJoinLink.value =
      liveClass.joinLink === "#" ? "" : liveClass.joinLink;
  }

  if (liveClassDescription) {
    liveClassDescription.value = liveClass.description;
  }

  liveClassFormContainer.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/* =========================
   CLOSE FORM
========================= */

function closeLiveClassForm() {
  if (!liveClassFormContainer) {
    return;
  }

  liveClassFormContainer.style.display = "none";

  if (liveClassForm) {
    liveClassForm.reset();
  }

  if (liveClassId) {
    liveClassId.value = "";
  }
}

/* =========================
   SAVE LIVE CLASS
========================= */

if (liveClassForm) {
  liveClassForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = liveClassTitle.value.trim();

    const instructor = liveClassInstructor.value.trim();

    const date = liveClassDate.value;

    const time = liveClassTime.value;

    const duration = liveClassDuration.value;

    const status = liveClassStatus.value;

    const joinLink = liveClassJoinLink.value.trim();

    const description = liveClassDescription.value.trim();

    if (
      !title ||
      !instructor ||
      !date ||
      !time ||
      !duration ||
      !status ||
      !description
    ) {
      alert("Please fill all required fields.");

      return;
    }

    let classes = getAdminLiveClasses();

    const editingId = liveClassId.value;

    /* =========================
               EDIT EXISTING
            ========================= */

    if (editingId) {
      const index = classes.findIndex((item) => item.id === editingId);

      if (index !== -1) {
        classes[index] = {
          ...classes[index],

          title: title,
          instructor: instructor,
          date: date,
          time: time,
          duration: duration,
          status: status,
          joinLink: joinLink || "#",
          description: description,
        };
      }

      alert("Live class updated successfully.");
    } else {
      /* =========================
               ADD NEW
            ========================= */
      const newLiveClass = {
        id: "live_" + Date.now(),

        title: title,

        description: description,

        instructor: instructor,

        date: date,

        time: time,

        duration: duration,

        status: status,

        joinLink: joinLink || "#",
      };

      classes.push(newLiveClass);

      alert("Live class added successfully.");
    }

    saveAdminLiveClasses(classes);

    renderAdminLiveClasses();

    closeLiveClassForm();
  });
}

/* =========================
   ADD BUTTON
========================= */

if (addLiveClassBtn) {
  addLiveClassBtn.addEventListener("click", openAddLiveClassForm);
}

/* =========================
   CANCEL BUTTON
========================= */

if (cancelLiveClassBtn) {
  cancelLiveClassBtn.addEventListener("click", closeLiveClassForm);
}

/* =========================
   EDIT / DELETE
========================= */

if (adminLiveClassGrid) {
  adminLiveClassGrid.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");

    if (!button) {
      return;
    }

    const action = button.dataset.action;

    const id = button.dataset.id;

    if (action === "edit") {
      openEditLiveClassForm(id);
    }

    if (action === "delete") {
      deleteAdminLiveClass(id);
    }
  });
}

/* =========================
   DELETE LIVE CLASS
========================= */

function deleteAdminLiveClass(id) {
  const classes = getAdminLiveClasses();

  const liveClass = classes.find((item) => item.id === id);

  if (!liveClass) {
    return;
  }

  const confirmed = confirm(
    `Are you sure you want to delete "${liveClass.title}"?`,
  );

  if (!confirmed) {
    return;
  }

  const updatedClasses = classes.filter((item) => item.id !== id);

  saveAdminLiveClasses(updatedClasses);

  renderAdminLiveClasses();

  alert("Live class deleted successfully.");
}

/* =========================
   SEARCH
========================= */

if (liveClassSearch) {
  liveClassSearch.addEventListener("input", renderAdminLiveClasses);
}

/* =========================
   FILTER
========================= */

if (liveClassFilter) {
  liveClassFilter.addEventListener("change", renderAdminLiveClasses);
}

/* =========================
   INITIAL RENDER
========================= */

renderAdminLiveClasses();

/* ==========================================
   CERTIFICATE MANAGEMENT
========================================== */

function loadAdminCertificates() {
  const certificateGrid = document.getElementById("adminCertificateGrid");

  const certificateEmpty = document.getElementById("adminCertificateEmpty");

  if (!certificateGrid || !certificateEmpty) {
    return;
  }

  const purchasedCourses =
    JSON.parse(localStorage.getItem("purchasedCourses")) || [];

  certificateGrid.innerHTML = "";

  let certificatesFound = 0;

  purchasedCourses.forEach(function (course) {
    const certificateId = localStorage.getItem("certificate_" + course.id);

    if (!certificateId) {
      return;
    }

    certificatesFound++;

    const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};

    const studentName = profile.name || "Student";

    const card = document.createElement("div");

    card.className = "admin-certificate-card";

    card.innerHTML = `
            <h3>🎓 Certificate</h3>

            <p>
                <strong>Student:</strong>
                ${studentName}
            </p>

            <p>
                <strong>Course:</strong>
                ${course.title}
            </p>

            <p>
                <strong>Certificate ID:</strong>
                ${certificateId}
            </p>

            <span class="certificate-status">
                Completed ✓
            </span>
            <button
    type="button"
    class="admin-view-certificate"
    data-course-id="${course.id}">

    View Certificate
</button>
<button
    type="button"
    class="admin-delete-certificate"
    data-course-id="${course.id}">
    Delete Certificate
</button>
        `;

    certificateGrid.appendChild(card);
  });

  if (certificatesFound === 0) {
    certificateEmpty.style.display = "block";
  } else {
    certificateEmpty.style.display = "none";
  }
}

/* ==========================================
   CERTIFICATE STATISTICS
========================================== */

function updateCertificateStatistics() {

    const totalCertificates =
        document.getElementById(
            "adminTotalCertificates"
        );

    const verifiedCertificates =
        document.getElementById(
            "adminVerifiedCertificates"
        );

    const completedCourses =
        document.getElementById(
            "adminCompletedCourses"
        );


    if (
        !totalCertificates ||
        !verifiedCertificates ||
        !completedCourses
    ) {
        return;
    }


    const purchasedCourses =
        JSON.parse(
            localStorage.getItem(
                "purchasedCourses"
            )
        ) || [];


    let certificateCount = 0;


    purchasedCourses.forEach(function (course) {

        const certificateId =
            localStorage.getItem(
                "certificate_" + course.id
            );

        if (certificateId) {
            certificateCount++;
        }

    });


    totalCertificates.textContent =
        certificateCount;

    verifiedCertificates.textContent =
        certificateCount;

    completedCourses.textContent =
        certificateCount;

}


/* Update statistics */

updateCertificateStatistics();

/* Load certificates when admin page opens */

loadAdminCertificates();

/* ==========================================
   CERTIFICATE SEARCH
========================================== */

const adminCertificateSearch = document.getElementById(
  "adminCertificateSearch",
);

const adminCertificateSearchBtn = document.getElementById(
  "adminCertificateSearchBtn",
);

function searchAdminCertificates() {
  const searchValue = adminCertificateSearch.value.trim().toLowerCase();

  const certificateGrid = document.getElementById("adminCertificateGrid");

  const certificateEmpty = document.getElementById("adminCertificateEmpty");

  const purchasedCourses =
    JSON.parse(localStorage.getItem("purchasedCourses")) || [];

  certificateGrid.innerHTML = "";

  let certificatesFound = 0;

  const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};

  const studentName = profile.name || "Student";

  purchasedCourses.forEach(function (course) {
    const certificateId = localStorage.getItem("certificate_" + course.id);

    if (!certificateId) {
      return;
    }

    const matchesSearch =
      certificateId.toLowerCase().includes(searchValue) ||
      studentName.toLowerCase().includes(searchValue) ||
      course.title.toLowerCase().includes(searchValue);

    if (!matchesSearch) {
      return;
    }

    certificatesFound++;

    const card = document.createElement("div");

    card.className = "admin-certificate-card";

    card.innerHTML = `
            <h3>🎓 Certificate</h3>

            <p>
                <strong>Student:</strong>
                ${studentName}
            </p>

            <p>
                <strong>Course:</strong>
                ${course.title}
            </p>

            <p>
                <strong>Certificate ID:</strong>
                ${certificateId}
            </p>

            <span class="certificate-status">
                Completed ✓
            </span>
        `;

    certificateGrid.appendChild(card);
  });

  if (certificatesFound === 0) {
    certificateEmpty.style.display = "block";
  } else {
    certificateEmpty.style.display = "none";
  }
}

if (adminCertificateSearchBtn) {
  adminCertificateSearchBtn.addEventListener("click", searchAdminCertificates);
}

if (adminCertificateSearch) {
  adminCertificateSearch.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchAdminCertificates();
    }
  });
}


/* ==========================================
   VIEW CERTIFICATE FROM ADMIN
========================================== */

document.addEventListener("click", function (event) {

    if (
        !event.target.classList.contains(
            "admin-view-certificate"
        )
    ) {
        return;
    }

    const courseId =
        event.target.dataset.courseId;

    if (!courseId) {
        return;
    }

    window.location.href =
        "certificate.html?course=" +
        encodeURIComponent(courseId);

});


/* ==========================================
   DELETE CERTIFICATE
========================================== */

document.addEventListener("click", function (event) {

    if (
        !event.target.classList.contains(
            "admin-delete-certificate"
        )
    ) {
        return;
    }

    const courseId =
        event.target.dataset.courseId;

    if (!courseId) {
        return;
    }

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this certificate?"
        );

    if (!confirmDelete) {
        return;
    }

    localStorage.removeItem(
        "certificate_" + courseId
    );

    alert("Certificate deleted successfully.");

    loadAdminCertificates();

});