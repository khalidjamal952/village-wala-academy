// ==========================================
// Village Wala Academy
// Authentication JavaScript
// ==========================================

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
// REGISTER
// ==========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // ======================================
    // GET FORM VALUES
    // ======================================

    const name = document.getElementById("registerName").value.trim();

    const email = document
      .getElementById("registerEmail")
      .value.trim()
      .toLowerCase();

    const phone = document.getElementById("registerPhone").value.trim();

    const password = document.getElementById("registerPassword").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    const terms = document.getElementById("registerTerms").checked;

    // ======================================
    // VALIDATION
    // ======================================

    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("Please fill all the required fields.");

      return;
    }

    // ======================================
    // EMAIL VALIDATION
    // ======================================

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");

      return;
    }

    // ======================================
    // PHONE VALIDATION
    // ======================================

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");

      return;
    }

    // ======================================
    // PASSWORD VALIDATION
    // ======================================

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");

      return;
    }

    // ======================================
    // CONFIRM PASSWORD
    // ======================================

    if (password !== confirmPassword) {
      alert("Passwords do not match.");

      return;
    }

    // ======================================
    // TERMS & CONDITIONS
    // ======================================

    if (!terms) {
      alert("Please accept the Terms & Conditions.");

      return;
    }

    // ======================================
    // CHECK EXISTING ACCOUNT
    // ======================================

    const existingAccount = JSON.parse(localStorage.getItem("studentAccount"));

    if (existingAccount && existingAccount.email === email) {
      alert("An account with this email already exists. Please login.");

      return;
    }

    // ======================================
    // CREATE ACCOUNT
    // ======================================

    const account = {
      name: name,

      email: email,

      phone: phone,

      password: password,
    };

    // Save account

    localStorage.setItem("studentAccount", JSON.stringify(account));

    // ======================================
    // CREATE STUDENT PROFILE
    // ======================================

    // Phone is intentionally blank.
    // User can add phone from Profile page.

    const profile = {
      name: name,

      email: email,

      phone: "",

      city: "",

      bio: "",
    };

    localStorage.setItem("studentProfile", JSON.stringify(profile));

    // ======================================
    // LOGIN USER
    // ======================================

    localStorage.setItem("studentLoggedIn", "true");

    // ======================================
    // SUCCESS
    // ======================================

    alert("Registration successful! Welcome to Village Wala Academy.");

    window.location.href = "dashboard.html";
  });
}

// ==========================================
// LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // ======================================
    // GET VALUES
    // ======================================

    const email = document
      .getElementById("loginEmail")
      .value.trim()
      .toLowerCase();

    const password = document.getElementById("loginPassword").value;

    const rememberMe = document.getElementById("rememberMe").checked;

    // ======================================
    // VALIDATION
    // ======================================

    if (!email || !password) {
      alert("Please enter your email and password.");

      return;
    }

    // ======================================
    // GET ACCOUNT
    // ======================================

    const account = JSON.parse(localStorage.getItem("studentAccount"));

    if (!account) {
      alert("No account found. Please register first.");

      return;
    }

    // ======================================
    // CHECK LOGIN
    // ======================================

    if (account.email !== email || account.password !== password) {
      alert("Invalid email or password.");

      return;
    }

    // ======================================
    // LOGIN SUCCESS
    // ======================================

    localStorage.setItem("studentLoggedIn", "true");

    // ======================================
    // REMEMBER ME
    // ======================================

    if (rememberMe) {
      localStorage.setItem("studentRememberMe", "true");
    } else {
      localStorage.removeItem("studentRememberMe");
    }

    // ======================================
    // UPDATE PROFILE
    // ======================================

    let profile = JSON.parse(localStorage.getItem("studentProfile"));

    // If profile doesn't exist
    // create a new profile.

    if (!profile) {
      profile = {
        name: account.name,

        email: account.email,

        phone: "",

        city: "",

        bio: "",
      };
    } else {
      // Update name and email only.

      profile.name = account.name;

      profile.email = account.email;

      // ==================================
      // OLD PHONE NUMBER FIX
      // ==================================

      /*
                    Earlier version of the website
                    automatically copied the registered
                    phone number into the profile.

                    If profile phone is exactly the
                    same as account phone, we assume
                    it is the old automatically saved
                    value and clear it.

                    After that user can manually
                    enter a phone number from Profile.
                */

      if (profile.phone && account.phone && profile.phone === account.phone) {
        profile.phone = "";
      }
    }

    // Save updated profile

    localStorage.setItem("studentProfile", JSON.stringify(profile));

    // ======================================
    // SUCCESS
    // ======================================

    alert("Login successful! Welcome back.");

    window.location.href = "dashboard.html";
  });
}

// ==========================================
// FORGOT PASSWORD
// ==========================================

const forgotPasswordForm = document.getElementById("forgotPasswordForm");

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // ======================================
    // GET EMAIL
    // ======================================

    const email = document
      .getElementById("forgotEmail")
      .value.trim()
      .toLowerCase();

    // ======================================
    // VALIDATION
    // ======================================

    if (!email) {
      alert("Please enter your email address.");

      return;
    }

    // ======================================
    // GET SAVED ACCOUNT
    // ======================================

    const account = JSON.parse(localStorage.getItem("studentAccount"));

    // ======================================
    // CHECK ACCOUNT
    // ======================================

    if (!account) {
      alert("No account found. Please register first.");

      return;
    }

    // ======================================
    // CHECK EMAIL
    // ======================================

    if (account.email !== email) {
      alert("No account found with this email address.");

      return;
    }

    // ======================================
    // DEMO RESET MESSAGE
    // ======================================

    alert(
      "Email verified successfully. Password reset feature will be connected to the backend later.",
    );

    // ======================================
    // BACK TO LOGIN
    // ======================================

    window.location.href = "login.html";
  });
}
