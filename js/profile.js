// ==========================================
// Village Wala Academy
// Profile JavaScript
// ==========================================

// ==========================================
// LOGIN PROTECTION
// ==========================================

const isLoggedIn = localStorage.getItem("studentLoggedIn");

if (isLoggedIn !== "true") {
  alert("Please login to access your profile.");

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
// PROFILE DATA
// ==========================================

let profile = JSON.parse(localStorage.getItem("studentProfile")) || {
  name: "Student",

  email: "student@example.com",

  phone: "",

  city: "",

  bio: "",
};

// ==========================================
// FORM ELEMENTS
// ==========================================

const profileName = document.getElementById("profileName");

const profileEmail = document.getElementById("profileEmail");

const profilePhone = document.getElementById("profilePhone");

const profileCity = document.getElementById("profileCity");

const profileBio = document.getElementById("profileBio");

// ==========================================
// LOAD PROFILE DATA
// ==========================================

if (profileName) {
  profileName.value = profile.name || "";
}

if (profileEmail) {
  profileEmail.value = profile.email || "";
}

if (profilePhone) {
  profilePhone.value = profile.phone || "";
}

if (profileCity) {
  profileCity.value = profile.city || "";
}

if (profileBio) {
  profileBio.value = profile.bio || "";
}

// ==========================================
// PROFILE HEADER
// ==========================================

const profileDisplayName = document.getElementById("profileDisplayName");

const profileDisplayEmail = document.getElementById("profileDisplayEmail");

const profileAvatar = document.getElementById("profileAvatar");

function updateProfileHeader() {
  const name = profile.name || "Student";

  const email = profile.email || "student@example.com";

  if (profileDisplayName) {
    profileDisplayName.textContent = name;
  }

  if (profileDisplayEmail) {
    profileDisplayEmail.textContent = email;
  }

  if (profileAvatar) {
    profileAvatar.textContent = name.charAt(0).toUpperCase();
  }
}

updateProfileHeader();

// ==========================================
// GET PURCHASED COURSES
// ==========================================

const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));

let purchasedCourses = [];

if (lastOrder && lastOrder.courses) {
  purchasedCourses = lastOrder.courses;
}

// ==========================================
// COURSE COUNT
// ==========================================

const profileCourseCount = document.getElementById("profileCourseCount");

if (profileCourseCount) {
  profileCourseCount.textContent = purchasedCourses.length;
}

// ==========================================
// COMPLETED COURSES
// ==========================================

let completedCount = 0;

purchasedCourses.forEach(function (course) {
  const progressKey = "lectureProgress_" + course.id;

  const progress = JSON.parse(localStorage.getItem(progressKey)) || [];

  // Demo course has 5 lectures

  if (progress.length >= 5) {
    completedCount++;
  }
});

// ==========================================
// COMPLETED COUNT
// ==========================================

const profileCompletedCount = document.getElementById("profileCompletedCount");

if (profileCompletedCount) {
  profileCompletedCount.textContent = completedCount;
}

// ==========================================
// CERTIFICATE COUNT
// ==========================================

const profileCertificateCount = document.getElementById(
  "profileCertificateCount",
);

if (profileCertificateCount) {
  profileCertificateCount.textContent = completedCount;
}

// ==========================================
// SAVE PROFILE
// ==========================================

const profileForm = document.getElementById("profileForm");

if (profileForm) {
  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = profileName.value.trim();

    const email = profileEmail.value.trim().toLowerCase();

    const phone = profilePhone.value.trim();

    const city = profileCity.value.trim();

    const bio = profileBio.value.trim();

    // Validation

    if (!name) {
      alert("Please enter your name.");

      profileName.focus();

      return;
    }

    if (!email) {
      alert("Please enter your email.");

      profileEmail.focus();

      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");

      profileEmail.focus();

      return;
    }

    // Update profile

    profile = {
      name: name,

      email: email,

      phone: phone,

      city: city,

      bio: bio,
    };

    // Save

    localStorage.setItem("studentProfile", JSON.stringify(profile));

    // Update account name/email/phone

    const account = JSON.parse(localStorage.getItem("studentAccount"));

    if (account) {
      account.name = name;

      account.email = email;

      account.phone = phone;

      localStorage.setItem("studentAccount", JSON.stringify(account));
    }

    // Update header

    updateProfileHeader();

    alert("Profile updated successfully!");
  });
}

// ==========================================
// NAVBAR LOGOUT
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    logoutStudent();
  });
}

// ==========================================
// PROFILE LOGOUT
// ==========================================

const profileLogoutBtn = document.getElementById("profileLogoutBtn");

if (profileLogoutBtn) {
  profileLogoutBtn.addEventListener("click", function () {
    logoutStudent();
  });
}

// ==========================================
// LOGOUT FUNCTION
// ==========================================

function logoutStudent() {
  localStorage.removeItem("studentLoggedIn");

  alert("You have been logged out successfully.");

  window.location.href = "login.html";
}
