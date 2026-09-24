/* =========================================
   LECTURE JAVASCRIPT
========================================= */

/* =========================================
   ELEMENTS
========================================= */

const lectureVideo = document.getElementById("lectureVideo");

const lectureCategory = document.getElementById("lectureCategory");

const lectureTitle = document.getElementById("lectureTitle");

const lectureDescription = document.getElementById("lectureDescription");

const lectureNumber = document.getElementById("lectureNumber");

const lectureDuration = document.getElementById("lectureDuration");

const lectureProgress = document.getElementById("lectureProgress");

const lectureAbout = document.getElementById("lectureAbout");

const lectureList = document.getElementById("lectureList");

const previousLecture = document.getElementById("previousLecture");

const nextLecture = document.getElementById("nextLecture");

const markComplete = document.getElementById("markComplete");

const courseProgressText = document.getElementById("courseProgressText");

const courseProgressBar = document.getElementById("courseProgressBar");

const cartCount = document.getElementById("cartCount");

/* =========================================
   COURSE DATA
========================================= */

const lectureCourses = {
  course1: {
    title: "HTML & CSS Complete Course",

    category: "Web Development",

    lectures: [
      {
        title: "Introduction to Web Development",
        duration: "12 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "HTML Basics",
        duration: "18 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "HTML Forms",
        duration: "20 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "CSS Fundamentals",
        duration: "25 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "Responsive Web Design",
        duration: "30 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },
    ],
  },

  course2: {
    title: "JavaScript Complete Course",

    category: "JavaScript",

    lectures: [
      {
        title: "Introduction to JavaScript",
        duration: "15 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "Variables and Data Types",
        duration: "20 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "Functions in JavaScript",
        duration: "25 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "Arrays and Objects",
        duration: "25 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "DOM Manipulation",
        duration: "30 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },
    ],
  },

  course3: {
    title: "React JS Complete Course",

    category: "React JS",

    lectures: [
      {
        title: "Introduction to React",
        duration: "15 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "React Components",
        duration: "20 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "Props in React",
        duration: "18 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "useState Hook",
        duration: "25 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "React Forms",
        duration: "25 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },
    ],
  },

  course4: {
    title: "Figma UI/UX Design Course",

    category: "UI/UX Design",

    lectures: [
      {
        title: "Introduction to UI/UX",
        duration: "12 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "Figma Interface",
        duration: "20 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "Creating Wireframes",
        duration: "25 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "Design Components",
        duration: "25 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },

      {
        title: "Creating Prototypes",
        duration: "30 Minutes",
        video: "../assets/videos/demo-lecture.mp4",
      },
    ],
  },
};

/* =========================================
   GET COURSE ID
========================================= */

const urlParams = new URLSearchParams(window.location.search);

const courseId = urlParams.get("id") || "course1";

const lectureParam = parseInt(urlParams.get("lecture"));

const startingLecture = Number.isInteger(lectureParam) ? lectureParam : 0;

/* =========================================
   GET COURSE
========================================= */

// ==========================================
// ADMIN COURSE CONNECTION
// ==========================================
// ==========================================
// GET COURSE
// ==========================================

let currentCourse = lectureCourses[courseId] || null;

// ==========================================
// ADMIN COURSE CONNECTION
// ==========================================

const savedAdminCourses =
  JSON.parse(localStorage.getItem("adminCourses")) || [];

const adminCourse = savedAdminCourses.find(function (course) {
  return String(course.id) === String(courseId);
});

if (adminCourse) {
  currentCourse = {
    ...adminCourse,

    lectures: Array.isArray(adminCourse.lectures) ? adminCourse.lectures : [],
  };
}

/* =========================================
   CURRENT LECTURE
========================================= */

let currentLectureIndex = 0;

/* =========================================
   PROGRESS STORAGE KEY
========================================= */

function getProgressKey() {
  return "lectureProgress_" + courseId;
}

/* =========================================
   GET COMPLETED LECTURES
========================================= */

function getCompletedLectures() {
  const savedProgress = localStorage.getItem(getProgressKey());

  if (savedProgress) {
    return JSON.parse(savedProgress);
  }

  return [];
}

/* =========================================
   SAVE COMPLETED LECTURES
========================================= */

function saveCompletedLectures(completedLectures) {
  localStorage.setItem(getProgressKey(), JSON.stringify(completedLectures));
}

/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {
  const savedCart = localStorage.getItem("academyCart");

  const cart = savedCart ? JSON.parse(savedCart) : [];

  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

/* =========================================
   LOAD LECTURE
========================================= */

function loadLecture(index) {
  if (!currentCourse) {
    return;
  }

  const lecture = currentCourse.lectures[index];

  if (!lecture) {
    return;
  }

  currentLectureIndex = index;

  /* =====================================
       UPDATE VIDEO
    ====================================== */

  if (lectureVideo) {
    lectureVideo.src = lecture.video;

    lectureVideo.load();
  }

  /* =====================================
       UPDATE INFORMATION
    ====================================== */

  lectureCategory.textContent = currentCourse.category;

  lectureTitle.textContent = lecture.title;

  lectureDescription.textContent = `Learn ${lecture.title.toLowerCase()} with practical examples and step-by-step explanations.`;

  lectureNumber.textContent = `Lecture ${index + 1} of ${currentCourse.lectures.length}`;

  lectureDuration.textContent = lecture.duration;

  lectureAbout.textContent = `This lecture covers ${lecture.title.toLowerCase()} as part of the ${currentCourse.title}. Watch the lesson carefully and mark it as complete after finishing.`;

  /* =====================================
       UPDATE BUTTONS
    ====================================== */

  if (previousLecture) {
    previousLecture.disabled = index === 0;
  }

  if (nextLecture) {
    nextLecture.disabled = index === currentCourse.lectures.length - 1;
  }

  updateLectureStatus();

  renderLectureList();

  updateCourseProgress();
}

/* =========================================
   UPDATE LECTURE STATUS
========================================= */

function updateLectureStatus() {
  const completedLectures = getCompletedLectures();

  const isCompleted = completedLectures.includes(currentLectureIndex);

  if (markComplete) {
    if (isCompleted) {
      markComplete.textContent = "✓ Completed";

      markComplete.classList.add("completed");
    } else {
      markComplete.textContent = "✓ Mark as Complete";

      markComplete.classList.remove("completed");
    }
  }
}

/* =========================================
   MARK LECTURE COMPLETE
========================================= */

function completeLecture() {
  const completedLectures = getCompletedLectures();

  if (!completedLectures.includes(currentLectureIndex)) {
    completedLectures.push(currentLectureIndex);

    completedLectures.sort(function (a, b) {
      return a - b;
    });

    saveCompletedLectures(completedLectures);
  }

  updateLectureStatus();

  renderLectureList();

  updateCourseProgress();
}

/* =========================================
   RENDER LECTURE LIST
========================================= */

function renderLectureList() {
  if (!lectureList || !currentCourse) {
    return;
  }

  const completedLectures = getCompletedLectures();

  lectureList.innerHTML = "";

  currentCourse.lectures.forEach(function (lecture, index) {
    const item = document.createElement("div");

    item.className = "lecture-item";

    if (index === currentLectureIndex) {
      item.classList.add("active");
    }

    if (completedLectures.includes(index)) {
      item.classList.add("completed");
    }

    item.innerHTML = `

                <div class="lecture-item-number">

                    ${completedLectures.includes(index) ? "✓" : index + 1}

                </div>


                <div class="lecture-item-content">

                    <h4>
                        ${lecture.title}
                    </h4>

                    <p>
                        ${lecture.duration}
                    </p>

                </div>


                ${
                  completedLectures.includes(index)
                    ? '<span class="lecture-completed-icon">✓</span>'
                    : ""
                }

            `;

    item.addEventListener("click", function () {
      loadLecture(index);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    lectureList.appendChild(item);
  });
}

/* =========================================
   UPDATE COURSE PROGRESS
========================================= */

// =========================================
// UPDATE COURSE PROGRESS
// =========================================

function updateCourseProgress() {

  if (!currentCourse) {
    return;
  }

  const completedLectures = getCompletedLectures();

  const totalLectures =
    Array.isArray(currentCourse.lectures)
      ? currentCourse.lectures.length
      : 0;

  const completedCount =
    completedLectures.length;

  let progress = 0;

  if (totalLectures > 0) {
    progress = Math.round(
      (completedCount / totalLectures) * 100
    );
  }

  if (progress > 100) {
    progress = 100;
  }

  if (courseProgressText) {
    courseProgressText.textContent =
      `${progress}% Complete`;
  }

  if (courseProgressBar) {
    courseProgressBar.style.width =
      `${progress}%`;
  }

  if (lectureProgress) {
    lectureProgress.textContent =
      `Progress: ${progress}%`;
  }

}
/* =========================================
   PREVIOUS LECTURE
========================================= */

if (previousLecture) {
  previousLecture.addEventListener("click", function () {
    if (currentLectureIndex > 0) {
      loadLecture(currentLectureIndex - 1);
    }
  });
}

/* =========================================
   NEXT LECTURE
========================================= */

if (nextLecture) {
  nextLecture.addEventListener("click", function () {
    if (currentLectureIndex < currentCourse.lectures.length - 1) {
      loadLecture(currentLectureIndex + 1);
    }
  });
}

/* =========================================
   MARK COMPLETE
========================================= */

if (markComplete) {
  markComplete.addEventListener("click", function () {
    completeLecture();
  });
}

/* =========================================
   VIDEO AUTO COMPLETE
========================================= */

if (lectureVideo) {
  lectureVideo.addEventListener("ended", function () {
    completeLecture();
  });
}

/* =========================================
   INVALID COURSE
========================================= */

if (!currentCourse) {
  if (lectureTitle) {
    lectureTitle.textContent = "Course Not Found";
  }
} else {
  loadLecture(startingLecture);
}

/* =========================================
   INITIALIZE
========================================= */

updateCartCount();
