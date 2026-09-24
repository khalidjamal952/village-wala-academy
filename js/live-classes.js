/* =========================================================
   LIVE CLASSES - STUDENT SIDE
========================================================= */

const LIVE_CLASS_STORAGE_KEY = "adminLiveClasses";

/* =========================
   DEFAULT LIVE CLASSES
========================= */

const defaultLiveClasses = [
  {
    id: "live1",
    title: "JavaScript DOM & Events",
    description:
      "Learn DOM manipulation and JavaScript events with practical examples.",
    instructor: "Village Wala Instructor",
    role: "Web Development Instructor",
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
    role: "React JS Instructor",
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
    role: "Frontend Instructor",
    date: "2026-09-25",
    time: "18:00",
    duration: "90 Minutes",
    status: "upcoming",
    joinLink: "#",
  },

  {
    id: "live4",
    title: "JavaScript Form Validation",
    description: "Learn how to validate forms using JavaScript.",
    instructor: "Village Wala Instructor",
    role: "JavaScript Instructor",
    date: "2026-09-20",
    time: "18:00",
    duration: "60 Minutes",
    status: "past",
    joinLink: "#",
  },
];

/* =========================
   GET LIVE CLASSES
========================= */

function getStudentLiveClasses() {
  const storedClasses = localStorage.getItem(LIVE_CLASS_STORAGE_KEY);

  if (storedClasses) {
    try {
      return JSON.parse(storedClasses);
    } catch (error) {
      console.error("Unable to read live class data:", error);
    }
  }

  /*
       If admin has not created live classes yet,
       use default demo classes.
    */

  return defaultLiveClasses;
}

/* =========================
   DOM ELEMENTS
========================= */

/* =========================
   DOM ELEMENTS
========================= */
/* =========================
   DOM ELEMENTS
========================= */

const liveNowGrid =
  document.getElementById("liveNowGrid");

const upcomingClassesGrid =
  document.getElementById("upcomingClassesGrid");

const pastClassesGrid =
  document.getElementById("pastClassesGrid");

const liveClassSearch =
  document.getElementById("liveClassSearch");

const liveClassFilter =
  document.getElementById("liveClassFilter");

const cartCount =
  document.getElementById("cartCount");

/* =========================
   CART COUNT
========================= */

function updateLiveClassCartCount() {
  if (!cartCount) {
    return;
  }

  const cart = JSON.parse(localStorage.getItem("academyCart")) || [];

  cartCount.textContent = cart.length;
}

updateLiveClassCartCount();

/* =========================
   FORMAT DATE
========================= */

function formatStudentLiveDate(dateString) {
  if (!dateString) {
    return "Date not available";
  }

  const date = new Date(dateString + "T00:00:00");

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* =========================
   FORMAT TIME
========================= */

function formatStudentLiveTime(timeString) {
  if (!timeString) {
    return "Time not available";
  }

  const parts = timeString.split(":");

  if (parts.length < 2) {
    return timeString;
  }

  let hours = parseInt(parts[0], 10);

  const minutes = parts[1];

  if (Number.isNaN(hours)) {
    return timeString;
  }

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
}

/* =========================
   STATUS TEXT
========================= */

function getStudentLiveStatus(status) {
  if (status === "live") {
    return "Live Now";
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

function escapeStudentLiveHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================
   VALIDATE JOIN LINK
========================= */

function getSafeJoinLink(link) {
  if (!link || link === "#") {
    return "#";
  }

  return link;
}

/* =========================
   RENDER LIVE CLASSES
========================= */

// function renderStudentLiveClasses() {
//  /* =========================
//    RENDER LIVE CLASSES
// ========================= */

// function renderStudentLiveClasses() {

//   const classes = getStudentLiveClasses();

//   if (!liveNowGrid || !upcomingClassesGrid || !pastClassesGrid) {
//     return;
//   }

//   /* =========================
//      CLEAR ALL GRIDS
//   ========================= */

//   liveNowGrid.innerHTML = "";
//   upcomingClassesGrid.innerHTML = "";
//   pastClassesGrid.innerHTML = "";


//   /* =========================
//      CREATE CARD FUNCTION
//   ========================= */

//   function createLiveClassCard(liveClass) {

//     const card = document.createElement("div");

//     card.className = "live-class-card";

//     const status =
//       getStudentLiveStatus(liveClass.status);

//     const formattedDate =
//       formatStudentLiveDate(liveClass.date);

//     const formattedTime =
//       formatStudentLiveTime(liveClass.time);

//     const joinLink =
//       getSafeJoinLink(liveClass.joinLink);

//     let actionButton = "";


//     /* =========================
//        LIVE BUTTON
//     ========================= */

//     if (liveClass.status === "live") {

//       if (joinLink !== "#") {

//         actionButton = `
//           <a
//             href="${escapeStudentLiveHTML(joinLink)}"
//             target="_blank"
//             rel="noopener noreferrer"
//             class="live-join-btn"
//           >
//             🔴 Join Live Class
//           </a>
//         `;

//       } else {

//         actionButton = `
//           <button
//             type="button"
//             class="live-join-btn"
//             onclick="showLiveLinkMessage()"
//           >
//             🔴 Join Live Class
//           </button>
//         `;
//       }

//     }


//     /* =========================
//        UPCOMING BUTTON
//     ========================= */

//     else if (liveClass.status === "upcoming") {

//       actionButton = `
//         <button
//           type="button"
//           class="live-reminder-btn"
//           data-reminder-id="${escapeStudentLiveHTML(liveClass.id)}"
//         >
//           🔔
//           <span>
//             ${
//               isLiveClassReminderSet(liveClass.id)
//                 ? "Reminder Set"
//                 : "Set Reminder"
//             }
//           </span>
//         </button>
//       `;

//     }


//     /* =========================
//        PAST BUTTON
//     ========================= */

//     else {

//       if (joinLink !== "#") {

//         actionButton = `
//           <a
//             href="${escapeStudentLiveHTML(joinLink)}"
//             target="_blank"
//             rel="noopener noreferrer"
//             class="live-recording-btn"
//           >
//             ▶ Watch Recording
//           </a>
//         `;

//       } else {

//         actionButton = `
//           <button
//             type="button"
//             class="live-recording-btn"
//             onclick="showRecordingMessage()"
//           >
//             ▶ Watch Recording
//           </button>
//         `;
//       }
//     }


//     /* =========================
//        CARD HTML
//     ========================= */

//     card.innerHTML = `

//       <div class="live-card-header">

//         <div class="live-card-icon">
//           🎥
//         </div>

//         <span class="live-status ${escapeStudentLiveHTML(liveClass.status)}">
//           ${status}
//         </span>

//       </div>


//       <div class="live-card-content">

//         <h3>
//           ${escapeStudentLiveHTML(liveClass.title)}
//         </h3>


//         <p class="live-card-description">
//           ${escapeStudentLiveHTML(liveClass.description)}
//         </p>


//         <div class="live-instructor">

//           <div class="live-instructor-avatar">
//             👨‍🏫
//           </div>

//           <div>

//             <strong>
//               ${escapeStudentLiveHTML(
//                 liveClass.instructor || "Village Wala Instructor"
//               )}
//             </strong>

//             <span>
//               ${escapeStudentLiveHTML(
//                 liveClass.role || "Instructor"
//               )}
//             </span>

//           </div>

//         </div>


//         <div class="live-card-info">

//           <div class="live-info-item">
//             <span>📅</span>
//             <span>${formattedDate}</span>
//           </div>

//           <div class="live-info-item">
//             <span>🕐</span>
//             <span>${formattedTime}</span>
//           </div>

//           <div class="live-info-item">
//             <span>⏱️</span>
//             <span>
//               ${escapeStudentLiveHTML(
//                 liveClass.duration || "Duration not available"
//               )}
//             </span>
//           </div>

//         </div>


//         <div class="live-card-action">

//           ${actionButton}

//         </div>

//       </div>

//     `;

//     return card;
//   }


//   /* =========================
//      SEPARATE BY STATUS
//   ========================= */

//   classes.forEach(function (liveClass) {

//     if (liveClass.status === "live") {

//       liveNowGrid.appendChild(
//         createLiveClassCard(liveClass)
//       );

//     }

//     else if (liveClass.status === "upcoming") {

//       upcomingClassesGrid.appendChild(
//         createLiveClassCard(liveClass)
//       );

//     }

//     else if (liveClass.status === "past") {

//       pastClassesGrid.appendChild(
//         createLiveClassCard(liveClass)
//       );

//     }

//   });


//   /* =========================
//      REMINDER BUTTONS
//   ========================= */

//   const reminderButtons =
//     upcomingClassesGrid.querySelectorAll(
//       "[data-reminder-id]"
//     );

//   reminderButtons.forEach(function (button) {

//     button.addEventListener("click", function () {

//       const id =
//         this.dataset.reminderId;

//       toggleLiveClassReminder(id);

//       renderStudentLiveClasses();

//     });

//   });

// }
// }

function renderStudentLiveClasses() {

  const classes = getStudentLiveClasses();

  // Clear all sections
  liveNowGrid.innerHTML = "";
  upcomingClassesGrid.innerHTML = "";
  pastClassesGrid.innerHTML = "";

  classes.forEach(function (liveClass) {

    const card = document.createElement("div");

    card.className = "live-class-card";

    card.innerHTML = `
      <div class="live-card-content">

        <h3>
          ${escapeStudentLiveHTML(liveClass.title)}
        </h3>

        <p>
          ${escapeStudentLiveHTML(
            liveClass.description || "Live class"
          )}
        </p>

        <div class="live-card-info">

          <div class="live-info-item">
            📅
            ${formatStudentLiveDate(liveClass.date)}
          </div>

          <div class="live-info-item">
            🕐
            ${formatStudentLiveTime(liveClass.time)}
          </div>

          <div class="live-info-item">
            ⏱️
            ${escapeStudentLiveHTML(
              liveClass.duration || "Duration not available"
            )}
          </div>

        </div>

        <div class="live-card-action">

          ${
            liveClass.status === "live"
              ? `
                <button
                  type="button"
                  class="live-join-btn"
                  onclick="showLiveLinkMessage()"
                >
                  🔴 Join Live Class
                </button>
              `
              : liveClass.status === "upcoming"
              ? `
               <button
  type="button"
  class="live-reminder-btn"
  data-reminder-id="${escapeStudentLiveHTML(liveClass.id)}"
>
  🔔 ${
    isLiveClassReminderSet(liveClass.id)
      ? "Reminder Set"
      : "Set Reminder"
  }
</button>
              `
              : `
                <button
                  type="button"
                  class="live-recording-btn"
                  onclick="showRecordingMessage()"
                >
                  ▶ Watch Recording
                </button>
              `
          }

        </div>

      </div>
    `;


    // =========================
    // LIVE
    // =========================

    if (liveClass.status === "live") {

      liveNowGrid.appendChild(card);

    }


    // =========================
    // UPCOMING
    // =========================

    else if (liveClass.status === "upcoming") {

      upcomingClassesGrid.appendChild(card);

    }


    // =========================
    // PAST
    // =========================

    else if (liveClass.status === "past") {

      pastClassesGrid.appendChild(card);

    }

  /* =========================
     REMINDER EVENTS
  ========================= */

  const reminderButtons =
    document.querySelectorAll("[data-reminder-id]");

  reminderButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const id =
        this.dataset.reminderId;

      toggleLiveClassReminder(id);

      renderStudentLiveClasses();

    });

  });
  });

}
/* =========================
   REMINDER STORAGE
========================= */

function isLiveClassReminderSet(id) {
  return localStorage.getItem(`liveReminder_${id}`) === "true";
}

function toggleLiveClassReminder(id) {
  const key = `liveReminder_${id}`;

  const isSet = localStorage.getItem(key) === "true";

  if (isSet) {
    localStorage.removeItem(key);

    alert("Live class reminder removed.");
  } else {
    localStorage.setItem(key, "true");

    alert("Reminder set for this live class.");
  }
}

/* =========================
   DEMO JOIN MESSAGE
========================= */

function showLiveLinkMessage() {
  alert("Live class joining link has not been added by the admin yet.");
}

/* =========================
   DEMO RECORDING MESSAGE
========================= */

function showRecordingMessage() {
  alert("Recording link has not been added yet.");
}

/* =========================
   SEARCH EVENT
========================= */

if (liveClassSearch) {
  liveClassSearch.addEventListener("input", renderStudentLiveClasses);
}

/* =========================
   FILTER EVENT
========================= */

if (liveClassFilter) {
  liveClassFilter.addEventListener("change", renderStudentLiveClasses);
}

/* =========================
   INITIAL RENDER
========================= */

renderStudentLiveClasses();
