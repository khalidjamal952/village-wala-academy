/* =========================================
   CERTIFICATE JAVASCRIPT
========================================= */

/* =========================================
   ELEMENTS
========================================= */

const certificateGrid = document.getElementById("certificateGrid");

const certificateEmpty = document.getElementById("certificateEmpty");

const certificateViewer = document.getElementById("certificateViewer");

const closeCertificate = document.getElementById("closeCertificate");

const certificateStudentName = document.getElementById(
  "certificateStudentName",
);

const certificateCourseName = document.getElementById("certificateCourseName");

const certificateDate = document.getElementById("certificateDate");

const certificateId = document.getElementById("certificateId");

const printCertificate = document.getElementById("printCertificate");

const downloadCertificate = document.getElementById("downloadCertificate");

const cartCount = document.getElementById("cartCount");

/* =========================================
   GET PROFILE
========================================= */

function getProfile() {
  const savedProfile = localStorage.getItem("studentProfile");

  if (savedProfile) {
    return JSON.parse(savedProfile);
  }

  return {
    name: "Student",

    email: "student@example.com",
  };
}

/* =========================================
   GET LAST ORDER
========================================= */

function getLastOrder() {
  const savedOrder = localStorage.getItem("lastOrder");

  if (savedOrder) {
    return JSON.parse(savedOrder);
  }

  return null;
}

/* =========================================
   COURSE INFORMATION
========================================= */

const certificateCourses = {
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

/* =========================================
   CHECK COURSE COMPLETION
========================================= */

function isCourseCompleted(courseId) {

  const progressKey =
    "lectureProgress_" + courseId;

  const savedProgress =
    localStorage.getItem(progressKey);

  if (!savedProgress) {
    return false;
  }

  const completedLectures =
    JSON.parse(savedProgress);

  const adminCourses =
    JSON.parse(
      localStorage.getItem("adminCourses")
    ) || [];

  const adminCourse =
    adminCourses.find(function (course) {
      return String(course.id) === String(courseId);
    });

  let totalLectures = 5;

  if (
    adminCourse &&
    Array.isArray(adminCourse.lectures)
  ) {
    totalLectures =
      adminCourse.lectures.length;
  }

  return (
    totalLectures > 0 &&
    completedLectures.length >= totalLectures
  );
}
/* =========================================
   GET COMPLETED COURSES
========================================= */

function getCompletedCourses() {
  const purchasedCourses =
    JSON.parse(localStorage.getItem("purchasedCourses")) || [];

  if (purchasedCourses.length === 0) {
    return [];
  }

  const completedCourses = [];

  purchasedCourses.forEach(function (course) {
    if (isCourseCompleted(course.id)) {
      completedCourses.push(course);
    }
  });

  return completedCourses;
}

/* =========================================
   GENERATE CERTIFICATE ID
========================================= */

function generateCertificateId(courseId) {
  const savedId = localStorage.getItem("certificate_" + courseId);

  if (savedId) {
    return savedId;
  }

  const newId =
    "VWA-" + courseId.toUpperCase() + "-" + Date.now().toString().slice(-6);

  localStorage.setItem("certificate_" + courseId, newId);

  return newId;
}

/* =========================================
   FORMAT DATE
========================================= */

function formatCertificateDate() {
  const date = new Date();

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* =========================================
   CREATE CERTIFICATE CARD
========================================= */

function createCertificateCard(course) {
  const card = document.createElement("div");

  card.className = "certificate-card";

  const courseTitle = certificateCourses[course.id]
    ? certificateCourses[course.id].title
    : course.title;

  const certId = generateCertificateId(course.id);

  card.innerHTML = `

        <div class="certificate-card-top">

            <div class="certificate-icon">
                🏆
            </div>

            <h3>
                ${courseTitle}
            </h3>

        </div>


        <div class="certificate-card-body">

            <p>
                Congratulations! You have
                successfully completed this course.
            </p>


            <div class="certificate-card-meta">

                <span>
                    🎓 Completed
                </span>

                <span>
                    ${certId}
                </span>

            </div>


            <button
                class="view-certificate-btn"
                data-course-id="${course.id}">

                View Certificate

            </button>

        </div>

    `;

  certificateGrid.appendChild(card);
}

/* =========================================
   DISPLAY CERTIFICATES
========================================= */

function displayCertificates() {
  const completedCourses = getCompletedCourses();

  certificateGrid.innerHTML = "";

  if (completedCourses.length === 0) {
    certificateGrid.style.display = "none";

    certificateEmpty.style.display = "block";

    return;
  }

  certificateGrid.style.display = "grid";

  certificateEmpty.style.display = "none";

  completedCourses.forEach(function (course) {
    createCertificateCard(course);
  });

  setupCertificateButtons();
}

/* =========================================
   VIEW CERTIFICATE
========================================= */

function setupCertificateButtons() {
  const buttons = document.querySelectorAll(".view-certificate-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const courseId = button.dataset.courseId;

      showCertificate(courseId);
    });
  });
}

/* ==========================================
   ADMIN CERTIFICATE URL
========================================== */

const certificateUrlParams =
    new URLSearchParams(window.location.search);

const adminCourseId =
    certificateUrlParams.get("course");
/* =========================================
   SHOW CERTIFICATE
========================================= */

function showCertificate(courseId) {

    const profile = getProfile();

    const purchasedCourses =
        JSON.parse(
            localStorage.getItem("purchasedCourses")
        ) || [];

    const course =
        purchasedCourses.find(function (item) {
            return String(item.id) === String(courseId);
        });

    if (!course) {
        alert("Course information not found.");
        return;
    }

    const certificateViewer =
        document.getElementById("certificateViewer");

    const certificateStudentName =
        document.getElementById("certificateStudentName");

    const certificateCourseName =
        document.getElementById("certificateCourseName");

    const certificateDate =
        document.getElementById("certificateDate");

    const certificateId =
        document.getElementById("certificateId");

    const studentName =
        profile && profile.name
            ? profile.name
            : "Student";

    const generatedCertificateId =
        generateCertificateId(course.id);

    const today =
        new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

    if (certificateStudentName) {
        certificateStudentName.textContent =
            studentName;
    }

    if (certificateCourseName) {
        certificateCourseName.textContent =
            course.title;
    }

    if (certificateDate) {
        certificateDate.textContent =
            today;
    }

    if (certificateId) {
        certificateId.textContent =
            generatedCertificateId;
    }

    if (certificateViewer) {
        certificateViewer.style.display = "block";

        certificateViewer.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

/* =========================================
   CLOSE CERTIFICATE
========================================= */

if (closeCertificate) {
  closeCertificate.addEventListener("click", function () {
    certificateViewer.style.display = "none";
  });
}

/* =========================================
   PRINT CERTIFICATE
========================================= */

if (printCertificate) {
  printCertificate.addEventListener("click", function () {
    window.print();
  });
}

/* =========================================
   DOWNLOAD CERTIFICATE
========================================= */

/* =========================================
   DOWNLOAD CERTIFICATE
========================================= */

if (downloadCertificate) {

  downloadCertificate.addEventListener("click", function () {

    if (
      typeof window.jspdf === "undefined" ||
      !window.jspdf.jsPDF
    ) {
      alert("PDF library load nahi hui.");
      return;
    }

    const studentName =
      certificateStudentName?.textContent?.trim() ||
      "Student";

    const courseName =
      certificateCourseName?.textContent?.trim() ||
      "Course";

    const date =
      certificateDate?.textContent?.trim() ||
      formatCertificateDate();

    const certId =
      certificateId?.textContent?.trim() ||
      "VWA-000000";

    const { jsPDF } = window.jspdf;

    const pdf =
      new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    /* =========================================
       BACKGROUND
    ========================================= */

    pdf.setFillColor(255, 253, 245);

    pdf.rect(
      0,
      0,
      pageWidth,
      pageHeight,
      "F"
    );

    /* =========================================
       OUTER GOLD BORDER
    ========================================= */

    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(3);

    pdf.rect(
      5,
      5,
      pageWidth - 10,
      pageHeight - 10
    );

    /* =========================================
       INNER BORDER
    ========================================= */

    pdf.setLineWidth(0.8);

    pdf.rect(
      10,
      10,
      pageWidth - 20,
      pageHeight - 20
    );

    /* =========================================
       ACADEMY NAME
    ========================================= */

    pdf.setTextColor(79, 70, 229);

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(22);

    pdf.text(
      "VILLAGE WALA ACADEMY",
      pageWidth / 2,
      35,
      {
        align: "center"
      }
    );

    /* Golden line */

    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(1);

    pdf.line(
      pageWidth / 2 - 25,
      41,
      pageWidth / 2 + 25,
      41
    );

    /* =========================================
       CERTIFICATE TITLE
    ========================================= */

    pdf.setTextColor(139, 105, 20);

    pdf.setFont(
      "times",
      "bold"
    );

    pdf.setFontSize(27);

    pdf.text(
      "CERTIFICATE OF COMPLETION",
      pageWidth / 2,
      58,
      {
        align: "center"
      }
    );

    /* =========================================
       PRESENTED TEXT
    ========================================= */

    pdf.setTextColor(90, 90, 90);

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(12);

    pdf.text(
      "This certificate is proudly presented to",
      pageWidth / 2,
      73,
      {
        align: "center"
      }
    );

    /* =========================================
       STUDENT NAME
    ========================================= */

    pdf.setTextColor(31, 41, 55);

    pdf.setFont(
      "times",
      "bold"
    );

    pdf.setFontSize(27);

    pdf.text(
      studentName,
      pageWidth / 2,
      88,
      {
        align: "center"
      }
    );

    /* Student underline */

    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(0.7);

    pdf.line(
      pageWidth / 2 - 35,
      93,
      pageWidth / 2 + 35,
      93
    );

    /* =========================================
       COURSE TEXT
    ========================================= */

    pdf.setTextColor(80, 80, 80);

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(12);

    pdf.text(
      "for successfully completing the course",
      pageWidth / 2,
      107,
      {
        align: "center"
      }
    );

    /* =========================================
       COURSE NAME
    ========================================= */

    pdf.setTextColor(79, 70, 229);

    pdf.setFont(
      "times",
      "bold"
    );

    pdf.setFontSize(20);

    const courseLines =
      pdf.splitTextToSize(
        courseName,
        220
      );

    pdf.text(
      courseLines,
      pageWidth / 2,
      120,
      {
        align: "center"
      }
    );

    /* =========================================
       DATE
    ========================================= */

    const courseLineHeight =
      courseLines.length * 8;

    const dateY =
      120 + courseLineHeight + 8;

    pdf.setTextColor(85, 85, 85);

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(11);

    pdf.text(
      "Completed on: " + date,
      pageWidth / 2,
      dateY,
      {
        align: "center"
      }
    );

    /* =========================================
       SIGNATURES
    ========================================= */

    const signatureY = 160;

    pdf.setDrawColor(50, 50, 50);
    pdf.setLineWidth(0.4);

    /* Instructor */

    pdf.line(
      55,
      signatureY,
      105,
      signatureY
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(10);

    pdf.setTextColor(80, 80, 80);

    pdf.text(
      "Instructor",
      80,
      signatureY + 7,
      {
        align: "center"
      }
    );

    /* Academy */

    pdf.line(
      pageWidth - 105,
      signatureY,
      pageWidth - 55,
      signatureY
    );

    pdf.text(
      "Village Wala Academy",
      pageWidth - 80,
      signatureY + 7,
      {
        align: "center"
      }
    );

    /* =========================================
       CERTIFICATE ID
    ========================================= */

    pdf.setTextColor(120, 120, 120);

    pdf.setFontSize(8);

    pdf.text(
      "Certificate ID: " + certId,
      pageWidth / 2,
      190,
      {
        align: "center"
      }
    );

    /* =========================================
       CORNER DECORATIONS
    ========================================= */

    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(1.2);

    // Top left
    pdf.line(17, 17, 40, 17);
    pdf.line(17, 17, 17, 40);

    // Top right
    pdf.line(pageWidth - 17, 17, pageWidth - 40, 17);
    pdf.line(pageWidth - 17, 17, pageWidth - 17, 40);

    // Bottom left
    pdf.line(17, pageHeight - 17, 40, pageHeight - 17);
    pdf.line(17, pageHeight - 17, 17, pageHeight - 40);

    // Bottom right
    pdf.line(
      pageWidth - 17,
      pageHeight - 17,
      pageWidth - 40,
      pageHeight - 17
    );

    pdf.line(
      pageWidth - 17,
      pageHeight - 17,
      pageWidth - 17,
      pageHeight - 40
    );

    /* =========================================
       SAVE PDF
    ========================================= */

    const safeName =
      studentName
        .replace(/[^a-z0-9]/gi, "-")
        .replace(/-+/g, "-");

    pdf.save(
      "Village-Wala-Academy-" +
      safeName +
      "-Certificate.pdf"
    );

  });

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
   INITIALIZE
========================================= */

displayCertificates();

updateCartCount();


/* ==========================================
   OPEN CERTIFICATE FROM ADMIN
========================================== */

if (adminCourseId) {

    const purchasedCourses =
        JSON.parse(
            localStorage.getItem("purchasedCourses")
        ) || [];

    const selectedCourse =
        purchasedCourses.find(function (course) {
            return String(course.id) ===
                   String(adminCourseId);
        });

    if (selectedCourse) {

        showCertificate(selectedCourse.id);

    }

}